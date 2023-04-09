/**
 * DoubleClick
 * @file 双击控件
 * @module app/components/common/double-click
 */

import React, { Component, ReactNode } from 'react'
import { StyleProp, TouchableWithoutFeedback, View, ViewStyle } from 'react-native'
import { action, observable } from 'mobx'

import { boundMethod } from 'autobind-decorator'
import { observer } from 'mobx-react'

export interface IDoubleClickProps {
  onDoubleClick(): void
  onPress?(): void
  style?: StyleProp<ViewStyle>
  delay?: number,
  children?: ReactNode
}

@observer export class DoubleClick extends Component<IDoubleClickProps> {

  @observable.ref private lastPress: number = 0

  @action
  private updateLastPress(lastPress: number) {
    this.lastPress = lastPress
  }

  @boundMethod
  private onPress() {
    const delta = new Date().getTime() - this.lastPress
    const delay = this.props.delay || 200
    const isDoubleClick = delta < delay
    if (isDoubleClick) {
      this.props.onDoubleClick()
    } else {
      this.props.onPress && this.props.onPress()
      this.updateLastPress(new Date().getTime())
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback
        style={this.props.style}
        onPress={this.onPress}
      >
        <View>{this.props.children}</View>
      </TouchableWithoutFeedback>
    )
  }
}
