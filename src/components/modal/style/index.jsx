import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

export default (theme) =>
  StyleSheet.create({
    container: {
      zIndex: theme.modal_zindex,
    },
    wrap: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
    },
    popupContainer: {},
    popupSlideUp: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
    },
    popupSlideDown: {},
    innerContainer: {
      borderRadius: theme.radius_md,
      width: 286,
      paddingTop: theme.v_spacing_xl,
      overflow: 'hidden',
      backgroundColor: theme.fill_base,
    },
    footer: {},
    header: {
      fontSize: theme.modal_font_size_heading,
      color: theme.color_text_base,
      textAlign: 'center',
      paddingHorizontal: theme.h_spacing_lg,
    },
    body: {
      paddingTop: 0,
      paddingBottom: theme.v_spacing_lg,
      paddingHorizontal: theme.h_spacing_lg,
    },
    maskClosable: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'transparent',
    },
    closeWrap: {
      position: 'absolute',
      top: theme.v_spacing_xl,
      left: theme.h_spacing_lg,
    },
    close: {
      fontSize: 40,
      fontWeight: '200',
      color: '#bcbcbc',
      lineHeight: 30,
    },
    buttonGroupH: {
      flexGrow: 1,
      flexDirection: 'row',
    },
    buttonGroupV: {
      flexGrow: 1,
      flexDirection: 'column',
    },
    buttonWrapH: {
      height: theme.modal_button_height,
      flexGrow: 1,
      justifyContent: 'center',
      borderColor: theme.border_color_base,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderRightWidth: StyleSheet.hairlineWidth,
      paddingVertical: 11,
    },
    buttonWrapV: {
      flexGrow: 1,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderColor: theme.border_color_base,
      paddingVertical: 11,
    },
    buttonText: {
      textAlign: 'center',
      color: theme.color_link,
      fontSize: theme.modal_button_font_size,
      backgroundColor: 'transparent',
    },
    operationContainer: {
      paddingTop: 0,
    },
    operationBody: {
      paddingBottom: 0,
      paddingHorizontal: 0,
    },
    buttonTextOperation: {
      color: theme.color_text_base,
      textAlign: 'left',
      paddingHorizontal: 15,
    },
  })