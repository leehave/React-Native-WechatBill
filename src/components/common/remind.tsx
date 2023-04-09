/**
 * Remind
 * @file 小红点控件
 * @module app/components/common/remind
 */

import { StyleProp, TextStyle } from 'react-native'

import { Iconfont } from '@app/components/common/iconfont'
import React from 'react'
import colors from '@app/style/colors'
import { observer } from 'mobx-react'

interface IRemindProps {
  size?: number
  color?: string
  style?: StyleProp<TextStyle>
}

export const Remind = observer((props: IRemindProps): JSX.Element => {
  return (
    <Iconfont
      style={props.style}
      size={props.size || 10}
      color={props.color || colors.red}
      name="star"
    />
  )
})
