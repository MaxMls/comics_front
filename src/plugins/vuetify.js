import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from 'vuetify/es5/util/colors'
import ShikimoriLogo from "../vueComponents/icons/ShikimoriLogo";
import ShikimoryGlyph from "../vueComponents/icons/ShikimoryGlyph";

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'md',
        values: {
            ShikimoriLogo: {
                component: ShikimoriLogo,
            },
            ShikimoryGlyph: {
                component: ShikimoryGlyph,
            },
        },
    },
    breakpoint: {},
    lang: {},
    rtl: false,
    theme: {
        themes: {
            light: {
                primary:  colors.orange.lighten4,
                secondary: colors.grey.darken3,
                accent: colors.yellow //colors.white,
            },
            dark: {
                primary: colors.blue.lighten3,
                //assent: colors.yellow.darken1,
                assent: colors.blue.lighten3,
            },
        },
    }
});
