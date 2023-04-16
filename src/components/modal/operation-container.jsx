import { Action, CallbackOnBackHandler } from './props-type'

import Modal from './modal'
import React from 'react'
import { TextStyle } from 'react-native'
import { WithTheme } from '../style'
import modalStyle from './style/index'

export default class OperationContainer extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      visible: true,
    }
  }

  onBackAndroid = () => {
    const { onBackHandler } = this.props
    if (typeof onBackHandler === 'function') {
      const flag = onBackHandler()
      if (flag) {
        this.onClose()
      }
      return true
    } else if (this.state.visible) {
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

  render() {
    const { actions, onAnimationEnd } = this.props
    const footer = actions.map((button) => {
      // tslint:disable-next-line:only-arrow-functions
      const orginPress = button.onPress || function () {}
      button.onPress = () => {
        const res = orginPress()
        if (res && (res).then) {
          // eslint-disable-next-line no-extra-semi
          ;(res).then(() => {
            this.onClose()
          })
        } else {
          this.onClose()
        }
      }
      return button
    })
    return (
      <WithTheme themeStyles={modalStyle}>
        {(styles) => (
          <Modal
            operation
            transparent
            maskClosable
            visible={this.state.visible}
            onClose={this.onClose}
            onAnimationEnd={onAnimationEnd}
            onRequestClose={this.onBackAndroid}
            style={styles.operationContainer}
            bodyStyle={styles.operationBody}
            footer={footer}
          />
        )}
      </WithTheme>
    )
  }
}