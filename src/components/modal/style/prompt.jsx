import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

export default (variables) =>
  StyleSheet.create({
    message: {
      marginTop: variables.v_spacing_lg,
      color: variables.color_text_caption,
      fontSize: variables.font_size_base,
      textAlign: 'center',
    },
    inputGroup: {
      marginTop: variables.v_spacing_md,
      flexDirection: 'column',
    },
    inputWrapper: {
      borderWidth: StyleSheet.hairlineWidth,
      borderTopWidth: 0,
      borderColor: variables.border_color_base,
    },
    input: {
      height: 36,
      fontSize: variables.font_size_base,
      paddingHorizontal: variables.h_spacing_sm,
      paddingVertical: 0,
    },
    inputFirst: {
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopLeftRadius: variables.radius_sm,
      borderTopRightRadius: variables.radius_sm,
    },
    inputLast: {
      borderBottomLeftRadius: variables.radius_sm,
      borderBottomRightRadius: variables.radius_sm,
    },
  })