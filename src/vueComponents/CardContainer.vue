<template>
    <!-- сортировка прикреплена к контейнеру, её панель тоже, но ее можно скрыь и указать параметы по умолчанию -->
    <!-- это делает фильтры очень гибкими, т.к они охватывают все представленные отображения на сайте -->
    <div class="card_container">
        <slot></slot>
        <v-toolbar
                v-if="showToolbar"
                height="dense"
                extension-height="dense"
        >
            <v-select
                    :items="toObjs(sortingParams)"
                    label="Сортировать"
                    class="d-inline-block my-3 mx-1"
                    hide-details
                    :item-text="t"
                    item-value="text"
                    hide-selected
                    height="42px"
                    v-model="sorting"

            ></v-select>
            <v-autocomplete
                    :items="toObjs(genres)"
                    chips
                    label="Жанры"
                    hide-details
                    hide-no-data
                    multiple
                    class="d-inline-block my-3  mx-1"
                    v-model="selectedGenres"
            ></v-autocomplete>
            <v-autocomplete
                    :items="toObjs(tags)"
                    chips
                    label="Теги"
                    hide-details
                    hide-no-data
                    multiple
                    class="d-inline-block my-3  mx-1"
                    v-model="selectedTags"
            ></v-autocomplete>

            <v-btn fab dark color="primary"  class="my-3  mx-1">
                <v-icon medium  color="#272727">search</v-icon>
            </v-btn>


            <template v-slot:extension>
                <v-autocomplete
                        :items="languages"
                        chips
                        label="Языки"
                        hide-details
                        hide-no-data
                        multiple
                        class="d-inline-block my-3  mx-1"
                        v-model="selectedLanguages"
                ></v-autocomplete>
                <v-autocomplete
                        :items="users"
                        clearable
                        :loading="isUsersLoading"
                        :search-input.sync="searchUsers"
                        height="42px"
                        hide-details
                        hide-selected
                        class="my-3"
                        label="Избранное пользователя">
                </v-autocomplete>
            </template>


        </v-toolbar>


        <div class="cards py-4">
            <template v-for="(title, i) in absolutelyLimit ? titles.slice(0, absolutelyLimit) : titles">
                <Card :title="title" :key="i" @imageLoaded="loaded++"/>
            </template>
        </div>
    </div>
</template>

<script>
    import Card from "./Card";
    import {mapGetters} from "vuex";
    import {TITLES_REQUEST} from "../store/actions/titles";

    export default {
        name: "CardContainer",
        components: {Card},
        props: ["category", 'absolutelyLimit', 'clean', 'showToolbar'],
        data() {
            return {
                loaded: 0,
                count: 0,
                limit: 12,

                sorting: {text: 'default'},
                selectedGenres: [],
                selectedTags: [],
                selectedLanguages: [],
                searchUsers: null,
                searchUsersTimeout: null,
                isUsersLoading: false,
                users: [],
                db: null,

                genres: ['Action', 'Adventure', 'Comedy', 'Drama', 'Slice of Life', 'Fantasy', 'Magic', 'Supernatural', 'Horror', 'Mystery', 'Psychological', 'Romance', 'Sci-Fi', 'Cyberpunk', 'Game', 'Ecchi', 'Demons', 'Harem', 'Josei', 'Martial Arts', 'Kids', 'Historical', 'Hentai', 'Isekai', 'Military', 'Mecha', 'Music', 'Parody', 'Police', 'Post-Apocalyptic', 'Reverse Harem', 'School', 'Seinen', 'Shoujo', 'Shoujo-ai', 'Shounen', 'Shounen-ai', 'Space', 'Sports', 'Super Power', 'Tragedy', 'Vampire', 'Yuri', 'Yaoi'],
                tags: ['vampires', 'elves', 'sea adventure', 'love', 'demons', 'magical world', 'death', 'revenge'],
                languages: ['japanese', 'english', 'russian'],
                sortingParams: ['default', 'favorite', 'viewed', 'newest', 'oldest']
            }
        },
        ...mapGetters(["titlesByCategory"]),
        watch: {
            loaded(val) {
                if (val !== 0 && val === this.titles.length) {
                    console.log('loaded');
                    console.log(val);
                    this.loadTitles()
                }
            },
            category(val) {
                this.loaded = 0;
                console.log('category');
                // if(!this.titles.length)
                this.loadTitles()
            },
            searchUsers(val) {
                if (val === '') return this.isUsersLoading = false;

                this.isUsersLoading = true;
                if (this.searchUsersTimeout) clearTimeout(this.searchUsersTimeout);
                this.searchUsersTimeout = setTimeout(function () {
                    this.users.push(val);
                    this.isUsersLoading = false;
                }.bind(this), 1000);

            }

        },
        beforeMount() {
            let request = indexedDB.open('db', 1);

            request.onerror = function(event) {
                alert("Почему Вы не позволяете моему веб-приложению использовать IndexedDB?!");
            };
            request.onsuccess = function(event) {
                // Выполнить какой-то код если запрос успешный request.result!
            };


            this.loadTitles()
        },
        computed: {
            titles() {
                return this.$store.getters.titlesByCategory(this.category);
            }
        },
        methods: {
            toObjs(a) {
                return a.map(e => {return {text: e}})
            },
            t(text) {
                return this.$t(text.text)
            },
            loadTitles() {


                const {category, limit} = this;
                this.$store.dispatch(TITLES_REQUEST, {category, limit}).then(resp => { }).catch(resp => { })
            }
        }
    }
</script>

<style>
    .card_container {
        margin: 0 auto;
    }

    .cards {
        display: flex;
        justify-content: center;
        flex-flow: row wrap;
        color: #2c3e50;
        position: relative;
    }

    @media (min-width: 1024px) {
        .card_container {
            width: 1024px;
        }
    }

</style>
