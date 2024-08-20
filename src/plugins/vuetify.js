import DateFnsAdapter from '@date-io/date-fns'
import enUS from 'date-fns/locale/en-US'
// import en from 'date-fns/locale/en';
import format from "date-fns/fp/formatWithOptions";
import {fr} from 'date-fns/locale/fr';
import es from 'date-fns/locale/es';
// import { format } from 'date-fns';
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import { VDateInput } from 'vuetify/labs/VDateInput'
// const formatMonth = format({ locale: fr }, "MMM");
// const supportedLocales = ['fr-FR', 'de-DE', 'en-US']; // Your supported locales
// // const userLocale = 'fr-FR'; // User's preferred locale (from backend response)
// const userLocale = fr; // or en, or es
// format(new Date(), 'dd/mm/yyyy', { userLocale })
// const selectedLocale = supportedLocales.includes(userLocale) ? userLocale : 'en-US';
// const localeData = selectedLocale.split('-')[0]; // Extract 'fr' from 'fr-FR'

// import(`date-fns/locale/${localeData}`).then((localeModule) => {
//   const { format } = localeModule;
//   const formattedDate = format(new Date(), 'PP');
//   console.log(formattedDate);
// });

const vuetify = createVuetify({
  components: {
    VDateInput,
  },
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: "dark",
  },
  // date: {
  //   adapter: DateFnsAdapter,
  //   locale: {
  //     fr: fr,

  //   },
  // },  
});

export default vuetify;
