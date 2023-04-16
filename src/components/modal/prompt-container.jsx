import { CallbackOnBackHandler, CallbackOrActions } from './props-type'
import { Text, TextInput, TextStyle, View } from 'react-native'
import { WithTheme, WithThemeStyles } from '../style'
import promptStyles, { PromptStyle } from './style/prompt'

import Modal from './modal'
import React from 'react'

export default class PropmptContainer extends React.Component {
  static defaultProps = {
    type: 'default',
    defaultValue: '',
  }

  // static contextType = LocaleContext

  constructor(props) {
    super(props)
    this.state = {
      visible: true,
      text: props.defaultValue,
      password: props.type === 'secure-text' ? props.defaultValue : '',
    }
  }

  onBackAndroid = () => {
    const { onBackHandler } = this.props
    if (typeof onBackHandler === 'function') {
      const flag = onBackHandler()
      if (flag) {
        this.onClose()
      }
      return flag
    }
    if (this.state.visible) {
      this.onClose()
      return true
    }
    return false
  }

  onClose = () => {
    this.setState({
      visible: false,
    })
  }

  onChangeText(type, value) {
    this.setState({
      [type]: value,
    })
  }

  render() {
    const { title, onAnimationEnd, message, type, actions, placeholders } =
      this.props
    const { text, password } = this.state
    const that = this
    const getArgs = function (func) {
      if (type === 'login-password') {
        return func.apply(that, [text, password])
      } else if (type === 'secure-text') {
        return func.apply(that, [password])
      }
      return func.apply(that, [text])
    }

    // tslint:disable-next-line:variable-name
    const _locale = {
      okText: '确定',
      cancelText: '取消',
      buttonText: '按钮',
    }

    let callbacks
    if (typeof actions === 'function') {
      callbacks = [
        { text: _locale.cancelText, style: 'cancel', onPress: () => {} },
        { text: _locale.okText, onPress: () => getArgs(actions) },
      ]
    } else {
      callbacks = actions.map((item) => {
        return {
          text: item.text,
          onPress: () => {
            if (item.onPress) {
              return getArgs(item.onPress)
            }
          },
          style: item.style || {},
        }
      })
    }

    const footer = (callbacks).map((button) => {
      // tslint:disable-next-line:only-arrow-functions
      const orginPress = button.onPress || function () {}
      button.onPress = () => {
        const res = orginPress()
        if (res && res.then) {
          res.then(() => {
            this.onClose()
          })
        } else {
          this.onClose()
        }
      }
      return button
    })

    return (
      <WithTheme styles={this.props.styles} themeStyles={promptStyles}>
        {(styles) => {
          const firstStyle = [styles.inputWrapper]
          const lastStyle = [styles.inputWrapper]

          if (type === 'login-password') {
            firstStyle.push(styles.inputFirst)
            lastStyle.push(styles.inputLast)
          } else if (type === 'secure-text') {
            lastStyle.push(styles.inputFirst)
            lastStyle.push(styles.inputLast)
          } else {
            firstStyle.push(styles.inputFirst)
            firstStyle.push(styles.inputLast)
          }

          return (
            <Modal
              transparent
              title={title}
              visible={this.state.visible}
              footer={footer}
              onAnimationEnd={onAnimationEnd}
              onRequestClose={this.onBackAndroid}>
              {message ? <Text style={styles.message}>{message}</Text> : null}
              <View style={styles.inputGroup}>
                {type !== 'secure-text' && (
                  <View style={firstStyle}>
                    <TextInput
                      autoFocus
                      onChangeText={(value) => {
                        this.onChangeText('text', value)
                      }}
                      defaultValue={this.state.text}
                      style={styles.input}
                      underlineColorAndroid="transparent"
                      placeholder={placeholders[0]}
                    />
                  </View>
                )}
                {(type === 'secure-text' || type === 'login-password') && (
                  <View style={lastStyle}>
                    <TextInput
                      autoFocus
                      secureTextEntry
                      onChangeText={(value) => {
                        this.onChangeText('password', value)
                      }}
                      defaultValue={this.state.password}
                      style={styles.input}
                      underlineColorAndroid="transparent"
                      placeholder={placeholders[1]}
                    />
                  </View>
                )}
              </View>
            </Modal>
          )
        }}
      </WithTheme>
    )
  }
}