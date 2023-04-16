import {
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputChangeEventData,
  TextInputProperties,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import TextareaItemStyles, { TextareaItemStyle } from './style/index'
import { Theme, WithTheme, WithThemeStyles } from '../style'

import React from 'react'
import { TextAreaItemPropsType } from './props-type'

function fixControlledValue(value) {
  if (typeof value === 'undefined' || value === null) {
    return ''
  }
  return value
}

export default class TextAreaItem extends React.Component {
  static defaultProps = {
    onChange() {},
    onFocus() {},
    onBlur() {},
    onErrorClick() {},
    clear: true,
    error: false,
    editable: true,
    rows: 1,
    count: 0,
    keyboardType: 'default',
    autoHeight: false,
    last: false,
  }
  textAreaRef = null

  constructor(props) {
    super(props)
    this.state = {
      inputCount: fixControlledValue(props.value || props.defaultValue).length,
    }
  }

  onChange = (event) => {
    const text = event.nativeEvent.text
    const { onChange } = this.props

    this.setState({
      inputCount: text.length,
    })

    if (onChange) {
      onChange(text)
    }
  }

  onContentSizeChange =
    (theme) =>
    (event) => {
      let height
      const { autoHeight, onContentSizeChange } = this.props
      const rows = this.props.rows
      if (autoHeight) {
        height = event.nativeEvent.contentSize.height
      } else if (rows > 1) {
        height = 6 * rows * 4
      } else {
        height = theme.list_item_height
      }

      this.setState({
        height,
      })

      if (onContentSizeChange) {
        onContentSizeChange(event)
      }
    }
  getHeight = (theme) => {
    const { rows } = this.props

    if (this.state.height) {
      return this.state.height
    }
    return rows !== undefined && rows > 1
      ? 6 * rows * 4
      : theme.list_item_height
  }
  render() {
    const {
      rows,
      error,
      clear,
      count,
      autoHeight,
      last,
      onErrorClick,
      styles,
      style,
      ...restProps
    } = this.props
    const { value, defaultValue } = restProps
    const { inputCount } = this.state

    return (
      <WithTheme themeStyles={TextareaItemStyles} styles={styles}>
        {(s, theme) => {
          let valueProps
          if ('value' in this.props) {
            valueProps = {
              value: fixControlledValue(value),
            }
          } else {
            valueProps = {
              defaultValue,
            }
          }

          const containerStyle = {
            borderBottomWidth: last ? 0 : theme.border_width_sm,
          }

          const textareaStyle = {
            color: error ? '#f50' : theme.color_text_base,
            paddingRight: error ? 2 * theme.h_spacing_lg : 0,
          }

          const maxLength = count > 0 ? count : undefined

          return (
            <View
              style={[s.container, containerStyle, { position: 'relative' }]}>
              <TextInput
                clearButtonMode={clear ? 'while-editing' : 'never'}
                underlineColorAndroid="transparent"
                style={[
                  s.input,
                  textareaStyle,
                  { height: Math.max(45, this.getHeight(theme)) },
                  style,
                ]}
                {...restProps}
                {...valueProps}
                onChange={(event) => this.onChange(event)}
                onContentSizeChange={this.onContentSizeChange(theme)}
                multiline={rows > 1 || autoHeight}
                numberOfLines={rows}
                maxLength={maxLength}
                ref={(ref) => (this.textAreaRef = ref)}
              />
              {rows > 1 && count > 0 ? (
                <View style={[s.count]}>
                  <Text style={s.countText}>
                    {inputCount} / {count}
                  </Text>
                </View>
              ) : null}
            </View>
          )
        }}
      </WithTheme>
    )
  }
}