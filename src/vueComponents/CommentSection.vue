<template>
    <v-card class="commentSection pa-4">
        <div class="mb-5">
            <v-btn v-if="createComment" @click="createComment = false" text small class="text--lighten-2" color="red">Отмена</v-btn>

            <v-btn v-else @click="isProfileLoaded? createComment = true : false" text small class="text--lighten-2" color="blue">Добавить комментарий</v-btn>


            <CommentForm v-if="createComment" @submit="newComment" buttonColor="green" buttonText="Отправить комментарий" class="mb-7"/>
        </div>

        <template
                v-for="(comment, commentInd) in titleComments(titleId)"
                :id="commentInd"
        >
            <Comment
                    :comment="comment"
                    @deleted="deleted"
                    @edited="edited"
                    @answered="answered"
                    @liked="liked"
            />
            <v-list-group
                      sub-group
                      v-if="comment.answersCount > 0"
              >
                  <template v-slot:activator >
                      <v-list-item-title @click="loadAnswers(comment)">Ответы...</v-list-item-title>
                  </template>
                  <Comment
                          v-for="(answer, answerInd) in comment.answers"
                          :id="answerInd"
                          :key="answerInd"
                          :comment="answer"
                          @deleted="deleted"
                          @edited="edited"
                          @answered="answered"
                          @liked="liked"
                  >
                  </Comment>
                  <v-list-item @click="" class="py-2 loadMore">Загрузить еще...</v-list-item>
              </v-list-group>
        </template>
    </v-card>
</template>

<script>
    import Comment from "./Comment";
    import {COMMENTS_REQUEST, CREATE_COMMENT, DELETE_COMMENT, EDIT_COMMENT, LIKE_COMMENT} from "../store/actions/comments";
    import {mapGetters} from "vuex";
    import CommentForm from "./CommentForm";

    export default {
        name: "CommentSection",
        components: {CommentForm, Comment},
        props: ['titleId'],
        data() {
            return {
                createComment: false
            }
        },
        methods: {
            deleted(comment) {
                this.$store.dispatch(DELETE_COMMENT, {comment});
            },
            edited(comment, text) {
                this.$store.dispatch(EDIT_COMMENT, {comment, text});
            },
            newComment(text) {
                const {titleId} = this;
                this.$store.dispatch(CREATE_COMMENT, {titleId, text});
                this.createComment = false
            },
            answered(comment, text) {
                const {titleId} = this;
                this.$store.dispatch(CREATE_COMMENT, {titleId, text, parentComment: comment});
            },
            liked(comment, isLiked) {
                console.log(comment, 'liked');
                this.$store.dispatch(LIKE_COMMENT, {comment, isLiked});
            },
            loadAnswers(comment){
                const parentComment = comment;
                this.$store.dispatch(COMMENTS_REQUEST, {parentComment});
            }
        },
        computed: {
            ...mapGetters(["isProfileLoaded", "currentTitle", 'titleComments', 'getProfile'])
        },
        beforeMount() {
            const {titleId} = this
            this.$store.dispatch(COMMENTS_REQUEST, {titleId});
        }
    }
</script>

<style scoped>
    .v-application .primary--text, .loadMore {
        color: #2c3e50 !important;
    }

    .loadMore {
        background: #0089ff1a;
    }
</style>
