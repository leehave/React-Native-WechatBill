import { StyleSheet, View } from 'react-native'

import React from 'react'

/**
 * Portal host is the component which actually renders all Portals.
 */
export default class PortalManager extends React.PureComponent {
  state = {
    portals: [],
  }
  mount = (key, children) => {
    this.setState((state) => ({
      portals: [...state.portals, { key, children }],
    }))
  }
  update = (key, children) =>
    this.setState((state) => ({
      portals: state.portals.map((item) => {
        if (item.key === key) {
          return { ...item, children }
        }
        return item
      }),
    }))
  unmount = (key) =>
    this.setState((state) => ({
      portals: state.portals.filter((item) => item.key !== key),
    }))
  render() {
    return this.state.portals.map(({ key, children }, i) => (
      <View
        key={key}
        collapsable={
          false /* Need collapsable=false here to clip the elevations, otherwise they appear above sibling components */
        }
        pointerEvents="box-none"
        style={[StyleSheet.absoluteFill, { zIndex: 1000 + i }]}>
        {children}
      </View>
    ))
  }
}