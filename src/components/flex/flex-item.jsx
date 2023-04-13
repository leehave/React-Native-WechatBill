import {
  StyleProp,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native'

import React from 'react'

export default class FlexItem extends React.Component {
  static defaultProps = {
    flex: 1,
  }
  render() {
    const { style, children, flex, ...restProps } = this.props
    const flexItemStyle = {
      flex: flex ?? 1,
    }
    // support other touchablewithoutfeedback props
    const inner = (
      <View style={[flexItemStyle, style]} {...restProps}>
        {children}
      </View>
    )

    const shouldWrapInTouchableComponent =
      restProps.onPress ||
      restProps.onLongPress ||
      restProps.onPressIn ||
      restProps.onPressOut

    if (shouldWrapInTouchableComponent) {
      return (
        <TouchableWithoutFeedback {...restProps}>
          {inner}
        </TouchableWithoutFeedback>
      )
    } else {
      return inner
    }
  }
}