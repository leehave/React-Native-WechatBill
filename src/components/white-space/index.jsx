import { StyleProp, View, ViewStyle } from 'react-native'

import React from 'react'
import { WithTheme } from '../style'

class WhiteSpace extends React.Component {
  static defaultProps = {
    size: 'md',
  }

  render() {
    const { size, style } = this.props
    return (
      <WithTheme>
        {(_, theme) => (
          <View style={[{ height: theme[`v_spacing_${size}`] }, style]} />
        )}
      </WithTheme>
    )
  }
}

export default WhiteSpace