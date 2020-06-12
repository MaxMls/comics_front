<template>
    <div>
        <v-app-bar
                app
                clipped-left
                dark

        >
            <v-app-bar-nav-icon color="primary" @click="drawer = !drawer"/>
            <v-btn
                    icon class="hidden-xs-only"
                    v-on:click="$router.back()"

            >
                <v-icon>arrow_back</v-icon>
            </v-btn>
            <v-spacer/>

            <!--<v-text-field
                    solo-inverted
                    flat
                    hide-details
                    :label="$t('search')"
                    hint="primary"
                    color="primary"
                    class="mr-4 ml-1"
            >
                <v-icon slot="prepend-inner" color="primary">search</v-icon>
            </v-text-field>-->

            <v-spacer/>
            <AuthMenu class="hidden-xs-only"/>
        </v-app-bar>

        <v-navigation-drawer
                v-model="drawer"
                app
                clipped
                color="grey darken-2"
                dark
        >
            <div class="ma-auto d-table mt-5 ">
                <div class="d-inline-block">
                    <!--<AuthMenu class="hidden-sm-and-up mx-4"/>-->
                </div>
                <v-btn v-on:click="changeLocale" class="mx-4 d-inline-block">{{$i18n.locale}}</v-btn>
            </div>


            <v-list>
                <template v-for="(item, i) in filteredItems">

                    <v-list-item
                            v-if="item.heading"
                            :key="i"
                    >
                        <v-list-item-content>
                            <v-select
                                    item-color="darken"
                                    v-model="viewMode"
                                    :items="item.mode"
                                    menu-props="auto"
                                    item-text="name"
                                    hide-details
                                    return-object
                                    class="pa-0 ma-0 primary--text"
                            >
                                <template slot="selection" slot-scope="data">
                                    <v-icon class="mr-8" color="primary">{{ data.item.icon }}</v-icon>
                                    {{$t(data.item.name)}}
                                </template>

                                <template slot="item" slot-scope="data">
                                    <v-icon class="pr-3">{{ data.item.icon }}</v-icon>
                                    {{$t(data.item.name)}}
                                </template>
                            </v-select>
                        </v-list-item-content>


                    </v-list-item>


                    <v-divider v-else-if="item.divider" :key="i" dark class="my-4"/>

                    <router-link
                            v-else
                            :key="i"
                            :to="item.link"
                            @click.native="$scrollToTop"
                    >
                        <v-list-item
                                link
                        >
                            <v-list-item-action>
                                <v-icon color="primary">{{ item.icon }}</v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{ $t(item.text) }}

                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>


                    </router-link>

                </template>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>
<script>

    import AuthMenu from "./AuthMenu";
    import {mapGetters, mapState} from "vuex";

    const viewModes = [{icon: 'amp_stories', name: 'pageOnly'}, {icon: 'view_day', name: 'scroll'}];

    export default {
        name: "Header",
        components: {AuthMenu},
        data() {

            return {
                drawer: null,
                viewMode: null
            }
        },
        beforeMount() {
            this.drawer = localStorage.getItem("drawer") !== "false";
            const vm = localStorage.getItem("viewModeId");
            this.viewMode = vm === null ? viewModes[0] : this.viewMode = viewModes[vm];

            console.log('header')

            // Установка языка из настроек браузера
            const l = localStorage.getItem("lang");
            if (l !== null) {
                console.log('set lang from localStorage');
                this.$i18n.locale = l;
            } else {
                const l = navigator.languages.map(l => l.split('-')[0]).filter(l => this.$i18n.availableLocales.includes(l));
                if (l.length > 0) {
                    this.$i18n.locale = l[0];
                    console.log('set lang from browser navigator');
                } else
                    console.log('set default lang');
            }
            //

        },
        watch: {
            drawer(val) {
                localStorage.setItem("drawer", val)
            },
            viewMode(val) {
                localStorage.setItem("viewModeId", viewModes.indexOf(val).toString())
            }
        },
        computed: {
            availableLocales() {
                return this.$i18n.availableLocales.filter(i => i !== this.$i18n.locale)
            },
            ...mapGetters(["getProfile", "isAuthenticated", "isProfileLoaded"]),
            filteredItems() {
                const id = this.getProfile.id;
                const items = [
                    {divider: true},
                    {icon: 'home', text: 'mainPage', link: '/'},
                    {divider: true},
                    {icon: 'menu_book', text: 'manga', link: '/m'},
                    {icon: 'photo_library', text: 'comics', link: '/c'},
                    {divider: true},
/*                    {heading: 'viewMode', mode: viewModes},
                    {divider: true},*/
                    {icon: 'star', text: 'favorites', link: `/id/${id}/favorites`, login: true},
                    {icon: 'settings', text: 'settings', link: `/id/${id}`, login: true},
                   // {icon: 'history', text: 'history', link: `/id/${id}/history`, login: true},
                    {icon: 'help', text: 'about', link: '/about'}
                ];

                return items.filter(i => i.login === undefined || i.login === this.isProfileLoaded)
            }
        }
        ,
        methods: {
            changeLocale() {
                this.$i18n.locale = this.availableLocales[0];
                localStorage.setItem("lang", this.$i18n.locale)
            }
        }

    }
</script>

<style lang="scss">

    .v-toolbar{
       // background-color: rgb(42, 42, 42);
    }

    .v-toolbar.v-toolbar--collapsed{
        background-color: #434343ba !important;
        max-width: 500px;
    }

    .v-select__selections {
        color: white;
    }

    a {
        text-decoration: inherit;
        color: inherit;
        font: inherit;
    }
</style>

