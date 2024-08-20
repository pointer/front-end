import Vue from 'vue'
// import VeeValidate from 'vee-validate'
import * as VeeValidate from 'vee-validate'
import en from 'vee-validate/dist/locale/en'
import fr from 'vee-validate/dist/locale/fr'
import es from 'vee-validate/dist/locale/es'
import ar from 'vee-validate/dist/locale/ar'
import ru from 'vee-validate/dist/locale/ru'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
import zh_TW from 'vee-validate/dist/locale/zh_TW'
import { extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import { messages } from 'vee-validate/dist/locale/en.json'

const veeValidateConfig = {
  locale: JSON.parse(localStorage.getItem('locale')) || 'en',
  dictionary: {
    en,
    es,
    fr,
    zh_CN,
    ar,
    ru
  }
}

Vue.use(VeeValidate, veeValidateConfig)
