import { Dimensions, Platform, StatusBar } from 'react-native';

import {Px2Dp} from './tool';
const { width, height } = Dimensions.get('window');
const OS = Platform.OS;
const ios = OS == 'ios';
const android = OS == 'android';
const isIPhoneX = ios && height == 812 && width == 375;
const statusBarHeight = ios ? (isIPhoneX ? 44 : 20) : StatusBar.currentHeight ?? 0;
const navigationHeight = statusBarHeight + 44;
const safeAreaBottomHeight = ios ? (isIPhoneX ? 34 : 0) : 0;
const statusTabBarHeight = safeAreaBottomHeight + 49;
const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;
const STATUS_BAR_HEIGHT = statusBarHeight;
const NAVIGATION_HEIGHT = navigationHeight;
const SAFE_AREA_BOTTOM_HEIGHT = safeAreaBottomHeight;
const STATUS_TABBAR_HEIGHT = statusTabBarHeight;
const countcoordinatesX = Px2Dp;
export {
  isIPhoneX,
  statusBarHeight,
  safeAreaBottomHeight,
  statusTabBarHeight,
  navigationHeight,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  STATUS_BAR_HEIGHT,
  NAVIGATION_HEIGHT,
  SAFE_AREA_BOTTOM_HEIGHT,
  STATUS_TABBAR_HEIGHT,
  countcoordinatesX,
};