import * as React from 'react'

import Portal from '../portal'
import { ThemeProvider } from '../style'
export default class Provider extends React.Component {
  render() {
    return (
      <ThemeProvider value={this.props.theme}>
        <Portal.Host>{this.props.children}</Portal.Host>
      </ThemeProvider>
    )
  }
}