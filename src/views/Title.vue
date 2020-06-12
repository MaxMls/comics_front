<template>
    <div class="mainContainer pb-12" v-if="currentTitle">
        <div class="descriptionContainer">
            <div>
                <v-card
                        class="mx-auto"
                        :height="`100%`"
                >
                    <v-card-title>
                        {{currentTitle.name}}
                    </v-card-title>
                    <v-card-subtitle>
                        {{currentTitle.description}}
                    </v-card-subtitle>
                    <v-card-text>
                        <v-chip-group
                                multiple
                                column
                                active-class="primary--text"
                        >
                            <v-chip v-for="(genre, i) in currentTitle.genres" :key="i">
                                {{ genre }}
                            </v-chip>
                        </v-chip-group>
                        <h2 class="mb-3 mt-6">{{$t('chapters')}}:</h2>
                        <v-expansion-panels>
                            <v-expansion-panel
                                    v-for="(chapter, chapterInd) in currentTitle.chapters"
                                    :key="chapterInd"
                            >
                                <v-expansion-panel-header
                                        :color="`${chapter.history ? (chapter.history.pageNum >= chapter.pagesCount ? 'green accent-1' : chapter.history.pageNum ? 'yellow ':'') : '' }`"
                                >
                                    <div>
                                        <span><span
                                                class="grey--text text--lighten-1 font-weight-light mr-1 hidden-sm-and-down  ">{{chapterInd}}.</span>{{chapter.name}} </span>
                                        <div class="grey--text text--lighten-0 font-weight-light  ml-sm-0 ml-4 mt-3">
                                            {{chapter.history ? chapter.history.pageNum + "/" :
                                            ""}}{{chapter.pagesCount}} {{$t('pages')}}
                                        </div>
                                    </div>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <v-row class="chapterControl justify-end">
                                        <v-menu offset-y>
                                            <template v-slot:activator="{ on }">
                                                <v-btn light v-on="on"
                                                       :disabled="!isProfileLoaded"
                                                >{{$t('markAs')}}
                                                </v-btn>
                                            </template>
                                            <v-list>
                                                <v-list-item
                                                        v-for="(btnParam, btnInd) in [{title: 'alreadyRead', isRead: true}, {title: 'unread', isRead: false}]"
                                                        :key="btnInd"
                                                        :disabled="(()=>{
                                                            if(!chapter.history) return true;
                                                            if (chapter.history.pageNum <= 0)  return !btnParam.isRead;
                                                            if (chapter.history.pageNum >= chapter.pagesCount) return btnParam.isRead;
                                                            return false;
                                                        })()"
                                                        @click="readSetButtonEvent(btnParam.isRead, chapter, chapterInd)"
                                                >
                                                    <v-list-item-title>{{ $t(btnParam.title) }}</v-list-item-title>
                                                </v-list-item>
                                            </v-list>
                                        </v-menu>

                                        <v-menu offset-y>
                                            <template v-slot:activator="{ on }">
                                                <v-btn color="green accent-3" dark v-on="on">{{$t('read')}}</v-btn>
                                            </template>
                                            <v-list>

                                                <router-link
                                                        :to="{ name: 'chapter', params: { categoryName, titleId, chapterInd }, query: { start: 0 }}">
                                                    <v-list-item @click="()=>{}">
                                                        <v-list-item-title>{{$t('readZeroPage')}}</v-list-item-title>
                                                    </v-list-item>
                                                </router-link>

                                                <router-link
                                                        v-if="chapter.history && chapter.history.pageNum"
                                                        :to="{ name: 'chapter', params: { categoryName, titleId, chapterInd }, query:{start: chapter.history.pageNum} }">
                                                    <v-list-item @click="()=>{}">
                                                        <v-list-item-title>
                                                            Продолжить с {{chapter.history.pageNum}} страницы
                                                        </v-list-item-title>
                                                    </v-list-item>
                                                </router-link>

                                            </v-list>
                                        </v-menu>

                                    </v-row>
                                </v-expansion-panel-content>

                            </v-expansion-panel>
                        </v-expansion-panels>
                    </v-card-text>
                </v-card>
            </div>
            <div>
                <v-card class="pa-9">
                    <v-img
                            :src="currentTitle.cover"
                            @contextmenu.prevent=""
                    >
                        <template v-slot:placeholder>
                            <v-row
                                    class="fill-height ma-0"
                                    align="center"
                                    justify="center"

                            >
                                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                            </v-row>
                        </template>
                    </v-img>
                    <div class="text-center mt-7">

                        <v-btn
                                v-if="!currentTitle.favorite || !isProfileLoaded"
                                color="yellow"
                                @click="isProfileLoaded ? changeFavorite(true) : false"
                        >
                            {{$t('addToFav')}}
                        </v-btn>
                        <v-btn
                                v-else
                                outlined
                                color="red"
                                @click="changeFavorite(false)"
                        >
                            {{$t('remFav')}}
                        </v-btn>


                    </div>
                </v-card>
            </div>
        </div>

      <CommentSection :titleId="titleId"/>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import {FAVORITE_REQUEST, HISTORY_REQUEST, TITLE_REQUEST} from "../store/actions/titles";
    import CommentSection from "../vueComponents/CommentSection";

    export default {
        name: "Title",
        components: {CommentSection},
        props: ['categoryName', "titleId"],
        computed: {
            ...mapGetters(["isProfileLoaded", "currentTitle"])
        },
        methods: {
            async changeFavorite(isFavorite) {
                const {titleId} = this;
                await this.$store.dispatch(FAVORITE_REQUEST, {isFavorite, titleId});
            },
            async readSetButtonEvent(isRead, chapter) {
                const {titleId} = this;
                await this.$store.dispatch(HISTORY_REQUEST, {
                    titleId,
                    chaptersIds: [chapter.id],
                    isRead,
                    pageNum: chapter.pagesCount
                });
            }
        },
        beforeMount() {
            //if(isNaN(parseInt(this.titleId))) return this.$router.push("/404");
            this.$store.dispatch(TITLE_REQUEST, this.titleId);
        }
    }
</script>

<style scoped>
    .mainContainer {
        min-height: 200vh;
    }


    .chapterControl > button {
        margin: 15px 5px 0;
    }

    .descriptionContainer {
        display: flex;
        align-items: stretch;
        justify-content: space-between;
        margin: 0 0 20px;
    }

    .descriptionContainer > * {
        width: 49%;
        padding: 0;
        /*margin-top: auto;
        margin-bottom: auto;*/
    }

    .mainContainer {
        margin: 16px auto 0;
        width: 1024px;
    }

    @media (max-width: 1440px) {
        .mainContainer {
            width: 1024px;
        }
    }

    @media (max-width: 1200px) {
        .mainContainer {
            width: 100%;
        }
    }

    @media (max-width: 600px) {
        .descriptionContainer {
            flex-direction: column;
            flex-flow: column-reverse;
        }

        .descriptionContainer > * {
            width: 100%;
        }
    }

</style>
