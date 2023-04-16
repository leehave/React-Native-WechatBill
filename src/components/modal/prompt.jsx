import { CallbackOnBackHandler, CallbackOrActions } from './props-type'

import Portal from '../portal'
import PromptContainer from './prompt-container'
import React from 'react'
import { TextStyle } from 'react-native'

export default function prompt(
  title,
  message,
  callbackOrActions,
  type = 'default',
  defaultValue = '',
  placeholders = ['', ''],
  onBackHandler,
) {
  if (!callbackOrActions) {
    // tslint:disable-next-line:no-console
    console.error('Must specify callbackOrActions')
    return
  }

  const key = Portal.add(
    <PromptContainer
      title={title}
      message={message}
      actions={callbackOrActions}
      type={type}
      defaultValue={defaultValue}
      onAnimationEnd={(visible) => {
        if (!visible) {
          Portal.remove(key)
        }
      }}
      placeholders={placeholders}
      onBackHandler={onBackHandler}
    />,
  )
  return key
}