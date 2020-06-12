<template>
    <div
            class="card pa-1"
    >
        <router-link :to="{ name: 'title', params: { categoryName:title.category, titleId:title.id}}" @click.native="$scrollToTop" append >
        <v-hover
                v-slot:default="{ hover }">

            <v-card
                    :elevation="hover ? 10 : 1"
                    v-on:click="()=>{}"
            >
                <div>

                    <v-img
                            :src="`${title.cover}`"
                            class="cardImage"
                            @load="$emit('imageLoaded')"
                    >
                        <template v-slot:placeholder>
                            <v-skeleton-loader type="image" height="100%"/>
                        </template>

                    </v-img>

                </div>
                <span class="genre">mine genre</span>
                <v-card-title style="font-size: 13pt; line-height: 18pt">
                    {{title.name}}
                </v-card-title>


            </v-card>
        </v-hover>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "Card",
        props: ["title"],
        data() {
            return {}
        }
    }
</script>

<style lang="scss" scoped>

    $color: #efefef;
    .v-card__title {
       // border-top: solid $color 1px;
    }
    .v-card{
        //background: antiquewhite;
    }

    .cardImage {
       // border-bottom: solid $color 1px;
        //border-top: solid $color 1px;
        min-height: 100px;
    }


    .card {

        width: 25%;
    }

    .card > * > * {
        display: flex;
        flex-direction: column;
        height: 100%
    }

    .card > * > * > * {
        margin-top: auto;
    }

    .card:hover {
        z-index: 4;
    }


    @media (max-width: 1024px) {
        .card {
            /*max-*/
            width: 25%;
        }

        .card {
            padding: 2px;
        }
    }

    @media (max-width: 768px) {
        .card {
            width: 33%;
        }
    }

    @media (max-width: 600px) {
        .card {
            width: 50%;
        }
    }

    img {
        width: 100%;
    }

    .genre{
        color: #797979;
    }

</style>
