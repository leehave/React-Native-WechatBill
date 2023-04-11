/**
 * WebView
 * @file 公共 WebView 页
 * @module pages/common/webview
 */

import { IPageProps, NavigationProps } from '@app/types/props'
import { Linking, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'
import { action, computed, observable } from 'mobx'

import Clipboard from '@react-native-clipboard/clipboard'
import { Iconfont } from '@app/components/common/iconfont'
import { LANGUAGE_KEYS } from '@app/constants/language'
import { TouchableView } from '@app/components/common/touchable-view'
import { WebView } from 'react-native-webview'
import { boundMethod } from 'autobind-decorator'
import colors from '@app/style/colors'
import { getHeaderButtonStyle } from '@app/style/mixins'
import i18n from '@app/services/i18n'
import { observer } from 'mobx-react'
import sizes from '@app/style/sizes'
import { stringLimit } from '@app/utils/filters'

const ActionSheet = require('react-native-actionsheet').default

class WebviewStore {

  @observable url = ''
  @observable title = null
  @observable isLoading = false

  webViewElement = React.createRef()
  actionSheetElement = React.createRef()

  @action.bound updateUrl(url) {
    this.url = url
  }

  @action.bound updateTitle(title) {
    this.title = title
  }

  @action.bound updateLoadingState(loading) {
    this.isLoading = loading
  }
}

export const webViewStore = new WebviewStore()
// export interface IWebViewProps extends IPageProps {}

@observer export class WebViewPage extends Component {

  constructor(props) {
    super(props)
    this.initUrl()
  }

  static getPageScreenOptions = ({ navigation, route }) => {
    const title = route?.params?.title || '...'

    return {
      title: stringLimit(title, 20),
      headerLeft: () => (
        <TouchableView onPress={() => navigation.goBack()}>
          <Iconfont
            name="prev"
            color={colors.cardBackground}
            {...getHeaderButtonStyle(18)}
          />
        </TouchableView>
      ),
      headerRight: () => (
        <TouchableView
          onPress={() => {
            const { actionSheetElement: actionSheetRef } = webViewStore
            const actionSheet = actionSheetRef.current
            actionSheet && actionSheet.show()
          }}
        >
          <Iconfont
            name="share"
            color={colors.cardBackground}
            {...getHeaderButtonStyle(20)}
          />
        </TouchableView>
      )
    }
  }

  @computed
  get actionSheetMenus() {
    return [
      {
        title: i18n.t(LANGUAGE_KEYS.OPEN_BY_BROWER),
        handle: () => Linking
          .openURL(webViewStore.url)
          .catch((error) => console.warn('Open url failed:', error))
      },
      {
        title: i18n.t(LANGUAGE_KEYS.COPY_URL),
        handle: () => Clipboard.setString(webViewStore.url)
      }
    ]
  }

  @computed
  get actionSheetMenuNames() {
    return this.actionSheetMenus.map(menu => menu.title)
  }

  initUrl() {
    const url = this.props.route?.params?.url
    url && this.updateUrl(url)
  }

  updateTitle(title) {
    webViewStore.updateTitle(title)
    this.props.navigation.setParams({ title })
  }

  updateUrl(url) {
    webViewStore.updateUrl(url)
  }

  @boundMethod
  handleWebViewStateChange(state) {
    this.updateUrl(state.url)
    this.updateTitle(state.title)
  }

  @boundMethod
  handleActionSheetPress(index) {
    const menu = this.actionSheetMenus[index]
    menu && menu.handle && menu.handle()
  }

  render() {
    const store = webViewStore
    const { styles } = obStyles

    if (!store.url) {
      return null
    }

    return (
      <View style={styles.container}>
        <WebView
          ref={store.webViewElement}
          style={styles.webview} 
          source={{ uri: store.url }}
          onLoad={() => store.updateLoadingState(true)}
          onLoadEnd={() => store.updateLoadingState(false)}
          onNavigationStateChange={this.handleWebViewStateChange}
          startInLoadingState={true}
          domStorageEnabled={true}
          javaScriptEnabled={true}
        />
        <ActionSheet
          ref={store.actionSheetElement}
          title={i18n.t(LANGUAGE_KEYS.URL_OPEN_TYPE)}
          options={[...this.actionSheetMenuNames, i18n.t(LANGUAGE_KEYS.CANCEL)]}
          cancelButtonIndex={this.actionSheetMenuNames.length}
          onPress={this.handleActionSheetPress}
        />
      </View>
    )
  }
}

const obStyles = observable({
  get styles() {
    return StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      webview: {
        flex: 1,
        width: sizes.screen.width,
        height: sizes.screen.height,
        backgroundColor: colors.cardBackground
      }
    })
  }
})
