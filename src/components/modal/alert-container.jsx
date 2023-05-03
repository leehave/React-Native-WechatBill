import React, { isValidElement } from 'react'
import { ScrollView, Text, TextStyle } from 'react-native'

import Modal from './modal'

export default class AlertContainer extends React.Component{
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

  render() {
    const { title, actions, content, onAnimationEnd } = this.props
    const footer = actions.map((button) => {
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
      <Modal
        transparent
        title={title}
        visible={this.state.visible}
        footer={footer}
        onAnimationEnd={onAnimationEnd}
        onRequestClose={this.onBackAndroid}
        bodyStyle={{
          marginTop: 8,
          alignItems: 'center',
        }}>
        <ScrollView>
          {isValidElement(content) ? content : <Text>{content}</Text>}
        </ScrollView>
      </Modal>
    );
  }
}