import {
  Animated,
  BackHandler,
  Dimensions,
  Easing,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native'

import Portal from '../portal'
import React from 'react'

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  mask: {
    backgroundColor: 'black',
    opacity: 0.5,
  },
  content: {
    backgroundColor: 'white',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
})

const screen = Dimensions.get('window')

export default class RCModal extends React.Component {
  static defaultProps = {
    wrapStyle: styles.wrap,
    maskStyle: styles.mask,
    animationType: 'slide-up',
    animateAppear: false,
    animationDuration: 300,
    visible: false,
    maskClosable: true,
    onClose() {},
    onAnimationEnd(_visible) {},
  }

  constructor(props) {
    super(props)
    const { visible } = props
    this.state = {
      position: new Animated.Value(this.getPosition(visible)),
      scale: new Animated.Value(this.getScale(visible)),
      opacity: new Animated.Value(this.getOpacity(visible)),
      modalVisible: visible,
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.shouldComponentUpdate(nextProps, null)) {
      this.setState({
        modalVisible: true,
      })
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.visible || this.props.visible !== nextProps.visible) {
      return true
    }
    if (nextState) {
      if (nextState.modalVisible !== this.state.modalVisible) {
        return true
      }
    }
    return false
  }
  componentDidMount() {
    if (this.props.animateAppear && this.props.animationType !== 'none') {
      BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
      this.componentDidUpdate({})
    }
  }
  componentDidUpdate(prevProps) {
    const { props } = this
    if (prevProps.visible !== props.visible) {
      this.animateDialog(props.visible)
    }
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
    this.stopDialogAnim()
  }
  onBackAndroid = () => {
    const { onRequestClose } = this.props
    if (typeof onRequestClose === 'function') {
      return onRequestClose()
    }
    // the default is false for compatible the old version & not required in android
    return false
  }
  animateMask = (visible) => {
    this.stopMaskAnim()
    this.state.opacity.setValue(this.getOpacity(!visible))
    this.animMask = Animated.timing(this.state.opacity, {
      toValue: this.getOpacity(visible),
      duration: this.props.animationDuration,
      useNativeDriver: true,
    })
    this.animMask.start(() => {
      this.animMask = null
    })
  }
  stopMaskAnim = () => {
    if (this.animMask) {
      this.animMask.stop()
      this.animMask = null
    }
  }
  stopDialogAnim = () => {
    if (this.animDialog) {
      this.animDialog.stop()
      this.animDialog = null
    }
  }
  animateDialog = (visible) => {
    this.stopDialogAnim()
    this.animateMask(visible)

    let { animationType, animationDuration } = this.props
    animationDuration = animationDuration
    if (animationType !== 'none') {
      if (animationType === 'slide-up' || animationType === 'slide-down') {
        this.state.position.setValue(this.getPosition(!visible))
        this.animDialog = Animated.timing(this.state.position, {
          toValue: this.getPosition(visible),
          duration: animationDuration,
          easing: (visible ? Easing.elastic(0.8) : undefined),
          useNativeDriver: true,
        })
      } else if (animationType === 'fade') {
        this.animDialog = Animated.parallel([
          Animated.timing(this.state.opacity, {
            toValue: this.getOpacity(visible),
            duration: animationDuration,
            easing: (visible ? Easing.elastic(0.8) : undefined),
            useNativeDriver: true,
          }),
          Animated.spring(this.state.scale, {
            toValue: this.getScale(visible),
            useNativeDriver: true,
          }),
        ])
      }

      this.animDialog.start(() => {
        this.animDialog = null
        if (!visible) {
          this.setState({
            modalVisible: false,
          })
          BackHandler.removeEventListener(
            'hardwareBackPress',
            this.onBackAndroid,
          )
        }
        if (this.props.onAnimationEnd) {
          this.props.onAnimationEnd(visible)
        }
      })
    } else {
      if (!visible) {
        this.setState({
          modalVisible: false,
        })
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
      }
    }
  }
  close = () => {
    this.animateDialog(false)
  }
  onMaskClose = () => {
    if (this.props.maskClosable && this.props.onClose) {
      this.props.onClose()
      BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
    }
  }
  getPosition = (visible) => {
    if (visible) {
      return 0
    }
    return this.props.animationType === 'slide-down'
      ? -screen.height
      : screen.height
  }
  getScale = (visible) => {
    return visible ? 1 : 1.05
  }
  getOpacity = (visible) => {
    return visible ? 1 : 0
  }
  render() {
    const { props } = this
    if (!this.state.modalVisible) {
      return null
    }
    const animationStyleMap = {
      none: {},
      'slide-up': { transform: [{ translateY: this.state.position }] },
      'slide-down': { transform: [{ translateY: this.state.position }] },
      fade: {
        transform: [{ scale: this.state.scale }],
        opacity: this.state.opacity,
      },
    }

    return (
      <Portal>
        <View style={[styles.wrap, props.wrapStyle]}>
          <TouchableWithoutFeedback onPress={this.onMaskClose}>
            <Animated.View
              style={[styles.absolute, { opacity: this.state.opacity }]}>
              <View style={[styles.absolute, props.maskStyle]} />
            </Animated.View>
          </TouchableWithoutFeedback>
          <Animated.View
            style={[
              styles.content,
              props.style,
              animationStyleMap[props.animationType],
            ]}>
            {this.props.children}
          </Animated.View>
        </View>
      </Portal>
    )
  }
}