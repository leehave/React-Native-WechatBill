import { action, computed, observable } from 'mobx'
import { isDarkSystemTheme, updateTheme } from '@app/style/colors'

import { STORAGE } from '@app/constants/storage'
import { boundMethod } from 'autobind-decorator'
import storage from '@app/services/storage'

export interface IOptionStore {
  darkTheme: boolean
}

class OptionStore {

  constructor() {
    this.resetStore()
  }

  // @observable.ref language: TLanguage = LANGUAGES.ZH
  @observable.ref darkTheme: boolean = isDarkSystemTheme

  // @computed get isEnLang() {
  //   return this.language === LANGUAGES.EN
  // }

  // @action.bound
  // updateLanguageWithOutStorage(language: TLanguage) {
  //   this.language = language
  //   updateLanguage(language)
  // }

  // @action.bound
  // updateLanguage(language: TLanguage) {
  //   this.updateLanguageWithOutStorage(language)
  //   storage.set(STORAGE.LOCAL_LANGUAGE, language)
  // }

  @action.bound
  updateDarkTheme(darkTheme: boolean) {
    this.darkTheme = darkTheme
    storage.set(STORAGE.LOCAL_DARK_THEME, darkTheme)
    updateTheme(darkTheme)
  }

  @boundMethod
  resetStore() {
    this.initDarkTheme()
  }
  // 暂时不做
  // private initLanguage() {
  //   // 获取本地存储的用户设置语言，若用户未设置语言，则首选本机语言
  //   storage.get<TLanguage>(STORAGE.LOCAL_LANGUAGE)
  //     .then(localLanguage => {
  //       return localLanguage
  //         ? Promise.resolve(localLanguage)
  //         : getDeviceLanguage()
  //     })
  //     .then(language => {
  //       console.log('Init app language:', language)
  //       this.updateLanguageWithOutStorage(language)
  //     })
  // }

  private initDarkTheme() {
    storage.get<boolean>(STORAGE.LOCAL_DARK_THEME).then(darkTheme => {
      if (darkTheme != null) {
        console.log('Init app darkTheme:', darkTheme)
        this.updateDarkTheme(darkTheme)
      }
    })
  }
}

export const optionStore = new OptionStore()
