<template>
    <v-container class="pa-md-12 pa-4" v-if="isProfileLoaded">
        <v-row>
            <v-col>
                <div class="pb-5">{{$t('editNote')}}</div>
                <v-form
                        ref="form"
                        v-model="valid"
                >
                    <v-row>
                        <v-col cols="auto">
                            <v-checkbox v-model="selected" value="name"/>
                        </v-col>
                        <v-col>
                            <Field :disabled="!selected.includes('name')" v-model="name" rules="login" label="userName" icon="person" type="text" :required="true"/>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="auto">
                            <v-checkbox v-model="selected" value="password"/>
                        </v-col>
                        <v-col>
                            <Field :disabled="!selected.includes('password')" v-model="password" rules="password" label="newPassword" icon="lock" type="password" :required="selected.includes('password')"/>
                        </v-col>
                    </v-row>

                </v-form>
            </v-col>
           <!-- <v-col sm="auto" cols="12" class="text-center">
                <FieldAvatar/>
            </v-col>-->
        </v-row>
        <v-row class="justify-center">
            <v-btn :disabled="!valid || !selected.length" @click="saveData">{{$t('save')}}</v-btn>
        </v-row>
    </v-container>
</template>

<script>
    import Field from "../vueComponents/Field";
    import {mapGetters} from "vuex";
    import AvatarCropper from "vue-avatar-cropper"
    import FieldAvatar from "../vueComponents/FieldAvatar";
    import {USER_EDIT} from "../store/actions/user";

    export default {
        name: "User",
        components: {FieldAvatar, Field, AvatarCropper},
        props: ["userId"],
        computed: {
            ...mapGetters(["getProfile", "isAuthenticated", "isProfileLoaded"]),
        },
        data() {
            return {
                imageFile: null,
                valid: false,
                name: '',
                password: '',
                selected: []
            }
        },
        beforeMount() {
            if (this.isProfileLoaded)
                this.name = this.getProfile.name;
        },
        methods: {
            validate() {
                this.$refs.form.validate()
            },
            saveData() {
                const {id} = this.getProfile;

                const data = {id};
                this.selected.forEach(t => data[t] = this[t]);

                this.$store.dispatch(USER_EDIT, data);
            }
        },
        watch: {
            selected() {
               // this.valid = false;
                setTimeout(this.validate, 200);
            },
            isProfileLoaded(val) {
                if (val) {
                    this.name = this.getProfile.name;
                }
            }
        }

    }
</script>

<style scoped>

</style>
