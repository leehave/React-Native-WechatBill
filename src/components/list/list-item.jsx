import {
  BriefProps as BriefBasePropsType,
  ListItemPropsType,
} from './props-type'
import {
  GestureResponderEvent,
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ViewStyle,
} from 'react-native'
import ListStyles, { ListStyle } from './style/index'
import { WithTheme, WithThemeStyles } from '../style'

import React from 'react'

export class Brief extends React.Component {
  render() {
    const { children, style, wrap } = this.props

    let numberOfLines = {}

    if (wrap === false) {
      numberOfLines = {
        numberOfLines: 1,
      }
    }
    return (
      <WithTheme styles={this.props.styles} themeStyles={ListStyles}>
        {(styles) => (
          <View style={[styles.Brief]}>
            <Text style={[styles.BriefText, style]} {...numberOfLines}>
              {children}
            </Text>
          </View>
        )}
      </WithTheme>
    )
  }
}

export default class Item extends React.Component {
  static defaultProps = {
    multipleLine: false,
    wrap: false,
    delayLongPress: 500,
    onLongPress: () => {},
  }
  static Brief = Brief
  render() {
    const {
      styles,
      children,
      multipleLine,
      thumb,
      extra,
      arrow,
      style,
      onPress,
      onPressIn,
      onPressOut,
      onLongPress,
      delayLongPress,
      wrap,
      disabled,
      align,
      ...restProps
    } = this.props

    return (
      <WithTheme styles={styles} themeStyles={ListStyles}>
        {(itemStyles) => {
          let numberOfLines = {}
          if (wrap === false) {
            numberOfLines = {
              numberOfLines: 1,
            }
          }

          let underlayColor = {}

          if (!disabled && onPress) {
            underlayColor = {
              underlayColor: StyleSheet.flatten(itemStyles.underlayColor)
                .backgroundColor,
              activeOpacity: 0.5,
            }
          } else {
            underlayColor = {
              activeOpacity: 1,
            }
          }

          let alignStyle = {}

          if (align === 'top') {
            alignStyle = {
              alignItems: 'flex-start',
            }
          } else if (align === 'bottom') {
            alignStyle = {
              alignItems: 'flex-end',
            }
          }

          let contentDom
          if (Array.isArray(children)) {
            const tempContentDom = []
            children.forEach((el, index) => {
              if (React.isValidElement(el)) {
                tempContentDom.push(el)
              } else {
                tempContentDom.push(
                  <Text
                    style={[itemStyles.Content]}
                    {...numberOfLines}
                    key={`${index}-children`}>
                    {el}
                  </Text>,
                )
              }
            })
            contentDom = (
              <View style={[itemStyles.column]}>{tempContentDom}</View>
            )
          } else {
            if (children && React.isValidElement(children)) {
              contentDom = <View style={[itemStyles.column]}>{children}</View>
            } else {
              contentDom = (
                <View style={[itemStyles.column]}>
                  <Text style={[itemStyles.Content]} {...numberOfLines}>
                    {children}
                  </Text>
                </View>
              )
            }
          }

          let extraDom
          if (extra) {
            extraDom = (
              <View style={[itemStyles.column]}>
                <Text style={[itemStyles.Extra]} {...numberOfLines}>
                  {extra}
                </Text>
              </View>
            )
            if (React.isValidElement(extra)) {
              const extraChildren = (extra.props).children
              if (Array.isArray(extraChildren)) {
                const tempExtraDom = []
                extraChildren.forEach((el, index) => {
                  if (typeof el === 'string') {
                    tempExtraDom.push(
                      <Text
                        {...numberOfLines}
                        style={[itemStyles.Extra]}
                        key={`${index}-children`}>
                        {el}
                      </Text>,
                    )
                  } else {
                    tempExtraDom.push(el)
                  }
                })
                extraDom = (
                  <View style={[itemStyles.column]}>{tempExtraDom}</View>
                )
              } else {
                extraDom = extra
              }
            }
          }
          const itemView = (
            <View {...restProps} style={[itemStyles.Item, style]}>
              {typeof thumb === 'string' ? (
                <Image
                  source={{ uri: thumb }}
                  style={[
                    itemStyles.Thumb,
                    multipleLine && itemStyles.multipleThumb,
                  ]}
                />
              ) : (
                thumb
              )}
              <View
                style={[
                  itemStyles.Line,
                  multipleLine && itemStyles.multipleLine,
                  multipleLine && alignStyle,
                ]}>
                {contentDom}
                {extraDom}
                {arrow
                  ? <View style={itemStyles.Arrow} />
                  : null}
              </View>
            </View>
          )

          return (
            <TouchableHighlight
              {...underlayColor}
              onPress={
                (this.props).onClick
                  ? (this.props).onClick
                  : onPress || undefined
              }
              onPressIn={onPressIn}
              onPressOut={onPressOut}
              onLongPress={onLongPress}
              delayLongPress={delayLongPress}>
              {itemView}
            </TouchableHighlight>
          )
        }}
      </WithTheme>
    )
  }
}