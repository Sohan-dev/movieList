/* eslint-disable react-native/no-inline-styles */
import React, {memo, useState} from 'react';
import {View, TextInput, Image, TouchableOpacity} from 'react-native';
import normalize from '../utils/helpers/normalize';
import PropTypes from 'prop-types';
import {COLORS, ICONS} from '../themes/Themes';

const TextInputItem = props => {
  const [visible, setVisible] = useState(false);
  function onChangeText(text) {
    if (props.onChangeText) {
      props.onChangeText(text);
    }
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        width: props.width,
        alignItems: 'center',
        alignSelf: 'center',
        height: props.height,
        borderWidth: props.borderWidth,
        borderColor: props.borderColor,
        borderRadius: props.borderRadius,
        marginTop: props.marginTop,
        marginBottom: props.marginBottom,
        backgroundColor: props.backgroundColor,
        opacity: props.opacity,
      }}>
      <TextInput
        style={[
          {
            flex: 1,
            paddingLeft: props.textInputLeft,
            textAlign: props.textAlign,
            letterSpacing: props.letterSpacing,
            color: props.textColor,

            fontSize: props.fontSize,
          },
        ]}
        maxLength={props.maxLength}
        multiline={props.multiline}
        autoCapitalize={props.autoCapitalize}
        placeholder={props.placeholder}
        editable={props.editable}
        spellCheck={false}
        secureTextEntry={visible ? false : true}
        placeholderTextColor={props.placeholderTextColor}
        keyboardType={props.keyboardType}
        autoFocus={props.autoFocus}
        value={props.value}
        fontWeight={props.fontWeight}
        onChangeText={text => {
          onChangeText(text);
        }}
        returnKeyType={props.returnKeyType}
      />
      {props.eye === true ? (
        <TouchableOpacity
          onPress={() => setVisible(!visible)}
          style={{
            alignSelf: 'center',
            marginRight: 10,
          }}>
          {visible ? (
            <Image
              source={ICONS.eye_open}
              style={{
                height: normalize(20),
                width: normalize(20),
              }}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={ICONS.eye_close}
              style={{
                height: normalize(18),
                width: normalize(18),
              }}
              resizeMode="contain"
            />
          )}
        </TouchableOpacity>
      ) : null}
      {props.isRightIconVisible && (
        <Image
          source={props.rightIcon}
          resizeMode="contain"
          style={{
            width: normalize(15),
            height: normalize(15),
            position: 'absolute',
            right: normalize(10),
          }}
        />
      )}
    </View>
  );
};

export default memo(TextInputItem);

TextInputItem.propTypes = {
  marginLeft: PropTypes.number,
  marginTop: PropTypes.number,
  maxLength: PropTypes.number,
  isSecure: PropTypes.bool,
  multiline: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  keyboardType: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  color: PropTypes.string,
  letterSpacing: PropTypes.number,
  fontSize: PropTypes.number,
  editable: PropTypes.bool,
  borderColor: PropTypes.string,
  fontWeight: PropTypes.any,
  textAlign: PropTypes.string,
  onPress: PropTypes.func,
  search: PropTypes.bool,
  borderRadius: PropTypes.any,
  icon: PropTypes.any,
  iconleft: PropTypes.any,
  iconright: PropTypes.any,

  backgroundColor: PropTypes.any,
  width: PropTypes.any,
  height: PropTypes.any,
  marginBottom: PropTypes.number,
  borderWidth: PropTypes.number,
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
  isleftIconVisible: PropTypes.bool,
  isRightIconVisible: PropTypes.bool,
  textInputLeft: PropTypes.number,
  textColor: PropTypes.string,
  borderBottomColor: PropTypes.string,
  returnKeyType: PropTypes.string,
  autoFocus: PropTypes.bool,
  blurOnSubmit: PropTypes.bool,
  opacity: PropTypes.number,
};

TextInputItem.defaultProps = {
  marginTop: 0,
  maxLength: 150,
  isSecure: false,
  multiline: false,
  autoCapitalize: 'none',
  placeholder: '',
  placeholderTextColor: '#969AA8',
  keyboardType: 'default',
  value: '',
  onChangeText: null,
  color: COLORS.black,
  editable: true,
  borderColor: COLORS.lightGreen,
  borderWidth: 1,
  onFocus: null,
  onBlur: null,
  letterSpacing: 0,
  fontSize: normalize(12),
  textAlign: 'left',
  caretHidden: false,
  borderRadius: normalize(5),
  icon: null,
  iconleft: null,

  fontWeight: '400',
  backgroundColor: COLORS.black,
  search: false,
  width: '100%',
  height: normalize(45),
  borderRadiusRightRadius: normalize(10),
  borderBottomRadiusRightRadius: normalize(10),
  marginBottom: normalize(15),
  borderBottomWidth: 2,
  leftIcon: '',
  rightIcon: '',
  isleftIconVisible: false,
  textInputLeft: 0,
  textColor: COLORS.black,
  borderBottomColor: COLORS.placeholderColor,
  isRightIconVisible: false,
  returnKeyType: 'default',
  autoFocus: false,
  blurOnSubmit: false,
  opacity: 1,
};
