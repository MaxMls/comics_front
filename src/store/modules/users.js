import {USERS_PUSH} from "../actions/users";
import apiCall from "../../utils/api";
import Vue from "vue";
import {CREATE_COMMENT} from "../actions/comments";

export default {

    state: {
        users: {
            templateUserId: {
                _id: String,
                name: String,
            }
        }
    },
    actions: {
        [CREATE_COMMENT]: ({commit, dispatch, state}, {users}) => {

        }


    },
    mutations: {},
    getters: {}
}
