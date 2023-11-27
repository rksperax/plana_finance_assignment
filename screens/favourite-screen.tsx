import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import ProductSelector from '../redux/ducks/products/product-selector';
import {COLORS} from '../assets';
import scaler from '../utils/scaler';

const {width, height} = Dimensions.get('window');

const FavouriteScreen = () => {
  const favProducts = ProductSelector.favData();
  console.log('favProducts =>', favProducts);

  const renderProducts = ({item}: any) => {
    return (
      <View style={styles.productView}>
        <Image source={{uri: item?.thumbnail}} style={styles.productImg} />
        <View style={styles.nameNprice}>
          <Text numberOfLines={3} style={styles.itemTitle}>
            {item?.title ? item.title : ''}
          </Text>
          <Text style={styles.itemPrice}>
            {item?.price ? `$${item.price}` : 0}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.favProducts}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={favProducts}
          renderItem={renderProducts}
          ListEmptyComponent={
            <View style={styles.noDataFound}>
              <Text style={styles.noDataText}>{'No Data Found'}</Text>
            </View>
          }
        />
      </View>
    </View>
  );
};

export default FavouriteScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  favProducts: {
    marginTop: 20,
  },
  productView: {
    backgroundColor: COLORS.primaryGray,
    marginTop: 10,
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameNprice: {
    marginLeft: 20,
  },
  productImg: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  itemTitle: {
    maxWidth: width * 0.22,
    fontSize: scaler(12),
    fontWeight: '600',
  },
  itemPrice: {
    fontSize: scaler(10),
    color: COLORS.lightBlue,
  },
  noDataFound: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  noDataText: {
    color: COLORS.black,
    fontSize: scaler(14),
    textAlign: 'center',
    marginVertical: height * 0.4,
  },
});
