/**
 * Toast service
 * @file 吐司服务
 * @module app/services/toast
 */

import Toast, { ToastOptions } from 'react-native-root-toast'

import fonts from '@app/style/fonts'

export const showToast = (message: string, options?: ToastOptions): void => {
  Toast.show(
    message,
    Object.assign({
      delay: 0,
      duration: 300,
      position: -70,
      shadow: false,
      animation: true,
      hideOnPress: true,
      textStyle: {
        fontSize: fonts.base.fontSize
      }
    }, options)
  )
}

export default showToast
