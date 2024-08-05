// vuetify.config.ts
import { defineVuetifyConfiguration } from 'vuetify-nuxt-module/custom-configuration';
import { es } from 'vuetify/locale';
//import '../styles/settings.scss';

export default defineVuetifyConfiguration({
  /* vuetify options */
  //customVariables: ['~/assets/variables.scss'],
  locale: {
    locale: 'es',
    fallback: 'es',
    messages: { es },
  },

  theme: {
    defaultTheme: 'dark',
    themes: {
      light: {
        colors: {
          //primary: '#FF2D01',
          //Color mode light
          background: '#e6e6e6',
        },
      },
      dark: {
        colors: {
          //Colors mode dark
          //primary: '#FF2D01',
          background: '#00000000',
        },
      },
    },
  },
});
