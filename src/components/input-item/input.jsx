import { TextInput, TextInputProperties } from 'react-native'

import React from 'react'

class Input extends React.Component {
  inputRef

  constructor(props) {
    super(props)

    // todos: remove focused in next major version.
    this.state = {
      focused: props.focused || false,
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.focused !== this.state.focused) {
      this.setState({
        focused: nextProps.focused,
      })
    }
  }

  componentDidMount() {
    if (this.inputRef && (this.props.autoFocus || this.props.focused)) {
      this.inputRef.focus()
    }
  }

  componentDidUpdate() {
    if (this.inputRef && this.props.focused) {
      this.inputRef.focus()
    }
  }

  focus = () => {
    if (this.inputRef) {
      this.inputRef.focus()
    }
  }

  clear = () => {
    if (this.inputRef) {
      this.inputRef.clear()
    }
  }

  render() {
    return (
      <TextInput
        ref={(el) => ((this.inputRef) = el)}
        underlineColorAndroid="transparent"
        {...this.props}
      />
    )
  }
}

export default Input