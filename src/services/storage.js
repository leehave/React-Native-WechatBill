/**
 * Storage service
 * @file 本地存储服务
 * @module app/services/storage
 */

import AsyncStorage from '@react-native-community/async-storage'
import { STORAGE } from '@app/constants/storage'

export const get = (key) => {
  return AsyncStorage.getItem(key).then(data => {
    return data ? JSON.parse(data) : data
  })
}

export const set = (key, value)=> {
  return AsyncStorage.setItem(key, JSON.stringify(value))
}

export const remove = (key)=> {
  return AsyncStorage.removeItem(key)
}

export const clear = ()=> {
  return AsyncStorage.clear()
}

export default {
  get,
  set,
  remove,
  clear
}
