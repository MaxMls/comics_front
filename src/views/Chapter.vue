<template>
    <div class="mainContainer" v-if="currentTitle">
        <div class="text-center my-7">
            <router-link @click.native="$scrollToTop" :to="{ name: 'title', params: { categoryName, titleId}}">
                <v-btn>Вернутся на страницу с описанием</v-btn>
            </router-link>
        </div>
        {{count}} {{start}}
        <v-card>
            <template
                    v-for="i in Math.max(0, count)"
                    :id="i"
            >
                <div class="text-center my-2 grey--text text--lighten-1">{{ (i + start)}}</div>
                <v-img @load="loadedCount++" v-observe-visibility="(s) => {if(s) visibilityChanged(i + start)}"

                       :src="getImageUrl(i + start-1)"/>
            </template>
        </v-card>
        <div class="text-center my-7">
            <router-link @click.native="$scrollToTop" v-if="chapterInd < currentTitle.chaptersCount-1 "
                         :to="{ name: 'chapter', params: { categoryName, titleId, chapterInd:  chapterInd-(-1) }, query: { start: '0'} }">
                <v-btn>Перейти к следующей главе</v-btn>
            </router-link>
            <router-link @click.native="$scrollToTop" :to="{ name: 'title', params: { categoryName, titleId}}">
                <v-btn>Вернутся на страницу с описанием</v-btn>
            </router-link>
        </div>
    </div>
</template>

<script>
    import {HISTORY_REQUEST, TITLE_REQUEST} from "../store/actions/titles";
    import {mapGetters} from "vuex";

    export default {
        name: "Chapter",
        props: ['categoryName', "titleId", "chapterInd"],
        data() {
            return {
                start: 0, // start
                count: 0,
                pageNum: 0,
                loadedCount: 0,
                interval: 0
            }
        },
        beforeMount() {
            this.loadChapter()
        },
        computed: {
            ...mapGetters(["isProfileLoaded", "currentTitle"]),
            currentChapter() {
                return this.currentTitle ? this.currentTitle.chapters[this.chapterInd] : null;
            }
        },
        watch: {
            currentTitle() {
                this.count = 1;
            },
            '$route'(to, from) {
                this.savePage();
                this.loadChapter()
            },
            count(){
                //console.log(this.count)
            }
        },
        methods: {
            loadChapter() {
                this.count = 0;
                this.$store.dispatch(TITLE_REQUEST, this.titleId);
                //
                let start = parseInt(this.$route.query.start, 10);
                if (Number.isNaN(start)) {
                    this.$router.push({query: {start: "0"}});
                    start = 0;
                }
                this.start = start;
                this.pageNum = start;
                this.loadedCount = 0;
                this.lastTime = Date.now();

                const {handleScroll} = this;

                clearInterval(this.interval);

                this.interval = setInterval(() => {
                    handleScroll('interval')
                }, 2000);
            },
            getImageUrl(ind) {
                return `https://uwu.blob.core.windows.net/images/${this.currentTitle.category}/${this.currentTitle.db}/${this.currentChapter.db}/${(ind).toString(36)}.jpg`
            },
            visibilityChanged(pageNum, entry) {
                this.pageNum = pageNum;
                console.log(pageNum)

            },
            handleScroll: function (val) {
                if (this.currentChapter && this.loadedCount === this.count) {
                    this.count = Math.min(this.count + 1, this.currentChapter.pagesCount - this.start)
                }
            },
            savePage(){
                const {titleId, currentChapter} = this;
                //console.log('save', titleId, currentChapter, this.pageNum)
                this.$store.dispatch(HISTORY_REQUEST, {
                    titleId,
                    chaptersIds: [currentChapter.id],
                    isRead: true,
                    pageNum: this.pageNum
                });
            }
        },
        created: function () {
            window.addEventListener('scroll', () => {
                this.handleScroll('scroll')
            });


        },
        beforeDestroy() {
            this.savePage();
            clearInterval(this.interval)
        },
        destroyed: function () {
            window.removeEventListener('scroll', this.handleScroll);
        }
    }
</script>

<style scoped>
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

</style>
