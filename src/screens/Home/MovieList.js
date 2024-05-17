import {View, Text, Image, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import MyStatusBar from '../../utils/helpers/MyStatusBar';
import {COLORS} from '../../themes/Themes';
import {useSelector} from 'react-redux';
import normalize from '../../utils/helpers/normalize';
import Header from '../../components/Header';

export default function MovieList() {
  const {movieList} = useSelector(state => state.AuthReducer);
  function renderItem({item}) {
    return (
      <View style={styles.cardContainer}>
        <Image
          source={{uri: 'https://picsum.photos/536/354'}}
          style={styles.cardImage}
        />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.movie}</Text>
          <Text style={styles.cardDescription}>Rating : {item.rating} ⭐</Text>
        </View>
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <MyStatusBar barStyle={'dark-content'} backgroundColor={COLORS.white} />
        <Header backVisible={true} />
        <FlatList
          data={movieList}
          renderItem={renderItem}
          keyExtractor={(item, index) => {
            index.toString();
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  cardContainer: {
    flex: 1,
    margin: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  cardDescription: {
    marginTop: 5,
    color: COLORS.black,
  },
  backButton: {
    height: normalize(20),
    width: normalize(20),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  header: {
    width: normalize(40),
    height: normalize(40),
    marginLeft: normalize(5),
    justifyContent: 'center',
  },
});
