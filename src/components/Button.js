/* eslint-disable react-native/no-inline-styles */
import React, {memo} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, FONTS, ICONS} from '../themes/Themes';
import PropTypes from 'prop-types';
import normalize from '../utils/helpers/normalize';

const Button = props => {
  function onPress() {
    if (props.onPress) {
      props.onPress();
    }
  }

  return (
    <TouchableOpacity
      disabled={props.disabled}
      activeOpacity={props.activeOpacity}
      style={{
        height: props.height,
        width: props.width,
        borderRadius: props.borderRadius,
        backgroundColor: props.backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: props.marginTop,
        marginBottom: props.marginBottom,
        marginHorizontal: props.marginHorizontal,
        marginLeft: props.marginLeft,
        marginRight: props.marginRight,
        borderColor: props.borderColor,
        borderWidth: props.borderWidth,
        shadowRadius: 6,
        shadowOffset: {height: 3, width: 3},
        shadowOpacity: 0.65,
        shadowColor: '#00000033',
        elevation: 0.2,
        flexDirection: 'row',
        alignSelf: props.alignSelf,
      }}
      onPress={() => {
        onPress();
      }}>
      {props.lefticonVisible && (
        <Image
          source={props.lefticon}
          resizeMode="contain"
          style={{
            height: normalize(18),
            width: normalize(18),
            marginRight: normalize(10),
            tintColor: COLORS.white,
          }}
        />
      )}
      <Text
        style={{
          fontFamily: props.fontFamily,
          color: props.textColor,
          fontSize: props.fontSize,
          marginTop: 0,
          textAlign: props.textAlign,
          letterSpacing: props.letterSpacing,
          opacity: props.textOpacity,
        }}>
        {props.title}
      </Text>
      {props.iconVisible && (
        <Image
          source={ICONS.right}
          resizeMode="contain"
          style={{
            height: normalize(18),
            width: normalize(18),
            marginLeft: normalize(10),
            tintColor: COLORS.white,
          }}
        />
      )}
    </TouchableOpacity>
  );
};

export default memo(Button);

Button.propTypes = {
  height: PropTypes.number,
  width: PropTypes.any,
  backgroundColor: PropTypes.string,
  borderRadius: PropTypes.number,
  textColor: PropTypes.string,
  fontSize: PropTypes.number,
  title: PropTypes.string,
  onPress: PropTypes.func,
  alignSelf: PropTypes.string,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  marginHorizontal: PropTypes.number,
  textMarginTop: PropTypes.number,
  fontWeight: PropTypes.string,
  borderColor: PropTypes.string,
  borderWidth: PropTypes.number,
  textAlign: PropTypes.string,
  fontFamily: PropTypes.string,
  marginLeft: PropTypes.any,
  marginRight: PropTypes.any,
  activeOpacity: PropTypes.number,
  letterSpacing: PropTypes.number,
  textOpacity: PropTypes.number,
  iconVisible: PropTypes.bool,
  disabled: PropTypes.bool,
  lefticonVisible: PropTypes.bool,
  lefticon: PropTypes.string,
};

Button.defaultProps = {
  height: normalize(42),
  width: '85%',
  backgroundColor: COLORS.lightGreen,
  borderRadius: normalize(6),
  textColor: COLORS.white,
  fontSize: normalize(13),
  title: '',
  onPress: null,
  alignSelf: 'center',
  marginTop: 0,
  marginBottom: 0,
  marginHorizontal: 0,
  fontWeight: '400',
  borderColor: COLORS.lightGreen,
  borderWidth: 0,
  textAlign: 'center',
  fontFamily: FONTS.Inter_Medium,
  marginLeft: 0,
  marginRight: 0,
  activeOpacity: 0.5,
  letterSpacing: 0,
  textOpacity: 1,
  iconVisible: false,
  disabled: false,
  lefticonVisible: false,
  lefticon: '',
};
