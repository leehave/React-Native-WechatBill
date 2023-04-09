/**
 * Text
 * @file 公共文本控件，解决了默认颜色和样式的问题
 * @module app/components/common/text
 */

import { Text as RNText, TextProps } from 'react-native'

import { IChildrenProps } from '@app/types/props'
import React from 'react'
import colors from '@app/style/colors'
import fonts from '@app/style/fonts'
import { observer } from 'mobx-react'

export const Text = observer((props: TextProps & IChildrenProps): JSX.Element => {
  return (
    <RNText
      {...props}
      style={[
        {
          color: colors.textDefault,
          fontFamily: fonts.fontFamily
        },
        props.style
      ]}
    >
      {props.children}
    </RNText>
  )
})
