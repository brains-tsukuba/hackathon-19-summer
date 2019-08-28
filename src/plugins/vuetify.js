import Vue from "vue";
import Vuetify from "vuetify/lib";

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi"
  },
  theme: {
    themes: {
      light: {
        primary: '#FF3579',
        secondary: '#00A692',
        accent: "#CE93D8",
        error: "#ff1744"
      },
      dark: {
        primary: "#880E4F",
      },
    },
  }
});
