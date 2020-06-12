<template>

    <div>
        <v-form v-model="valid">
            <v-textarea :rules="commentRules" v-model="text" auto-grow rows="1" filled class="mt-1" :counter="1000"/>
        </v-form>
        <v-btn :disabled="!valid" @click="$emit('submit', text)" text small :color="buttonColor">
            {{buttonText}}
        </v-btn>
    </div>

</template>
<script>
    export default {
        name: "CommentForm",
        props: ['buttonText', 'buttonColor', 'startText'],
        data() {
            return {
                valid: false,
                commentRules: [
                    v => !!v || "comment is required",
                    v => (v && v.length <= 1000) || "comment must be less than 1000 characters"
                ],
                text: this.startText
            }
        }
    }
</script>

<style scoped>

</style>
