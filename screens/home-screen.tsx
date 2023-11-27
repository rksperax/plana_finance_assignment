import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {StackActions, useNavigation} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';

import {dispatch} from '../redux/store/store';
import ProductThunk from '../redux/ducks/products/product-thunk';
import {COLORS, IMAGES} from '../assets';
import scaler from '../utils/scaler';
import ProductSelector from '../redux/ducks/products/product-selector';
import DeviceInfo from 'react-native-device-info';

const {width, height} = Dimensions.get('window');

const HomeScreen = () => {
  const productsList = ProductSelector.productsData();
  const cartData = ProductSelector.cartData();

  useEffect(() => {
    dispatch<any>(ProductThunk.fetchAllProducts());
  }, []);

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlue} />
      <ScrollView style={{flex: 1}}>
        <TopSection cartData={cartData} />
        <BottomSection productsList={productsList} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const TopSection = ({cartData}: any) => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');

  return (
    <View style={styles.headerContainer}>
      <View style={styles.nameNcart}>
        <Text style={styles.name}>Hey, Rahul</Text>
        <TouchableOpacity
          onPress={() => navigation.dispatch(StackActions.push('Cart'))}
          hitSlop={{top: 30, left: 20, bottom: 20, right: 20}}>
          <Image source={IMAGES.cart} style={styles.cartImg} />
          {cartData?.length > 0 ? (
            <View style={styles.cartItemsView}>
              <Text style={styles.cartItems}>{cartData.length}</Text>
            </View>
          ) : null}
        </TouchableOpacity>
      </View>

      <View style={styles.searchBar}>
        <Image source={IMAGES.search} style={styles.searchIcon} />
        <TextInput
          value={searchText}
          placeholder="Search Products or store"
          placeholderTextColor={COLORS.darkGray}
          style={styles.searchInput}
          returnKeyType="done"
          onChangeText={t => {
            setSearchText(t);
          }}
        />
      </View>

      <View style={styles.addressNtime}>
        <View style={styles.address}>
          <Text style={styles.label}>Delivery To</Text>
          <View style={styles.subLabelView}>
            <Text style={styles.subLabel}>Greenway 3000, Sylhet</Text>
            <Image source={IMAGES.dropdown} style={styles.downArrow} />
          </View>
        </View>
        <View style={styles.address}>
          <Text style={styles.label}>Within</Text>
          <View style={styles.subLabelView}>
            <Text style={styles.subLabel}>1 hour</Text>
            <Image source={IMAGES.dropdown} style={styles.downArrow} />
          </View>
        </View>
      </View>
    </View>
  );
};

