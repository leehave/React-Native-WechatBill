import {
  NAVIGATION_HEIGHT,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '@app/utils/util';
import {StyleSheet, ViewStyle} from 'react-native';

export default (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      width: SCREEN_WIDTH,
      backgroundColor: 'rgba(250, 250, 250, 1)',
      position: 'relative',
    },
    keyboardWd: {
      width: SCREEN_WIDTH,
      height: (SCREEN_HEIGHT - NAVIGATION_HEIGHT) / 2.3,
    },
     keyboardWrapper: {
       flex: 1,
    },
    keyboardLeft: {
      flex: 3,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    boardbtnGrow: {
      backgroundColor: '#000',
      flexDirection: 'row',
    },
    view: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    keyboardText: {
      fontSize: 20,
    },
    keyboardRight: {
      flex: 1
    },
    subview: {
      flex: 1,
      alignItems: 'center'
    },
    singleBtn: {
      flex: 1,
      alignItems: 'center',
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5
    },
    boardPad: {
      padding: 5
    },
  });
