/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {Text, TextInput} from 'react-native';
import StackNav from './src/navigators/StackNav';
import {useDispatch} from 'react-redux';
import {tokenRequest} from './src/redux/reducer/AuthReducer';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(tokenRequest());
    }, 1500);
  }, []);

  if (Text.defaultProps == null) {
    Text.defaultProps = {};
  }
  if (TextInput.defaultProps == null) {
    TextInput.defaultProps = {};
  }
  Text.defaultProps.allowFontScaling = false;
  TextInput.defaultProps.allowFontScaling = false;

  return <StackNav />;
}
