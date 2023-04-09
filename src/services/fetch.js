/**
 * Fetch service
 * @file 数据请求器
 * @module app/services/fetch
 */

import { IRequestParams, THttpSuccessResponse, TRequestData, TRequestUrlPath } from '@app/types/http'

import { LANGUAGE_KEYS } from '@app/constants/language'
import { appApi } from '@app/config'
import i18n from '@app/services/i18n'
import queryString from 'query-string'
import { showToast } from './toast'

// 构造参数
export const formatURL = (url, params) => {
  let query = ''
  if (params && Object.keys(params).length) {
    query = url.includes('?')
      ? `&${queryString.stringify(params)}`
      : `?${queryString.stringify(params)}`
  }
  return `${url}${query}`
}

// 请求服务
export const httpService = (url, options) => {
  const defaultOptions = {
    includeCredentials: true,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  return fetch(appApi + url, Object.assign(defaultOptions, options))
    .then(response => response.json())
    .catch(error => {
      const text = i18n.t(LANGUAGE_KEYS.NETWORK_ERROR)
      showToast(text)
      console.warn(`${text}：`, `url：${url}`, error)
    })
}

export const get = (url, getParams) => {
  return httpService<T>(formatURL(url, getParams), { method: 'GET' })
}

export const post = (url, data) => {
  return httpService(url, { method: 'POST', body: JSON.stringify(data) })
}

export const put = (url, data) => {
  return httpService(url, { method: 'PUT', body: JSON.stringify(data) })
}

export const patch = (url, data) => {
  return httpService(url, { method: 'PATCH', body: JSON.stringify(data) })
}

export const remove = (url, data) => {
  return httpService(url, { method: 'DELETE', body: JSON.stringify(data) })
}

export default {
  get,
  post,
  put,
  patch,
  remove
}
