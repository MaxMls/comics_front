import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import users from "./modules/users";
import auth from "./modules/auth";
import titles from "./modules/titles";
import comments from "./modules/comments";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        user,
        auth,
        titles,
        comments,
        users
    },
    strict: debug
});
