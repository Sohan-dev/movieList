/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import PropTypes from 'prop-types';
import normalize from './normalize';
import {ICONS} from '../../themes/Themes';

const rnBiometrics = new ReactNativeBiometrics({allowDeviceCredentials: true});

export default function BiometricAuth(props) {
  function onSuccess(data) {
    if (props.onSuccess) {
      props.onSuccess(data);
    }
  }
  const handleAuthenticate = async () => {
    try {
      const {available, biometryType} = await rnBiometrics.isSensorAvailable();
      if (biometryType === BiometryTypes.TouchID) {
        //do something fingerprint specific
        console.log('Biometric authentication is TouchID');
      }

      if (available) {
        const result = await rnBiometrics.simplePrompt({
          promptMessage: 'Authenticate with Biometrics',
        });

        if (result.success) {
          // Biometric authentication successful
          console.log('Biometric authentication successful');
          onSuccess(result);
        } else {
          // Biometric authentication failed
        }
      } else {
        // Biometric authentication not available
        // fallback to username/password login
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View
      style={{
        marginTop: normalize(20),
        height: normalize(100),
      }}>
      <Text style={{alignSelf: 'center'}}>Authenticate with Fingerprint</Text>
      <TouchableOpacity onPress={() => handleAuthenticate()}>
        <Image
          source={ICONS.fingerPrint}
          style={{
            height: normalize(50),
            width: normalize(50),
            alignSelf: 'center',
            marginTop: normalize(15),
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

BiometricAuth.propTypes = {
  onSuccess: PropTypes.func,
};

BiometricAuth.defaultProps = {
  onSuccess: null,
};
