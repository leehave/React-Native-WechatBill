import {
  NAVIGATION_HEIGHT,
  SAFE_AREA_BOTTOM_HEIGHT,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STATUS_BAR_HEIGHT,
  STATUS_TABBAR_HEIGHT,
} from '@app/utils/util';
import {StyleSheet, ViewStyle} from 'react-native';

import {Theme} from '../../style';

export interface KeybodrdStyle {
  container: ViewStyle;
  view: ViewStyle;
}

export default (theme: Theme) =>
  StyleSheet.create<KeybodrdStyle>({
    container: {
      flexDirection: 'column',
      width: SCREEN_WIDTH,
      height: (SCREEN_HEIGHT - NAVIGATION_HEIGHT) / 2,
      backgroundColor: 'rgba(250, 250, 250, 1)',
      paddingBottom: SAFE_AREA_BOTTOM_HEIGHT,
    },
    view: {
      flex: 1,
      flexDirection: 'row',
    },
  });
