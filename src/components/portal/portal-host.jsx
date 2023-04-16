import {
  DeviceEventEmitter,
  EventSubscription,
  NativeEventEmitter,
  StyleSheet,
  View,
} from 'react-native'

import PortalManager from './portal-manager'
import React from 'react'

export const PortalContext = React.createContext(null)
// events
const addType = 'UI_ADD_PORTAL'
const removeType = 'UI_REMOVE_PORTAL'
// fix react native web does not support DeviceEventEmitter
const TopViewEventEmitter = DeviceEventEmitter || new NativeEventEmitter()

class PortalGuard {
  nextKey = 10000
  add = (e) => {
    const key = this.nextKey++
    TopViewEventEmitter.emit(addType, e, key)
    return key
  }
  remove = (key) => TopViewEventEmitter.emit(removeType, key)
}
/**
 * portal
 */
export const portal = new PortalGuard()
/**
 * Portal host renders all of its children `Portal` elements.
 * For example, you can wrap a screen in `Portal.Host` to render items above the screen.
 * If you're using the `Provider` component, it already includes `Portal.Host`.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Text } from 'react-native';
 * import { Portal } from '@app/components/portal';
 *
 * export default class MyComponent extends React.Component {
 *   render() {
 *     return (
 *       <Portal.Host>
 *         <Text>Content of the app</Text>
 *       </Portal.Host>
 *     );
 *   }
 * }
 * ```
 *
 * Here any `Portal` elements under `<App />` are rendered alongside `<App />` and will appear above `<App />` like a `Modal`.
 */
export default class PortalHost extends React.Component {
  static displayName = 'Portal.Host'

  _nextKey = 0
  _queue = []
  _manager
  _addType
  _removeType

  componentDidMount() {
    const manager = this._manager
    const queue = this._queue

    this._addType = TopViewEventEmitter.addListener(addType, this._mount)
    this._removeType = TopViewEventEmitter.addListener(
      removeType,
      this._unmount,
    )

    while (queue.length && manager) {
      const action = queue.pop()
      if (!action) {
        continue
      }
      // tslint:disable-next-line:switch-default
      switch (action.type) {
        case 'mount':
          manager.mount(action.key, action.children)
          break
        case 'update':
          manager.update(action.key, action.children)
          break
        case 'unmount':
          manager.unmount(action.key)
          break
      }
    }
  }
  componentWillUnmount() {
    this._addType.remove()
    this._removeType.remove()
  }
  _setManager = (manager) => {
    this._manager = manager
  }

  _mount = (children, _key) => {
    const key = _key || this._nextKey++
    if (this._manager) {
      this._manager.mount(key, children)
    } else {
      this._queue.push({ type: 'mount', key, children })
    }

    return key
  }

  _update = (key, children) => {
    if (this._manager) {
      this._manager.update(key, children)
    } else {
      const op = { type: 'mount', key, children }
      const index = this._queue.findIndex(
        (o) => o.type === 'mount' || (o.type === 'update' && o.key === key),
      )

      if (index > -1) {
        this._queue[index] = op
      } else {
        this._queue.push(op)
      }
    }
  }

  _unmount = (key) => {
    if (this._manager) {
      this._manager.unmount(key)
    } else {
      this._queue.push({ type: 'unmount', key })
    }
  }

  render() {
    return (
      <PortalContext.Provider
        value={{
          mount: this._mount,
          update: this._update,
          unmount: this._unmount,
        }}>
        {/* Need collapsable=false here to clip the elevations, otherwise they appear above Portal components */}
        <View style={styles.container} collapsable={false}>
          {this.props.children}
        </View>
        <PortalManager ref={this._setManager} />
      </PortalContext.Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})