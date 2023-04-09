/**
 * App config
 * @file App 配置
 * @module app/config
 */

import { Platform } from 'react-native'
import packageJSON from '../package.json'

export const appName = 'Director'
export const email = '1831553725@qq.com'
export const webUrl = 'https://blog.felzx.cn'
export const appApi = 'https://api.felzx.cn'
export const staticApi = 'https://static.felzx.cn'
export const gravatarApi = 'https://static.felzx.cn/avatar'
export const GitHubUrl = 'https://github.com/leehave'
export const version = packageJSON.version
export const dependencies = packageJSON.dependencies

export const IS_DEV = __DEV__
export const IS_IOS = Object.is(Platform.OS, 'ios')
export const IS_ANDROID = !IS_IOS
