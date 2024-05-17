/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {COLORS, ICONS} from '../../themes/Themes';
import MyStatusBar from '../../utils/helpers/MyStatusBar';
import normalize from '../../utils/helpers/normalize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import constants from '../../utils/helpers/constants';
export default function Splash() {
  useEffect(() => {
    storeData();
  }, []);

  const storeData = async () => {
    let obj = {
      username: 'dummy@gmail.com',
      password: '12345678',
    };

    try {
      await AsyncStorage.setItem(constants.CREDS, JSON.stringify(obj));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <MyStatusBar barStyle={'dark-content'} backgroundColor={COLORS.white} />
      <View style={styles.container}>
        <Image
          source={ICONS.location}
          style={{
            height: normalize(100),
            width: normalize(100),
            resizeMode: 'contain',
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
