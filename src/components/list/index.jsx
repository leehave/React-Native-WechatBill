import { StyleProp, Text, View, ViewStyle } from 'react-native'
import { WithTheme, WithThemeStyles } from '../style'
import listStyles, { ListStyle } from './style/index'

import Item from './list-item'
import React from 'react'

export default class List extends React.Component {
  static Item = Item

  render() {
    const {
      children,
      style,
      renderHeader,
      renderFooter,
      styles,
      ...restProps
    } = this.props

    return (
      <WithTheme styles={styles} themeStyles={listStyles}>
        {(s) => {
          let headerDom = null
          let footerDom = null

          if (renderHeader) {
            let content =
              typeof renderHeader === 'function' ? renderHeader() : renderHeader
            if (typeof content === 'string') {
              content = <Text style={s.Header}>{content}</Text>
            }
            headerDom = <View>{content}</View>
          }
          if (renderFooter) {
            let content =
              typeof renderFooter === 'function' ? renderFooter() : renderFooter
            if (typeof content === 'string') {
              content = <Text style={s.Footer}>{content}</Text>
            }
            footerDom = <View>{content}</View>
          }

          return (
            <View {...(restProps)} style={style}>
              {headerDom}
              <View style={s.Body}>
                {children ? children : null}
                <View style={[s.BodyBottomLine]} />
              </View>
              {footerDom}
            </View>
          )
        }}
      </WithTheme>
    )
  }
}