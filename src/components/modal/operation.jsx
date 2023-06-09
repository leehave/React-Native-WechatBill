import { CallbackOnBackHandler } from './props-type'
import OperationContainer from './operation-container'
import Portal from '../portal'
import React from 'react'

export default function a(
  actions,
  onBackHandler,
) {
  const key = Portal.add(
    <OperationContainer
      actions={actions.length > 0 ? actions : [{ text: '确定' }]}
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