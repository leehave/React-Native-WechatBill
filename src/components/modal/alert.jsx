import AlertContainer from './alert-container'
import Portal from '../portal'
import React from 'react'

export default function a(
  title,
  content,
  actions = [{ text: '确定' }],
  onBackHandler,
) {
  const key = Portal.add(
    <AlertContainer
      title={title}
      content={content}
      actions={actions}
      onAnimationEnd={(visible) => {
        if (!visible) {
          Portal.remove(key)
        }
      }}
      onBackHandler={onBackHandler}
    />,
  )
  return key
}