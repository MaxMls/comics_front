<template>
    <v-card class="elevation-12">
        <v-toolbar
                color="primary"
                class="secondary--text"
                flat
        >
            <v-toolbar-title>{{ $t(name) }}</v-toolbar-title>
            <v-spacer/>

            <v-btn
                    text
                    icon
                    @click="$emit('close')"
            >
                <v-icon
                        x-large
                        color="red"
                >
                    cancel
                </v-icon>
            </v-btn>
        </v-toolbar>
        <v-card-text class="mt-4">
            <v-form
                    ref="form"
                    v-model="valid"
            >
                <Field v-model="login" rules="login" label="userName" icon="person" type="text" :required="true" />
                <Field v-model="password" rules="password" label="password" icon="lock" type="password" :required="true" />
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-spacer/>
            <v-btn
                    :disabled="!valid"
                    color="primary"
                    class="secondary--text"
                    @click="submitForm"
            >
                {{$t('continue')}}
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import Field from "./Field";

    export default {
        name: "Form",
        components: {Field},
        props: ['name'],
        data() {
            return {
                error: "",
                sheet: false,
                login: "",
                password: "",
                valid: true,


            };
        },

        methods: {
            async submitForm(event) {
                const {login, password} = this;
                this.$emit("submit", {name: login, password})
            }
        }
    };
</script>

