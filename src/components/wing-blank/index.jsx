import { StyleProp, View, ViewStyle } from 'react-native'

import React from 'react'
import { WithTheme } from '../style'

class WingBlank extends React.Component {
  static defaultProps = {
    size: 'lg',
  }

  render() {
    const { size, style, children } = this.props
    return (
      <WithTheme>
        {(_, theme) => {
          const margin = theme[`h_spacing_${size}`]
          return (
            <View style={[{ marginLeft: margin, marginRight: margin }, style]}>
              {children}
            </View>
          )
        }}
      </WithTheme>
    )
  }
}

export default WingBlank