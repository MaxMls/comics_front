import {
    CURRENT,
    FAVORITE_REQUEST,
    FORCE_TITLE_REQUEST,
    HISTORY_REQUEST,
    ON_AUTH_UPDATE, PUSH_TITLES,
    TITLE_REQUEST, TITLES_REQUEST
} from "../actions/titles";
import apiCall from "../../utils/api";
import Vue from "vue";
import {FORCE_COMMENTS_REQUEST} from "../actions/comments";

export default {
    state: {
        current: null,
        offsets: {
            m: 0,
            c: 0,
            favorite: 0
        },
        categories: {
            m: [
                /* {
                 category: 'm',
                 if: 0,
                 createdAt: '',
                 history: {
                 pageNum: 0
                 }
                 }*/

            ],
            c: [],
            favorite: []
        },
        titles: { // Инфо о всех загруженных тайтлах

            titleTemplate: {
                category: 'm',
                pagesCount: 0,
                history: {
                    pageNum: 0
                }
            }
        },
    },
    actions: {
        [TITLES_REQUEST]: async ({commit, dispatch, state}, {offset = 0, limit = 12, category, tags = [], sort = [], genres = [], userFavorite = null}) => {
            //
            await apiCall({url: '/titles', data: {offset: Math.max(state.offsets[category], offset || 0), limit, category, tags, sort, genres, userFavorite}, method: 'get'}).then(resp => {
                // temp
                //resp.data.titles = resp.data.titles.map(t => { return {...t, cover: "https://uwu.blob.core.windows.net/images/" + t.category + "/" + t.db + "/0/0.jpg"} });
                //s
                commit(PUSH_TITLES, {titles: resp.data.titles, category, offset});
            }).catch(resp => {
                console.error(resp);
            })

        },
        [ON_AUTH_UPDATE]: ({commit, dispatch, state}, isAuth) => { // Подмешивает или удаляет личные поля пользователя из состояния
            if (state.current !== null) {
                dispatch(FORCE_TITLE_REQUEST, state.current); // todo: сделать очистку при выходе без доп запроса
                dispatch(FORCE_COMMENTS_REQUEST, state.current, {root: true});
            }
        },
        [TITLE_REQUEST]: ({commit, dispatch, state}, id) => {
            if (state.titles[id] === undefined) {
                dispatch(FORCE_TITLE_REQUEST, id)
            } else {
                commit(CURRENT, id)
            }
        },
        [FORCE_TITLE_REQUEST]: ({commit, dispatch, state}, id) => {
            apiCall({url: '/titles/' + id, method: 'get'}).then(resp => {
                const t = resp.data.title;
                t.cover = "https://uwu.blob.core.windows.net/images/" + t.category + "/" + t.db + "/0/0.jpg"; // todo
                commit(TITLE_REQUEST, t)
            })
        },
        [FAVORITE_REQUEST]: ({commit, dispatch, state}, {isFavorite, titleId}) => {
            commit(FAVORITE_REQUEST, {isFavorite, titleId});
            apiCall({
                url: `/users/favorite`,
                method: 'post',
                data: {titleId, isFavorite}
            }).then(resp => {
                dispatch(TITLES_REQUEST, {offset: 0, limit: 12, category: 'favorite'})
                //console.log(resp);
            }).catch({})
        },
        [HISTORY_REQUEST]: ({commit, dispatch, state}, {titleId, chaptersIds = [], isRead, pageNum}) => {
            commit(HISTORY_REQUEST, {chaptersIds, titleId, isRead, pageNum});

            apiCall({
                url: `/users/history`,
                method: 'post',
                data: {chaptersIds, isRead, pageNum}
            }).then(resp => {
                //console.log(resp);
            })
        }

    },
    mutations: {
        [TITLE_REQUEST]: (state, t) => {
            Vue.set(state.titles, t._id, t);
            state.titles[t._id] = t;
            state.current = t._id;
        },
        [CURRENT]: (state, id) => {
            state.current = id;
        },
        [FAVORITE_REQUEST]: (state, {isFavorite, titleId}) => {
            state.titles[titleId].favorite = isFavorite;

            state.categories.favorite = [];
            state.offsets.favorite = 0;
        },
        [HISTORY_REQUEST]: (state, {titleId, chaptersIds, isRead, pageNum}) => {
            state.titles[titleId].chapters.filter(c => chaptersIds.includes(c.id)).forEach(c => {
                c.history = {pageNum: isRead ? pageNum : 0}
            })
        },
        [ON_AUTH_UPDATE]: (state, isAuth) => {
            state.titles = {}
        },
        [PUSH_TITLES]: (state, {titles = [], category, offset}) => {
            if (offset) state.offsets[category] = offset;
            state.offsets[category] += titles.length;
            state.categories[category].push(...titles)
        }
    },
    getters: {
        currentTitle: state => state.titles[state.current],
        titlesByCategory: state => category => {return state.categories[category]}
    }
}
