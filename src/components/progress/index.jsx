import {
  Animated,
  Dimensions,
  LayoutChangeEvent,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import ProgressStyles, { ProgressStyle } from './style/index';
import { WithTheme, WithThemeStyles } from '../style';

import React from 'react';

export default class Progress extends React.Component {
  static defaultProps = {
    percent: 0,
    position: 'normal',
    unfilled: true,
    appearTransition: false,
  }

  constructor(props) {
    super(props)
    this.state = {
      wrapWidth: props.wrapWidth || Dimensions.get('window').width,
      percentage: new Animated.Value(0),
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.wrapWidth !== this.props.wrapWidth) {
      this.setState({ wrapWidth: nextProps.wrapWidth })
    }
    if (
      this.props.appearTransition &&
      nextProps.percent !== this.props.percent
    ) {
      this.setState({
        percentage: new Animated.Value(this.getWidth(nextProps.percent)),
      })
    }
  }

  componentDidMount() {
    if (this.props.appearTransition) {
      this.state.percentage.setValue(0)
      Animated.timing(this.state.percentage, {
        toValue: this.getWidth(),
        duration: 1000,
        useNativeDriver: true,
      }).start()
    }
  }

  onLayout = (e) => {
    this.setState({
      wrapWidth: e.nativeEvent.layout.width,
    })
  }

  normalPercent = (percent) => {
    let widthPercent = 0
    if (percent !== undefined && percent > 0) {
      widthPercent = percent > 100 ? 100 : percent
    }
    return widthPercent
  }

  getWidth = (percent = this.props.percent) => {
    return this.state.wrapWidth * (this.normalPercent(percent) / 100)
  }

  render() {
    const { position, unfilled, style, barStyle } = this.props

    const percentStyle = {
      width: this.getWidth(),
      height: 0,
    }

    return (
      <WithTheme styles={this.props.styles} themeStyles={ProgressStyles}>
        {(styles) => {
          let child = (
            <View style={[styles.progressBar, percentStyle, barStyle]} />
          )
          if (this.props.appearTransition) {
            percentStyle.width = this.state.percentage
            child = (
              <Animated.View
                style={[styles.progressBar, percentStyle, barStyle]}
              />
            )
          }

          const outerStyle = [
            styles.progressOuter,
            position === 'fixed' ? { position: 'absolute', top: 0 } : {},
            !unfilled ? { backgroundColor: 'transparent' } : {},
            style,
          ]

          return (
            <View onLayout={this.onLayout} style={outerStyle}>
              {child}
            </View>
          )
        }}
      </WithTheme>
    )
  }
}