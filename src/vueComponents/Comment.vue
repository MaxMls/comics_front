<template>
    <v-list-item class="comment">
        <v-list-item-content>
            <v-list-item-title class="mb-1">
                <div class="lighten-1 grey--text d-inline">{{comment.authorId}}</div>
                <span class="text--lighten-1 grey--text mt-1 font-weight-light ml-2 body-2">{{/*(new Date(comment.createdAt)).toLocaleString()*/}}</span>
                <span class="ml-4 ">
                    <span class="red--text font-weight-regular text-lowercase mr-1 text--lighten-3 body-2">{{comment.likeCount}}</span>
                    <v-btn @click="sendLike(comment)" icon>
                        <v-icon small color="red" class="text&#45;&#45;lighten-2">{{isLiked ? 'favorite' : 'favorite_border'}}</v-icon>
                    </v-btn>
                </span>

            </v-list-item-title>
            <v-list-item-subtitle class="mt-0  body-1 grey--text text--darken-3">{{comment.text}}</v-list-item-subtitle>
            <v-list-item-subtitle v-if="true" class="mt-2">
                <v-btn v-if="isEditing" @click="cancel()" text small class="text--lighten-2" color="red">Отмена</v-btn>

                <template v-if="!isEditing">
                    <v-btn v-if="!comment.parentCommentId" @click="isProfileLoaded ? answerClick(comment) : false" text small class="text--lighten-2" color="blue">
                        Ответить
                    </v-btn>
                    <v-btn v-if="comment.authorId === getProfile._id" @click="editClick(comment)" text small color="grey"
                           class=" d-block d-sm-inline-flex">Редактировать
                    </v-btn>
                    <v-btn v-if="comment.authorId === getProfile._id && !(comment.answers && comment.answers.length)" @click="deleteClick(comment)" text small class="red&#45;&#45;text text&#45;&#45;lighten-2 ">Удалить</v-btn>
                </template>

                <CommentForm v-if="isEditing" @submit="submit" :buttonColor="buttonColor" :buttonText="buttonText" :startText="startText"/>

            </v-list-item-subtitle>
        </v-list-item-content>
    </v-list-item>
</template>

<script>
    import CommentForm from "./CommentForm";
    import {mapGetters} from "vuex";

    export default {
        name: "Comment",
        components: {CommentForm},
        props: ['comment'],
        data() {
            return {
                isEditing: false,
                submit: null, // answer edit
                buttonColor: 'red',
                buttonText: 'Хуй',
                startText: '',
            }
        },
        computed: {
            ...mapGetters(["isProfileLoaded", "currentTitle", 'getProfile']),
            isLiked() {
                return this.comment.likers.includes(this.getProfile._id)
            },
        },
        methods: {

            editClick() {
                this.startText = this.comment.text;
                this.isEditing = true;
                this.buttonColor = 'grey';
                this.buttonText = 'Принять изменения';
                this.submit = this.sendEdit;
            },
            answerClick() {
                this.startText = ''
                this.isEditing = true;
                this.buttonColor = 'blue';
                this.buttonText = 'Отправить ответ';
                this.submit = this.sendAnswer;
            },
            deleteClick() {
                this.$emit('deleted', this.comment)
            },
            sendEdit(text) {
                this.isEditing = false;
                this.$emit('edited', this.comment, text);
                this.text = ''
            },
            sendAnswer(text) {
                this.isEditing = false;
                this.$emit('answered', this.comment, text);
                this.text = ''
            },
            sendLike() {
                if (!this.isProfileLoaded) return;
                this.isEditing = false;
                this.$emit('liked', this.comment, !this.isLiked);
                this.text = ''
            },
            cancel() {
                this.isEditing = false;
            },
        }
    }
</script>

<style scoped>
    .comment {
        border-top: 1px solid #e6e6e6;
    }
</style>
