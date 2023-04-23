import {
  StyleProp,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native'
import TagStyles, { TagStyle } from './style/index'
import { WithTheme, WithThemeStyles } from '../style'

import React from 'react'
import classnames from 'classnames'

export default class Tag extends React.Component {
  static defaultProps = {
    disabled: false,
    small: false,
    selected: false,
    closable: false,
    onClose() {},
    afterClose() {},
    onChange() {},
    onLongPress() {},
  }

  constructor(props) {
    super(props)

    this.state = {
      selected: props.selected,
      closed: false,
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.selected !== nextProps.selected) {
      this.setState({
        selected: nextProps.selected,
      })
    }
  }

  onPress = () => {
    const { disabled, onChange } = this.props
    if (disabled) {
      return
    }
    const isSelect = this.state.selected
    this.setState(
      {
        selected: !isSelect,
      },
      () => {
        if (onChange) {
          onChange(!isSelect)
        }
      },
    )
  }

  handleLongPress = () => {
    const { disabled, onLongPress } = this.props
    if (disabled) {
      return
    }
    if (onLongPress) {
      onLongPress()
    }
  }

  onTagClose = () => {
    if (this.props.onClose) {
      this.props.onClose()
    }
    this.setState(
      {
        closed: true,
      },
      this.props.afterClose,
    )
  }

  render() {
    const { children, disabled, small, closable, style } = this.props

    return (
      <WithTheme styles={this.props.styles} themeStyles={TagStyles}>
        {(styles) => {
          const wrapCls = classnames({
            normalWrap:
              !disabled && (!this.state.selected || small || closable),
            wrapSmall: small,
            activeWrap: this.state.selected && !disabled && !small && !closable,
            disabledWrap: disabled,
          })
            .split(' ')
            .map((a) => styles[a])

          const textCls = classnames({
            normalText:
              !disabled && (!this.state.selected || small || closable),
            smallText: small,
            activeText: this.state.selected && !disabled && !small && !closable,
            disabledText: disabled,
          })
            .split(' ')
            .map((a) => styles[a])

          const closableDom =
            closable && !disabled && !small ? (
              <View>
                <Text style={[styles.close]}>×</Text>
              </View>
            ) : null
          return !this.state.closed ? (
            <View style={[styles.tag, style]}>
              <TouchableWithoutFeedback
                onPress={this.onPress}
                onLongPress={this.handleLongPress}>
                <View style={[styles.wrap, wrapCls]}>
                  {React.isValidElement(children) ? (
                    children
                  ) : (
                    <Text style={[styles.text, textCls]}>{children}</Text>
                  )}
                </View>
              </TouchableWithoutFeedback>
              {closableDom}
            </View>
          ) : null
        }}
      </WithTheme>
    )
  }
}