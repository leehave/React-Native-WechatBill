import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { Theme } from '../../style'

export default (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      borderBottomWidth: 1,
      borderBottomColor: theme.keyboard_line_color,
      borderRightWidth: 1,
      borderRightColor: theme.keyboard_line_color
    },
    view: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    name: {
      fontSize: theme.font_size_caption,
      fontWeight: '400',
      color: theme.color_text_caption
    },
    keyboardWrapper: {
      display: 'flex',
      flex: 1,
      flexDirection: 'row'
    },
    boardLeft: {
      flex: 2
    },
    boardRight: {
      flex: 1
    }
  })