const BottomSection = ({productsList}: any) => {
  const navigation = useNavigation();

  const renderDiscounts = ({item}: any) => {
    console.log('item =>', item);

    return (
      <View style={styles.discountContainer}>
        <Image source={{uri: item?.thumbnail}} style={styles.productImage} />
        <View style={styles.textView}>
          <Text style={styles.discountText1}>{'Get'}</Text>
          <Text style={[styles.discountText1, styles.discountText2]}>
            {`${item?.discountPercentage}% OFF`}
          </Text>
          <Text
            style={[
              styles.discountText1,
              styles.discountText3,
            ]}>{`on ${item?.brand} brand`}</Text>
        </View>
      </View>
    );
  };

  const toggleHeart = (item: any) => {
    if (item?.favorite) {
      dispatch<any>(ProductThunk.removeFromFav(item));
    } else {
      dispatch<any>(ProductThunk.addToFav(item));
    }
  };

  const toggleAdd = (item: any) => {
    Toast.show('Product added to Cart', Toast.SHORT);
    dispatch<any>(ProductThunk.addToCart(item));
  };

  const renderProducts = ({item, index}: {item: any; index: number}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.dispatch(StackActions.push('ProductDetails', {item}))
        }>
        <View
          style={[
            styles.productItem,
            index === productsList.length - 2 ||
            index === productsList.length - 1
              ? {marginBottom: height * 0.25}
              : {},
          ]}>
          <TouchableOpacity
            onPress={() => toggleHeart(item)}
            hitSlop={{top: 30, left: 20, bottom: 20, right: 20}}>
            {item?.favorite ? (
              <Image source={IMAGES.heartRed} style={styles.heartIcon} />
            ) : (
              <Image source={IMAGES.heartWhite} style={styles.heartIcon} />
            )}
          </TouchableOpacity>
          <Image source={{uri: item?.thumbnail}} style={styles.productImg} />
          <View style={styles.productDetails}>
            <View style={styles.imgNtext}>
              <View>
                <Text style={styles.itemPrice}>
                  {item?.price ? `$${item.price}` : 0}
                </Text>
                <Text numberOfLines={3} style={styles.itemTitle}>
                  {item?.title ? item.title : ''}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => toggleAdd(item)}
                hitSlop={{top: 30, left: 20, bottom: 20, right: 20}}>
                <Image source={IMAGES.addBtn} style={styles.add} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.bottomContainer}>
      <View style={styles.discountList}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={productsList}
          renderItem={renderDiscounts}
        />
      </View>
      <View style={styles.recommendedSection}>
        <Text style={styles.recommendedText}>Recommended</Text>
        <View style={styles.products}>
          <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              marginLeft: 20,
            }}
            data={productsList}
            renderItem={renderProducts}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: COLORS.primaryBlue,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  nameNcart: {
    marginTop: DeviceInfo.hasNotch() ? 60 : 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: scaler(20),
    fontWeight: '600',
    color: COLORS.white,
  },
  cartImg: {
    width: 20,
    height: 20,
  },
  cartItemsView: {
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.yellow,
    position: 'absolute',
    left: 15,
    top: -7,
  },
  cartItems: {
    fontSize: scaler(10),
    color: COLORS.white,
  },
  searchBar: {
    borderRadius: 30,
    paddingHorizontal: 25,
    paddingVertical: 18,
    marginTop: DeviceInfo.hasNotch() ? 55 : 35,
    flexDirection: 'row',
    backgroundColor: COLORS.darkBlue,
  },
  searchIcon: {
    width: 17,
    height: 17,
  },
  searchInput: {
    width: width * 0.7,
    marginLeft: 10,
    color: COLORS.white,
    fontSize: scaler(13),
    // fontWeight: '500',
  },
  addressNtime: {
    marginTop: DeviceInfo.hasNotch() ? 50 : 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  address: {},
  label: {
    color: '#888CA1', //COLORS.darkGray,
    textTransform: 'uppercase',
    fontSize: scaler(10),
    fontWeight: '500',
  },
  subLabelView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subLabel: {
    color: COLORS.lightGray,
    fontSize: scaler(12),
  },
  downArrow: {
    width: 10,
    height: 5,
    marginLeft: 10,
    marginTop: 2,
  },
  bottomContainer: {
    flex: 0.65,
    paddingTop: 20,
    backgroundColor: COLORS.white,
  },
  discountList: {
    marginBottom: 30,
  },
  discountContainer: {
    marginTop: 20,
    width: width * 0.7,
    height: DeviceInfo.hasNotch() ? height * 0.13 : height * 0.15,
    marginLeft: 20,
    backgroundColor: COLORS.yellow,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  textView: {
    marginLeft: 40,
  },
  discountText1: {
    color: COLORS.white,
    fontSize: scaler(18),
    fontWeight: '300',
  },
  discountText2: {
    fontWeight: '800',
  },
  discountText3: {
    fontSize: scaler(14),
  },
  recommendedSection: {
    paddingHorizontal: 20,
  },
  recommendedText: {
    color: COLORS.textColor,
    fontSize: scaler(28),
  },
  products: {
    marginLeft: -20,
  },
  productItem: {
    width: width * 0.43,
    height: DeviceInfo.hasNotch() ? height * 0.22 : height * 0.29,
    borderRadius: 10,
    backgroundColor: COLORS.primaryGray,
    marginTop: DeviceInfo.hasNotch() ? 25 : 20,
    paddingBottom: 10,
  },
  heartIcon: {
    width: 15,
    height: 14,
    position: 'absolute',
    top: 10,
    left: 15,
  },
  productImg: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginTop: 30,
    borderRadius: 10,
  },
  productDetails: {
    position: 'absolute',
    bottom: 20,
    marginHorizontal: 20,
    width: width * 0.33,
  },
  imgNtext: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemPrice: {
    fontSize: scaler(12),
    fontWeight: '600',
  },
  itemTitle: {
    maxWidth: width * 0.22,
    fontSize: scaler(10),
    color: COLORS.lightBlue,
  },
  add: {
    width: 20,
    height: 20,
  },
});
