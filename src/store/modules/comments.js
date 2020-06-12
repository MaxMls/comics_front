import {COMMENTS_REQUEST, CREATE_COMMENT, DELETE_COMMENT, EDIT_COMMENT, FORCE_COMMENTS_REQUEST, LIKE_COMMENT} from "../actions/comments";
import apiCall from "../../utils/api";
import Vue from "vue";

export default {
    state: {
        comments: { // шаблон для идешки
            templateTitleId: [
                {
                    _id: String,
                    titleId: String,
                    authorId: String,
                    text: String,
                    parentCommentId: String,
                    likeCount: Number,
                    likers: [],
                    answersCount: Number,
                    answers: [],
                }
            ]
        }
    },

    actions: {
        [COMMENTS_REQUEST]: ({commit, dispatch, state}, {titleId, parentComment, limit, offset}) => {
            // if (!state.comments[titleId]) {
            dispatch(FORCE_COMMENTS_REQUEST, {titleId, parentComment, limit, offset})
            // }
        },

        [FORCE_COMMENTS_REQUEST]: ({commit, dispatch, state}, {titleId, parentComment, limit, offset}) => {
            const parentCommentId = parentComment ? parentComment._id : null;

            apiCall({url: '/comments/', method: 'get', data: {titleId, parentCommentId, limit, offset}}).then(resp => {
                const comments = resp.data.comments;
                // вставить коммит загруженных юзверов

                commit(COMMENTS_REQUEST, {titleId, parentComment, comments})
            })
        },
        [CREATE_COMMENT]: ({commit, dispatch, state}, {titleId, text, parentComment, isSpoiler}) => {
            const parentCommentId = parentComment ? parentComment._id : null;

            apiCall({url: '/comments/', method: 'post', data: {titleId, text, parentCommentId, isSpoiler}}).then(resp => {
                //  const newComment = {};
                dispatch(FORCE_COMMENTS_REQUEST, {titleId})// todo изменять без полного обновления
                //commit(CREATE_COMMENT, {titleId, text, newComment, parentComment})
            })
        },
        [DELETE_COMMENT]: ({commit, dispatch, state}, {comment}) => {
            const {_id, titleId} = comment;
            apiCall({url: '/comments/' + _id, method: 'delete'}).then(resp => {
                dispatch(FORCE_COMMENTS_REQUEST, {titleId}); // todo удалять без полного обновления
                commit(DELETE_COMMENT, comment)
            })
        },
        [EDIT_COMMENT]: ({commit, dispatch, state}, {comment, text}) => {
            const {_id} = comment;

            apiCall({url: '/comments/' + _id, method: 'put', data: {text}}).then(resp => {
                commit(EDIT_COMMENT, {comment, text})
            })
        },
        [LIKE_COMMENT]: ({commit, dispatch, state, rootState}, {comment, isLiked}) => {
            const {_id} = comment;

            console.log('tut');
            apiCall({url: '/comments/' + _id + '/like', method: 'post', data: {isLiked}}).then(resp => {
                commit(LIKE_COMMENT, {comment, isLiked, _id: rootState.user.profile._id});
            });
        },
    },
    mutations: {
        [COMMENTS_REQUEST]: (state, {titleId, parentComment, comments}) => {
            if(parentComment){
                Vue.set(parentComment, 'answers', comments);
            }
            else if(titleId){
                Vue.set(state.comments, titleId, comments);
            }
        },
        [CREATE_COMMENT]: (state, {titleId, parentId, text, newComment}) => {
            const index = state.comments[titleId].findIndex(c => c._id === parentId);
            if (index === -1) {
                state.comments[titleId].push(newComment)
            } else {
                state.comments[titleId][index].answers.push(newComment)
            }
        },
        [DELETE_COMMENT]: (state, comment) => {

        },
        [EDIT_COMMENT]: (state, {comment, text}) => {
            comment.text = text;
        },
        [LIKE_COMMENT]: (state, {comment, isLiked, _id}) => {
            comment.likeCount += isLiked ? 1 : -1;
            if (isLiked) {
                comment.likers.push(_id)
            } else {
                const index = comment.likers.indexOf(_id);
                if (index !== -1) comment.likers.splice(index, 1);
            }
        },
    },

    getters: {
        titleComments: state => (titleId) => state.comments[titleId]
    }

}
