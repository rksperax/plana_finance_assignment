import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import {StackActions, useNavigation} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';

import {CustomButton} from '../components';
import ProductSelector from '../redux/ducks/products/product-selector';
import {dispatch} from '../redux/store/store';
import ProductThunk from '../redux/ducks/products/product-thunk';
import {COLORS, IMAGES} from '../assets';
import scaler from '../utils/scaler';
import DeviceInfo from 'react-native-device-info';

const {width, height} = Dimensions.get('window');

const Cart = () => {
  const navigation = useNavigation();

  const cartData = ProductSelector.cartData();

  const renderItem = ({item}: any) => {
    return (
      <View style={styles.cartItem}>
        <View style={styles.imgNtext}>
          <Image source={{uri: item.thumbnail}} style={styles.productImg} />
          <View style={styles.nameNprice}>
            <Text numberOfLines={3} style={styles.itemName}>
              {item?.title}
            </Text>
            <Text
              style={[
                styles.itemName,
                styles.itemPrice,
              ]}>{`$${item?.price}`}</Text>
          </View>
        </View>
        <View style={styles.addNremove}>
          <TouchableOpacity
            onPress={() => dispatch<any>(ProductThunk.removeFromCart(item))}
            hitSlop={{top: 30, left: 20, bottom: 20, right: 20}}>
            <Image source={IMAGES.minus} style={styles.plusIcon} />
          </TouchableOpacity>
          <Text style={[styles.itemName, styles.itemCount]}>{item?.count}</Text>
          <TouchableOpacity
            onPress={() => dispatch<any>(ProductThunk.addToCart(item))}
            hitSlop={{top: 30, left: 20, bottom: 20, right: 20}}>
            <Image source={IMAGES.plus} style={styles.plusIcon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerIcons}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(StackActions.pop())}>
          <Image source={IMAGES.backArrow} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.category}>{`Shopping Cart ${
          cartData.length > 0 ? `(${cartData.length})` : ''
        }`}</Text>
      </View>
      <View style={styles.cartProducts}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={cartData}
          renderItem={renderItem}
          ListEmptyComponent={RenderEmptyComponent}
          ListFooterComponent={
            <>
              {cartData.length > 4 ? (
                <RenderFooter cartData={cartData} />
              ) : null}
            </>
          }
          ItemSeparatorComponent={() => <View style={styles.lineBreak} />}
        />
      </View>
      {cartData.length > 4 ? null : <RenderFooter cartData={cartData} />}
    </View>
  );
};

export default Cart;

const RenderEmptyComponent = () => {
  return (
    <View style={styles.noDataFound}>
      <Text style={styles.noDataText}>{'Nothing in Cart. Go add some!'}</Text>
    </View>
  );
};

const RenderFooter = ({cartData}: any) => {
  const navigation = useNavigation();

  const cartPrice = ProductSelector.cartPrice();

  const checkout = () => {
    Toast.show('Successfully Purchased', Toast.SHORT);
    dispatch<any>(ProductThunk.removeAllFromCart());
    navigation.dispatch(StackActions.popToTop());
  };

  return (
    <>
      {cartData.length > 0 ? (
        <View
          style={[
            cartData.length > 4
              ? styles.totalAlignWithFlatList
              : styles.totalStickToBottom,
            styles.totalContainer,
          ]}>
          <View style={[styles.cartItem, styles.priceView]}>
            <Text style={styles.label}>{'Subtotal'}</Text>
            <Text style={styles.itemName}>{`$${cartPrice}`}</Text>
          </View>
          <View style={[styles.cartItem, styles.priceView]}>
            <Text style={styles.label}>{'Delivery'}</Text>
            <Text style={styles.itemName}>{`$2`}</Text>
          </View>
          <View style={[styles.cartItem, styles.priceView]}>
            <Text style={styles.label}>{'Total'}</Text>
            <Text style={styles.itemName}>{`$${cartPrice + 2}`}</Text>
          </View>
          <CustomButton
            title={'Proceed to Checkout'}
            isFilled={true}
            onClick={checkout}
            buttonStyles={styles.btnStyle}
          />
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: 30,
  },
  headerIcons: {
    marginTop: DeviceInfo.hasNotch() ? 25 : 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backIcon: {
    width: 35,
    height: 35,
  },
  category: {
    marginLeft: 10,
    fontSize: scaler(14),
    fontWeight: '300',
  },
  cartProducts: {
    marginTop: 20,
    marginBottom: height * 0.12,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  priceView: {
    marginBottom: 10,
  },
  label: {
    fontSize: scaler(12),
    fontWeight: '300',
    color: COLORS.lightBlue,
  },
  imgNtext: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImg: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  nameNprice: {
    marginLeft: 10,
  },
  itemName: {
    fontSize: scaler(12),
    fontWeight: '400',
    maxWidth: width * 0.5,
  },
  itemPrice: {
    fontWeight: '300',
    marginTop: 5,
  },
  addNremove: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemCount: {
    marginHorizontal: 10,
  },
  plusIcon: {
    width: 30,
    height: 30,
  },
  lineBreak: {
    height: 2,
    backgroundColor: COLORS.lightGray,
    marginVertical: 10,
  },
  totalContainer: {
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray,
  },
  totalStickToBottom: {
    position: 'absolute',
    bottom: 90,
  },
  totalAlignWithFlatList: {
    marginTop: 30,
    marginBottom: DeviceInfo.hasNotch() ? 10 : 30,
  },
  btnStyle: {
    marginTop: 30,
    width: width * 0.9,
  },
  noDataFound: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  noDataText: {
    color: COLORS.black,
    fontSize: scaler(14),
    textAlign: 'center',
    marginVertical: height * 0.35,
  },
});
