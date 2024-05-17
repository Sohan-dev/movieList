import {PixelRatio, Dimensions} from 'react-native';

const scale = Dimensions.get('window').width / 320; // Dividing by 320 provides a relative scale based on the assumption that a baseline design is made for a device with a width of 320 pixels

const normalize = size => {
  const newSize = size * scale;

  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export default normalize;
