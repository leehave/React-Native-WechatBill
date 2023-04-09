import { Action, CallbackOnBackHandler } from './props-type'

import AlertContainer from './alert-container'
import Portal from '../portal'
import React from 'react'

export default function Alert(
  title: React.ReactNode,
  content: React.ReactNode,
  actions: Action[] = [{ text: '确定' }],
  onBackHandler?: CallbackOnBackHandler,
) {
  const key = Portal.add(
    <AlertContainer
      title={title}
      content={content}
      actions={actions}
      onAnimationEnd={(visible: boolean) => {
        if (!visible) {
          Portal.remove(key)
        }
      }}
      onBackHandler={onBackHandler}
    />,
  )
  return key
}