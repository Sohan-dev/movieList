import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import normalize from '../../utils/helpers/normalize';
import {COLORS} from '../../themes/Themes';
import Header from '../../components/Header';

export default function DescriptionText(props) {
  return (
    <View style={styles.container}>
      <Header backVisible={true} />
      <Text style={styles.descriptionText}>{props.route.params.desc}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  descriptionText: {
    width: '90%',
    alignSelf: 'center',
    marginTop: normalize(10),
    fontSize: normalize(12),
    color: COLORS.black,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
