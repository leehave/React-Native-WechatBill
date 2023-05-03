import {Dimensions, PixelRatio, Platform} from 'react-native';
const {width} = Dimensions.get('window');
console.log(width, 'window width')
const basePx = Platform.OS === 'ios' ? 750 : 720;

export const Px2Dp = function px2dp(px) {
  const layoutSize = (px / basePx) * width;

  return PixelRatio.roundToNearestPixel(layoutSize);
};
