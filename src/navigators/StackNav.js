import React from 'react';
import Splash from '../screens/Auth/Splash';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationRef} from '../utils/helpers/RootNaivgation';
import Login from '../screens/Auth/Login';
import {useSelector} from 'react-redux';
import MovieList from '../screens/Home/MovieList';
import {COLORS} from '../themes/Themes';
import DashBoard from '../screens/Home/DashBoard';

import DescriptionText from '../screens/Home/DescriptionText';

const Stack = createStackNavigator();

export default function StackNav() {
  const horizontalAnimation = {
    gestureDirection: 'horizontal',
    detachPreviousScreen: false,
    cardStyleInterpolator: ({current, layouts}) => {
      return {
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 0],
              }),
            },
          ],
        },
      };
    },
  };
  const AuthReducer = useSelector(state => state.AuthReducer);
  const Screens =
    AuthReducer?.token == null
      ? {
          Login: Login,
        }
      : {
          DashBoard: DashBoard,
          MovieList: MovieList,
          DescriptionText: DescriptionText,
        };

  if (AuthReducer?.isLoading) {
    return <Splash />;
  } else {
    return (
      <NavigationContainer
        ref={navigationRef}
        theme={{colors: {background: COLORS.dark_grey}}}>
        <Stack.Navigator screenOptions={horizontalAnimation}>
          {Object.entries({
            ...Screens,
          }).map(([name, component]) => {
            return (
              <Stack.Screen
                options={{headerShown: false, gestureEnabled: false}}
                name={name}
                component={component}
              />
            );
          })}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
