<template>
    <v-text-field
            v-model="localValue"
            :label="$t(label)"
            :prepend-icon="icon"
            :type="type"
            :rules="rulesByName(rules)"
            :counter="counterVal[rules]"
            :disabled="disabled"
    />
</template>
<script>
    export default {
        name: 'Field',
        props: ['value' , 'rules', 'label', 'icon', 'type', 'required', 'disabled'], // person
        data() {
            return {
                counterVal:{
                    login: 20,
                    password: 100
                },
                login: [
                    v => !!v || !this.required || "login is required",
                    v =>
                        /^[a-zA-Z0-9]+$/.test(v) ||
                        'Логин должен состоять из любых латинских букв от "A" до "z" и цифр',
                    v => v.length <= 20 || "login must be less than 20 characters",
                    v => v.length > 2 || "Логин должен иметь больше 2-х символов"
                ],
                password: [
                    v => !!v || !this.required || "password is required",
                    v => v.length <= 100 || "password must be less than 100 characters"
                ],
                localValue: '',
            }
        },
        methods:{
            rulesByName(name){
                return this[name]
            }
        },
        created() {
            this.localValue = this.value;
            this.$watch("localValue", value => {
                this.$emit("input", value);
            });
        }
    }
</script>

<style>

</style>
