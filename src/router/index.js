import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: "/404",
        name: "not-found",
        component: () => import(/* webpackChunkName: "users" */ "../views/404.vue")
    },
    {
        path: "/oauth/:service",
        name: "oauth",
        props: true,
        component: () => import(/* webpackChunkName: "users" */ "../views/OAuthWindow.vue")
    },
    {
        path: "*",
        name: "not-found",
        component: () => import(/* webpackChunkName: "users" */ "../views/404.vue")
    },
    {
        path: "/users",
        name: "users",
        component: () => import(/* webpackChunkName: "users" */ "../views/Users.vue")
    },
    {
        path: "/id/:userId",
        name: "user",
        component: () => import(/* webpackChunkName: "user" */ "../views/User.vue"),
        props: true
    },
    {
        path: "/id/:userId/favorites",
        name: "favorites",
        component: () => import(/* webpackChunkName: "favorites" */ "../views/Favorites.vue"),
        props: true
    },
    {
        path: "/id/:userId/history",
        name: "history",
        component: () => import(/* webpackChunkName: "history" */ "../views/History.vue"),
        props: true
    },
    {
        path: "/about",
        name: "about",
        component: () => import(/* webpackChunkName: "about" */ "../views/About.vue")
    },
    {
        path: "/",
        name: "main",
        component: () => import(/* webpackChunkName: "main" */ "../views/Main.vue")
    },
    {
        path: "/:categoryName",
        name: "category",
        component: () => import(/* webpackChunkName: "main" */ "../views/OneCategory.vue"),
        props: true
    },
    {
        path: "/:categoryName/:titleId",
        name: "title",
        component: () => import(/* webpackChunkName: "title" */ "../views/Title.vue"),
        props: true
    },
    {
        path: "/:categoryName/:titleId/:chapterInd",
        name: "chapter",
        component: () => import(/* webpackChunkName: "title" */ "../views/Chapter.vue"),
        props: true
    }
];


// требуются права администатора иначе 404 error, чтобы не тревожили базу проверками
const routes2 = [
    {
        path: "/",
        name: "main",
        // главная страница, тут рекомендации как в ютубе
    },
    /*    {
            path: "/c",
            name: "categories",
            component: Categories // выбор категории, например манга или комикс тут плитки с популярными произведениями из каждой категории и кнопка выбора категории
            // тут поиск предлагает поиск по всем категориям в первую очередь
        },*/
    {
        path: "/:categoryName",
        name: "category",
        // выбор категории, например манга или комикс и пказ всех произведений и фильтр проиведений
        // тут поиск предлагает поиск по одной категории с учетом фильтров в первую очередь
        // фильтры: по жанрам, по названию
        // сортировка по времени, по избранному // возможно по просмотру
    },
    /*
        {
            path: "/u",
            name: "users",
            component: Users, // Вывод минимальной информации(аватар има почта дата регистрации, дата входа) о всех пользователях/ *доступно только модератору и выше*
            // модер может редактировать всю инфу или установить бан(вся информация от пользователя не отображается у других)
            children: [ // один тайтл имеет такой адрес
                {
                    path: ':userId',
                    component: User,// /u/1234/ - страница пользователя
                    // его ник имя аватар и линия избранного, нажав на заголовок можно перейти к полному списку избранного
                    children: [
                        {
                            path: 'f',
                            component: Favorites, // избранное пользователя, в порядке убывания от нового к старому
                        },
                        {
                            path: 'c',
                            component: AllUserComments, // комментарии пользователя, в порядке убывания от нового к старому
                        },
                    ]
                },

            ]
        },
        {
            path: "/a" //при переходе создается новая запись о тайтле и идет переход на его пустую страницу
            // требуются права администатора иначе 404 error
            // при отмене, пустая запись остается, но скрыта от всех как черновик


        },*/
    {
        path: "/about",
        name: "about",
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/About.vue")
    }


];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
