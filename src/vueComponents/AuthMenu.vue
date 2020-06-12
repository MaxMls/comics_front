<template>
    <div>
        <v-menu
                :close-on-content-click="false"
                offset-y
                offset-x
        >
            <template v-slot:activator="{ on }">
                <v-btn
                        v-on="on"
                        icon
                        class="mx-2"
                >
                    <v-badge
                            overlap
                            content="21"
                            color="red"
                    >
                        <v-icon>notifications</v-icon>

                    </v-badge>
                </v-btn>
            </template>
            <v-card
                    style="max-height: 900px"
                    class="scroll-y"
            >
                <v-list>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title style="font-size: large">Уведомления</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>


                    <v-list-item @click=""
                                 v-for="i in 50"
                                 :key="i"
                    >
                        <v-badge
                        dot
                        overlap
                        left
                        offset-y="50%"
                        color="blue"
                        >

                            <v-list-item-avatar size="62">
                                <img src="https://vignette.wikia.nocookie.net/konosuba/images/6/6e/KonoSuba_OVA_1_16.png/revision/latest/top-crop/width/360/height/450?cb=20200105181633&path-prefix=ru" alt="John">
                            </v-list-item-avatar>
                        </v-badge>

                        <v-list-item-content>
                            <v-list-item-title style="white-space: normal">Добавлена 6 глава манги "Богиня благословляет этот прекрасный мир". Советуем с ней ознакомиться.</v-list-item-title>
                            <v-list-item-subtitle>1 час назад</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-menu>


        <v-menu>

            <template v-slot:activator="{ on }">
                <v-btn
                        :icon="!isProfileLoaded"
                        v-on="on"
                >
                    <template v-if="isProfileLoaded">

                        <span
                                v-if="getProfile.name !== undefined"
                                class="overflow-hidden"
                                style="max-width: 70px; text-overflow: ellipsis;"
                        >{{getProfile.name}}</span>
                        <v-progress-circular
                                v-else
                                color="primary"
                                indeterminate
                                size="25"
                        />
                    </template>

                    <v-icon
                            :right="isProfileLoaded"
                            color="primary"
                            :x-large="!isProfileLoaded"
                    >
                        account_circle
                    </v-icon>
                </v-btn>
            </template>
            <v-list>
                <v-list-item
                        v-if="!isProfileLoaded"
                        @click="loginDialog = true"
                >
                    <v-list-item-title>
                        {{ $t("signIn") }}
                    </v-list-item-title>
                </v-list-item>
                <v-list-item
                        v-if="!isProfileLoaded"
                        @click="regDialog = true"
                >
                    <v-list-item-title>
                        {{ $t("signUp") }}
                    </v-list-item-title>
                </v-list-item>
                <v-list-item
                        v-if="isProfileLoaded"
                        @click="logout"
                >
                    <v-list-item-title>
                        {{ $t("out") }}
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <v-dialog
                v-model="loginDialog"
                max-width="600"
        >
            <Form name="loginForm" @submit="submitAuthForm" @close="loginDialog = false"/>
        </v-dialog>

        <v-dialog
                v-model="regDialog"
                max-width="600"
        >
            <Form name="signUp" @submit="submitUpForm" @close="signupClose"/>
        </v-dialog>


        <v-dialog
                max-width="600"
                light
                v-model="requireAuth"
                class="qwer"
                persistent
        >

            <div style="position: relative">
                <Webm class="d-none d-sm-block" style="position: absolute; right: 0; top:50%; z-index: 999; transform:translateY(-50%) translateX(50%);"/>
                <v-card>
                    <v-card-title>Войдите или авторизируйтесь на сайте</v-card-title>
                    <v-card-text class="mt-4 requireAuth" style="width: 90%" light>
                        Авторизовавшись, вы сможете добавлять в избранное, сохранять прочитанное, оставлять комментарии и много чего еще.
                    </v-card-text>
                    <v-card-text class="mt-4 text-center requireAuth">
                        <v-btn @click="(loginDialog = true) && (requireAuth = false)">Вход</v-btn>
                        <v-btn @click="(regDialog = true) && (requireAuth = false)">Регистрация</v-btn>
                        <v-btn @click="(requireAuth = false)">
                            <v-icon>$ShikimoryGlyph</v-icon>
                            <ShikimoriLogo height="11px" class="ml-2"/>
                        </v-btn>
                        <v-btn @click="(requireAuth = false)" color="red">Закрыть</v-btn>
                    </v-card-text>
                </v-card>

            </div>

        </v-dialog>

        <v-bottom-sheet v-model="sheet">
            <v-sheet
                    class="text-center"
                    height="200px"
            >
                <v-btn
                        class="mt-6"
                        text
                        color="red"
                        @click="sheet = !sheet"
                >
                    {{$t('close')}}
                </v-btn>
                <div class="py-3">
                    {{ $t(message) }}
                </div>
            </v-sheet>
        </v-bottom-sheet>
        <!--      <v-btn @click="requireAuth = true">fffff</v-btn>-->


    </div>
</template>

<script>
    import {AUTH_LOGOUT, AUTH_REQUEST} from "../store/actions/auth";
    import {mapGetters} from "vuex";
    import Form from "./Form";
    import {USER_CREATE, USER_REQUEST} from "../store/actions/user";
    import Webm from "../views/Webm";
    import ShikimoriLogo from "./icons/ShikimoriLogo";

    export default {
        name: "AuthMenu",
        components: {
            ShikimoriLogo,
            Webm,
            Form
        },
        data() {
            return {
                requireAuth: false,
                message: "",
                sheet: false,
                loginDialog: false,
                regDialog: false
            };
        },
        computed: {
            ...mapGetters(["getProfile", "isAuthenticated", "isProfileLoaded"]),
        },
        methods: {
            async logout() {
                await this.$store.dispatch(AUTH_LOGOUT)
            },
            signupClose(isAfterReg) {
                this.regDialog = false;
                let ar = isAfterReg;
                if (ar) this.loginDialog = true;
            },

            async submitAuthForm({name, password}) {
                try {
                    const opt = {name, passwordHash: this.$bcrypt.hashSync(password, 10)};
                    await this.$store.dispatch(AUTH_REQUEST, opt);
                    this.loginDialog = false;
                } catch (e) {
                    this.message = "loginPassError";
                    this.sheet = true;
                }
            },
            async submitUpForm({name, password}) {
                try {
                    await this.$store.dispatch(USER_CREATE, {name, password});
                    this.message = "userCreated";
                    this.signupClose(true);
                    let t = this;

                    setTimeout(function () {
                        t.sheet = true;
                    }, 100);
                } catch (e) {
                    this.message = 'userExist';
                    this.sheet = true;
                }
            }
        },
        async beforeMount() {
            if (this.isAuthenticated) {
                await this.$store.dispatch(USER_REQUEST)
            }
            //this.requireAuth = true
        },
        mounted() {
            //console.log(1212)
            //this.requireAuth = true
        }
    };
</script>

<style scoped>

    .requireAuth > * {
        margin: 8px 10px;
    }


</style>
