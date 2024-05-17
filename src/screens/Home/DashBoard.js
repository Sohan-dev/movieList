/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import MyStatusBar from '../../utils/helpers/MyStatusBar';
import {COLORS, ICONS} from '../../themes/Themes';
import Modal from 'react-native-modal';
import normalize from '../../utils/helpers/normalize';
import {navigate} from '../../utils/helpers/RootNaivgation';
import {useDispatch} from 'react-redux';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {Platform} from 'react-native';
import {requestLocationPermission} from '../../utils/helpers/AndroidLocationPremissionRequest';
import Geolocation from 'react-native-geolocation-service';
import Button from '../../components/Button';
import {
  getMovieListRequest,
  logOutRequest,
} from '../../redux/reducer/AuthReducer';
import Header from '../../components/Header';

export default function DashBoard() {
  const [visible, setVisible] = useState(false);

  const description =
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ';

  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovieListRequest());
  }, []);

  useEffect(() => {
    reqPermission();
  }, []);

  function openBottomSheet() {
    return (
      <Modal
        isVisible={visible}
        backdropColor={COLORS.black}
        backdropOpacity={0.7}
        animationInTiming={300}
        animationOutTiming={500}
        backdropTransitionOutTiming={0}
        onBackdropPress={() => setVisible(!visible)}
        style={styles.modal}>
        <View style={styles.bottomSheet}>
          <TouchableOpacity
            onPress={() => {
              setVisible(!visible);
              navigate('DescriptionText', {desc: description});
            }}>
            <Text style={styles.descriptionText}>{description}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

  const reqPermission = async () => {
    if (Platform.OS === 'android') {
      const permission = await requestLocationPermission();
      if (permission) {
        Geolocation.getCurrentPosition(
          position => {
            setRegion({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
          },
          error => {
            console.log(error);
          },
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 3600000,
          },
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <MyStatusBar barStyle={'dark-content'} backgroundColor={COLORS.white} />
      <Header
        backVisible={false}
        rightVisible={true}
        rigthImageUri={ICONS.logout}
        onPressRight={() => dispatch(logOutRequest())}
      />
      <MapView
        style={{
          width: '100%',
          height: '82%',
        }}
        provider={PROVIDER_GOOGLE}
        region={region}
        showsUserLocation={true}
        userLocationPriority={'balanced'}
        showsMyLocationButton={true}
        userLocationUpdateInterval={1500}>
        <Marker coordinate={region} onPress={e => setVisible(!visible)} />
      </MapView>
      <Button
        title={'Movies List'}
        backgroundColor={COLORS.amber}
        marginTop={normalize(20)}
        width={'90%'}
        borderRadius={normalize(10)}
        onPress={() => {
          navigate('MovieList');
        }}
      />
      {openBottomSheet()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  bottomSheet: {
    backgroundColor: COLORS.white,
    height: '55%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: normalize(15),
    borderTopRightRadius: normalize(15),
  },
  descriptionText: {
    width: '90%',
    alignSelf: 'center',
    marginTop: normalize(10),
    fontSize: normalize(12),
    color: COLORS.black,
  },
  modal: {
    width: '100%',
    marginLeft: 0,
    marginBottom: 0,
  },
});
