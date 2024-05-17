/* eslint-disable react-native/no-inline-styles */
import React, {memo} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, FONTS, ICONS} from '../themes/Themes';
import PropTypes from 'prop-types';
import normalize from '../utils/helpers/normalize';
import {goBack} from '../utils/helpers/RootNaivgation';
const Header = props => {
  function onPressBack() {
    if (props.onPressBack) {
      goBack();
    }
  }

  function onPressRight() {
    if (props.onPressRight) {
      props.onPressRight();
    }
  }
  return (
    <View
      style={{
        height: normalize(40),
        alignItems: 'center',
        flexDirection: 'row',
        width: props.width,
        paddingLeft: props.paddingLeft,
        marginTop: props.marginTop,
        backgroundColor: props.backgroundColor,
        justifyContent: props.rightVisible ? 'space-between' : 'flex-start',
        elevation: 2,
        shadowColor: COLORS.grey,
        shadowOffset: {width: 1, height: 2.4},
        shadowOpacity: 0.8,
        shadowRadius: 2,
      }}>
      {props.backVisible && (
        <TouchableOpacity
          style={{
            width: normalize(35),
            paddingVertical: normalize(10),
          }}
          onPress={() => onPressBack()}>
          <Image
            source={ICONS.back}
            style={{
              height: normalize(16),
              width: normalize(16),
              resizeMode: 'contain',
              marginRight: normalize(5),
            }}
          />
        </TouchableOpacity>
      )}
      <Text
        style={{
          fontFamily: props.fontFamily,
          color: props.titleColor,
          textTransform: props.textTransform,
          fontSize: normalize(14),
        }}>
        {props.title}
      </Text>
      {props.rightVisible && (
        <TouchableOpacity style={{}} onPress={() => onPressRight()}>
          {props?.rigthImageUri ? (
            <Image
              source={props.rigthImageUri}
              style={{
                height: normalize(20),
                width: normalize(20),
                resizeMode: 'contain',
                paddingRight: normalize(50),
              }}
            />
          ) : (
            <Text
              style={{
                fontFamily: FONTS.Inter_Medium,
                fontSize: normalize(14),
                color: COLORS.white,
                paddingRight: normalize(20),
              }}>
              {props.rigthText}
            </Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default memo(Header);

Header.propTypes = {
  title: PropTypes.string,
  backVisible: PropTypes.bool,
  marginTop: PropTypes.number,
  width: PropTypes.number,
  borderTopWidth: PropTypes.number,
  borderBottomWidth: PropTypes.number,
  fontFamily: PropTypes.any,
  isBackPress: PropTypes.bool,
  goBacked: PropTypes.func,
  rightVisible: PropTypes.bool,
  onPressBack: PropTypes.func,
  rigthImageUri: PropTypes.string,
  rightIconTintColor: PropTypes.string,
  textTransform: PropTypes.string,
  rigthText: PropTypes.string,
  paddingLeft: PropTypes.number,
  backIconTintColor: PropTypes.string,
  titleColor: PropTypes.string,
  backgroundColor: PropTypes.string,
};
Header.defaultProps = {
  title: '',
  backVisible: false,
  marginTop: normalize(0),
  width: '100%',
  borderTopWidth: normalize(0.5),
  borderBottomWidth: normalize(0.5),
  fontFamily: FONTS.Inter_SemiBold,
  isBackPress: false,
  rightVisible: false,
  rigthImageUri: '',
  rightIconTintColor: COLORS.lightGreen,
  textTransform: 'capitalize',
  rigthText: '',
  paddingLeft: normalize(15),
  onPressBack: () => {},
  goBacked: () => {},
  onPressRight: () => {},
  backIconTintColor: COLORS.white,
  titleColor: COLORS.white,
  backgroundColor: COLORS.white,
};
