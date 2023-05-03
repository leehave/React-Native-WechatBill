import { StyleSheet, ViewStyle } from 'react-native'
export default theme =>
  StyleSheet.create({
    progressOuter: {
      backgroundColor: theme.border_color_base,
      flex: 1,
      borderRadius: 10,
    },
    progressBar: {
      borderRadius: 10,
      borderBottomWidth: 4,
      paddingTop: 1,
      paddingBottom: 1,
      borderStyle: 'solid',
      borderColor: theme.brand_primary,
    },
  });