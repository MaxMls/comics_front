import {USER_REQUEST, USER_ERROR, USER_SUCCESS, USER_CREATE, USER_EDIT} from "../actions/user";
import apiCall from "../../utils/api";
import Vue from "vue";
import {AUTH_LOGOUT} from "../actions/auth";
import {ON_AUTH_UPDATE} from "../actions/titles";

const state = {status: "", profile: {}};

const getters = {
    getProfile: state => state.profile,
    isProfileLoaded: state => !!state.profile.name
};

const actions = {
    [USER_REQUEST]: ({commit, dispatch, getters}) => {
        commit(USER_REQUEST);
        apiCall({url: "/auth/profile", method: 'post'})
            .then(resp => {
                commit(USER_SUCCESS, resp);
                dispatch(ON_AUTH_UPDATE, true, {root: true});
            })
            .catch(() => {
                commit(USER_ERROR);
                // if resp is unauthorized, logout, to
                dispatch(AUTH_LOGOUT);
            });

    },
    [USER_CREATE]: ({commit, dispatch}, user) => {
        return new Promise((resolve, reject) => {
            commit(USER_CREATE);
            apiCall({url: "/users", data: user, method: "post"})
                .then(resp => {
                    resolve(resp);
                })
                .catch(err => {
                    commit(USER_ERROR);
                    reject(err);
                });
        });
    },
    [USER_EDIT]: ({commit, dispatch}, {id, name = null, password = null}) => {
        return new Promise((resolve, reject) => {
            apiCall({url: "/users/" + id, data: {name, password}, method: "put"})
                .then(resp => {
                    resolve(resp);
                    dispatch(USER_REQUEST)
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
};

const mutations = {
    [USER_CREATE]: state => {
        state.status = "loading";
    },
    [USER_EDIT]: state => {

    },
    [USER_REQUEST]: state => {
        state.status = "loading";
    },
    [USER_SUCCESS]: (state, resp) => {
        state.status = "success";
        Vue.set(state, "profile", resp.data);
    },
    [USER_ERROR]: state => {
        state.status = "error";
    },
    [AUTH_LOGOUT]: state => {
        state.profile = {};
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
