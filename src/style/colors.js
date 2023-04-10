/**
 * Style colors
 * @file Theme 主题/颜色配置
 * @module app/colors
 */

import { Appearance } from 'react-native-appearance'
import { observable } from 'mobx'

// export enum Themes {
//   Default = 'default',
//   Dark = 'Dark'
// }

// type ThemeKey =
//   | 'primary'// 主题色
//   | 'secondary' // 次要主题色

//   | 'primary' // 主题色
//   | 'secondary' // 次要主题色

//   | 'accent' // 强调色
//   | 'red' // 红色，错误色
//   | 'yellow' // 黄色，警告色
//   | 'grey' // 银灰色
//   | 'inverse' // 反色

//   | 'border' // 边框色
//   | 'background' // 全局背景色
//   | 'cardBackground' // 模块背景色

//   | 'textDefault' // 默认文本
//   | 'textSecondary' // 次要文本
//   | 'textMuted' // 禁用文本

//   | 'textTitle' // 标题文本
//   | 'textLink' // 链接文本

// type Theme = Record<ThemeKey, string>

export const Default = {
  primary: '#0d86ff',
  secondary: '#262626',
  accent: '#4caf50',
  red: '#ff5722',
  yellow: '#ffeb3b',
  grey: '#e3e3e3',
  inverse: '#333333',
  border: '#BBBBBB',
  background: '#EEEEEE',
  cardBackground: '#FFFFFF',

  textDefault: '#555',
  textSecondary: '#bbb',
  textMuted: '#eee',

  textTitle: '#222',
  textLink: '#000'
}

export const Dark = {
  primary: '#0d86ff',
  secondary: '#262626',
  accent: '#4caf50',
  red: '#ff5722',
  yellow: '#ffeb3b',
  grey: '#3e3e3e',
  inverse: '#FFFFFF',
  border: '#333333',
  background: '#000000',
  cardBackground: '#1a1a1a',

  textDefault: '#999999',
  textSecondary: '#777777',
  textMuted: '#333333',

  textTitle: '#EEEEEE',
  textLink: '#FFFFFF'
}

export const isDarkSystemTheme = Appearance.getColorScheme() === 'dark'
const colors = observable(isDarkSystemTheme ? Dark : Default)

export default colors
export const updateTheme = (darkTheme) => {
  Object.keys(Default).forEach(key => {
    const themeKty = key
    colors[themeKty] = darkTheme ? Dark[themeKty] : Default[themeKty]
  })
}
