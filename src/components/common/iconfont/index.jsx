/**
 * Text
 * @file 公共文本控件，解决了默认颜色和样式的问题
 * @module app/components/common/text
 */

import { Text as RNText, TextProps } from 'react-native'

import React from 'react'
import colors from '@app/style/colors'
import { glyphs } from './iconfont.json'
import { observer } from 'mobx-react'

const iconMap = glyphs.reduce((map, icon) => {
  return {
    ...map,
    [icon.font_class]: String.fromCharCode(parseInt(icon.unicode, 16))
  }
}, {})


export const Iconfont = observer((props) => {
  return (
    <RNText
      {...props}
      style={[
        // eslint-disable-next-line react-native/no-inline-styles
        {
          color: props.color || colors.textDefault,
          fontFamily: 'iconfont'
        },
        !props.size ? null : {
          fontSize: props.size,
        },
        props.style
      ]}
    >
      {iconMap[props.name]}
    </RNText>
  )
})
