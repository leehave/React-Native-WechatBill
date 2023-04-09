import { TextStyle, ViewStyle } from 'react-native'

import React from 'react'

export interface KeyBoardButtonPropsType {
  style?: ViewStyle,
  index: number;
  onPress?: (index: number) => void | Promise<any>;
  title: string;
}
export interface KeyBoardFieldPropsType {
  money: number;
  styles?: ViewStyle;
  text?: string
}
export interface KeyBoardPropsType<T> {
  title?: React.ReactNode
  visible: boolean
  maskClosable?: boolean
  closable?: boolean
  footer?: Action<T>[]
  onClose?: () => void
  transparent?: boolean
  popup?: boolean
  animated?: boolean
  locale?: object
  animationType?: any
  onAnimationEnd?: (visible: boolean) => void
  animateAppear?: boolean
  operation?: boolean
}

export interface Action<T = TextStyle> {
  text: string
  onPress?: () => void | Promise<any>
  style?: T | string
}

export type Callback = (valueOrLogin: string, password?: string) => void
export type CallbackOrActions<T> = Callback | Action<T>[]

// 点击返回键的回调事件。参考RN中的BackHandler来返回值
export type CallbackOnBackHandler = () => boolean