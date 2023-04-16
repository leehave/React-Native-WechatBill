import { PortalMethods } from './portal-host'
import React from 'react'

export default class PortalConsumer extends React.Component {
  _key
  componentDidMount() {
    if (!this.props.manager) {
      throw new Error(
        'Looks like you forgot to wrap your root component with `Provider` component from .\n\n',
      )
    }

    this._key = this.props.manager.mount(this.props.children)
  }

  componentDidUpdate() {
    this.props.manager.update(this._key, this.props.children)
  }

  componentWillUnmount() {
    this.props.manager.unmount(this._key)
  }

  render() {
    return null
  }
}