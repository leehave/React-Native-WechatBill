/**
 * I18n service
 * @file 多语言服务
 * @module app/services/i18n
 */

import * as RNLocalize from 'react-native-localize'

import { LANGUAGES, LANGUAGE_KEYS } from '@app/constants/language'
import { action, observable } from 'mobx'

import zh from '@app/languages/zh'

export const languageMaps = {
  [LANGUAGES.ZH]: {
    name: zh[LANGUAGE_KEYS.CHINESE]
  },
}

const languages = { zh }

class I18nStore {

  @observable
  language = LANGUAGES.ZH

  @action.bound
  updateLanguage(language) {
    this.language = language
  }

  t(key) {
    return languages[this.language][key]
  }

  translate(key, language = this.language) {
    return languages[language][key]
  }
}

export const i18n = new I18nStore()
export default i18n
export const updateLanguage = i18n.updateLanguage.bind(i18n)
export const getDeviceLanguage = () => {
  const localTags = RNLocalize
    .getLocales()
    .map((local) => local.languageCode)
  return localTags.some((tag) => tag.toLocaleLowerCase().includes(LANGUAGES.ZH))
    ? LANGUAGES.ZH : LANGUAGES.ZH
}
