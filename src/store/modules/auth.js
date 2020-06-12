/* eslint-disable promise/param-names */
import {AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT} from "../actions/auth";
import {USER_REQUEST} from "../actions/user";
import apiCall from "../../utils/api";
import {ON_AUTH_UPDATE} from "../actions/titles";

export default {
    state: {
        token: localStorage.getItem("user-token") || "",
        status: "",
        hasLoadedOnce: false
    },

    getters: {
        isAuthenticated: state => !!state.token,
        authStatus: state => state.status
    },

    actions: {
        [AUTH_REQUEST]: ({commit, dispatch}, user) => {
            return new Promise((resolve, reject) => {
                commit(AUTH_REQUEST);
                apiCall({url: "/auth/login", data: user, method: "post"})
                    .then(resp => {
                        localStorage.setItem("user-token", resp.data.token);
                        commit(AUTH_SUCCESS, resp);
                        dispatch(USER_REQUEST);
                        resolve(resp);
                    })
                    .catch(err => {
                        commit(AUTH_ERROR, err);
                        localStorage.removeItem("user-token");
                        reject(err);
                    });
            });
        },
        [AUTH_LOGOUT]: ({commit, dispatch}) => {
            return new Promise(resolve => {
                commit(AUTH_LOGOUT);
                localStorage.removeItem("user-token");
                dispatch(ON_AUTH_UPDATE, false, {root: true});
                resolve();
            });
        }
    },

    mutations: {
        [AUTH_REQUEST]: state => {
            state.status = "loading";
        },
        [AUTH_SUCCESS]: (state, resp) => {
            state.status = "success";
            state.token = resp.token;
            state.hasLoadedOnce = true;
        },
        [AUTH_ERROR]: state => {
            state.status = "error";
            state.hasLoadedOnce = true;
        },
        [AUTH_LOGOUT]: state => {
            state.token = "";
        }
    }


};
