/* eslint-disable react-native/no-inline-styles */
/**
 * AutoActivityIndicator
 * @file 加载指示器控件
 * @module app/components/common/activity-indicator
 */

import { ActivityIndicator, TextStyle, View, ViewStyle } from 'react-native'

import { IS_IOS } from '@app/config'
import React from 'react'
import { Text } from './text'
import colors from '@app/style/colors'
import fonts from '@app/style/fonts'
import mixins from '@app/style/mixins'
import { observer } from 'mobx-react'

export interface IAutoActivityIndicatorProps {
  size?: number | 'small' | 'large'
  style?: ViewStyle
  text?: string
  textStyle?: TextStyle
}

export const AutoActivityIndicator = observer((props: IAutoActivityIndicatorProps): JSX.Element => {

  const getIndicator = (style?: ViewStyle | null) => (
    <ActivityIndicator
      animating={true}
      style={style}
      size={props.size || 'small'}
      color={IS_IOS ? colors.secondary : colors.primary}
    />
  )

  if (props.text) {
    return (
      <View style={[{ ...mixins.colCenter }, props.style]}>
        {getIndicator(null)}
        <Text
          style={[
            {
              ...fonts.small,
              marginTop: 5,
              color: colors.textSecondary
            },
            props.textStyle
          ]}
        >
          {props.text}
        </Text>
      </View>
    )
  }

  return getIndicator(props.style)
})
