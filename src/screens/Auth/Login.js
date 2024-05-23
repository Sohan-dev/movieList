/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Image,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Keyboard,
  Platform,
  Text,
} from 'react-native';
import {COLORS} from '../../themes/Themes';
import MyStatusBar from '../../utils/helpers/MyStatusBar';
import normalize from '../../utils/helpers/normalize';
import TextInputItem from '../../components/TextInputItem';
import Button from '../../components/Button';
import Loader from '../../utils/helpers/Loader';
import {useDispatch, useSelector} from 'react-redux';
import Toast from '../../utils/helpers/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import constants from '../../utils/helpers/constants';
import {loginRequest} from '../../redux/reducer/AuthReducer';
import BiometricAuth from '../../utils/helpers/Biometric';

// import {generateDeviceToken} from '../../utils/helpers/FirebaseToken';
export default function Login(props) {
  const {loading} = useSelector(state => state.AuthReducer);
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const emailCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const getValidateUser = async () => {
    if (username.length === 0) {
      Toast('Please Enter Your email address');
      return;
    } else if (!emailCheck.test(username)) {
      Toast('Please Enter Valid email');
      return;
    } else if (password.length === 0) {
      Toast('Phone enter your password');
    } else {
      let body = {
        username: username,
        password: password,
      };
      try {
        const value = await AsyncStorage.getItem(constants.CREDS);
        if (value !== null) {
          let userData = JSON.parse(value);
          if (
            userData.username === username &&
            userData.password === password
          ) {
            dispatch(loginRequest(body));
            Toast('Login Successful');
          } else {
            Toast('Error');
          }
        }
      } catch (error) {
        // Error retrieving data
        console.log(error);
      }
      Keyboard.dismiss();
    }
  };

  const loginWithBioMetric = () => {
    let body = {
      username: '',
      password: '',
    };
    dispatch(loginRequest(body));
  };

  return (
    <>
      <MyStatusBar barStyle={'dark-content'} backgroundColor={COLORS.white} />
      <Loader visible={loading} />
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
          justifyContent: 'center',
        }}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <View style={styles.container}>
          <TextInputItem
            backgroundColor={COLORS.white}
            borderWidth={normalize(1)}
            borderColor={COLORS.borderColor}
            placeholder={'Username'}
            textInputLeft={normalize(10)}
            borderRadius={normalize(12)}
            keyboardType={'email-address'}
            value={username}
            textColor={COLORS.black}
            onChangeText={text => setUsername(text)}
            placeholderTextColor={COLORS.placeholderColor}
          />
          <TextInputItem
            backgroundColor={COLORS.white}
            borderWidth={normalize(1)}
            borderColor={COLORS.borderColor}
            placeholder={'Password'}
            textInputLeft={normalize(10)}
            borderRadius={normalize(12)}
            value={password}
            isSecure={true}
            eye={true}
            textColor={COLORS.black}
            onChangeText={text => setPassword(text)}
            placeholderTextColor={COLORS.placeholderColor}
          />

          <Button
            title={'LOGIN'}
            backgroundColor={COLORS.amber}
            marginTop={normalize(20)}
            width={'100%'}
            borderRadius={normalize(10)}
            onPress={() => {
              getValidateUser();
            }}
          />
          <Text style={{alignSelf: 'center', marginTop: normalize(50)}}>
            Or
          </Text>
          <View style={{marginTop: normalize(10)}}>
            <BiometricAuth onSuccess={data => loginWithBioMetric()} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
  },
});
