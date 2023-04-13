import {
  NAVIGATION_HEIGHT,
  SAFE_AREA_BOTTOM_HEIGHT,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STATUS_BAR_HEIGHT,
  STATUS_TABBAR_HEIGHT,
} from '@app/utils/util';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { Theme } from '../../style'

export default (theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      width: SCREEN_WIDTH,
      height: (SCREEN_HEIGHT - NAVIGATION_HEIGHT) / 2 / 5,
      alignItems: 'center',
      paddingLeft: 30,
      backgroundColor: 'white',
      position: 'relative',
      borderBottomColor: theme.keyboard_line_color,
      borderBottomWidth: 2,
      shadowOffset: {width: 0, height: -2},
      shadowColor: theme.color_icon_base,
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    input: {
      flex: 1,
      height: 120,
      fontSize: 14,
      fontFamily: 'Helvetica Neue',
      fontWeight: '300',
      color: theme.color_text_base
    },
    name: {
      fontSize: 14,
      fontWeight: '300',
      color: theme.color_text_base,
    },
    money: {
      fontSize: 22,
      fontWeight: '400',
      color: theme.color_text_base,
      paddingLeft: 30,
      paddingRight: 30
    },
  });