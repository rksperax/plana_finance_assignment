import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {
  RouteProp,
  StackActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';

import {CustomButton} from '../components';
import {COLORS, IMAGES} from '../assets';
import scaler from '../utils/scaler';
import DeviceInfo from 'react-native-device-info';

const {width, height} = Dimensions.get('window');

type ParamList = {
  BuyNow: {
    item: any;
  };
};

type ProductDetailsScreenRouteProp = RouteProp<ParamList, 'BuyNow'>;

const BuyNow = () => {
  const navigation = useNavigation();
  const routes = useRoute<ProductDetailsScreenRouteProp>();

  const [productItem, setProductItem] = useState({}) as any;
  const [productCount, setProductCount] = useState(1);

  useEffect(() => {
    if (routes?.params?.item) {
      setProductItem(routes.params.item);
    }
  }, [routes?.params?.item]);

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
            disabled={productCount === 1 ? true : false}
            onPress={() => setProductCount(productCount - 1)}
            hitSlop={{top: 30, left: 20, bottom: 20, right: 20}}>
            <Image source={IMAGES.minus} style={styles.plusIcon} />
          </TouchableOpacity>
          <Text style={[styles.itemName, styles.itemCount]}>
            {productCount}
          </Text>
          <TouchableOpacity
            onPress={() => setProductCount(productCount + 1)}
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
        <Text style={styles.category}>{'Buy Now'}</Text>
      </View>
      <View style={styles.cartProducts}>{renderItem({item: productItem})}</View>

      <RenderPriceView productItem={productItem} productCount={productCount} />
    </View>
  );
};

export default BuyNow;

const RenderPriceView = ({productItem, productCount}: any) => {
  const navigation = useNavigation();

  const checkout = () => {
    Toast.show('Successfully Purchased', Toast.SHORT);
    navigation.dispatch(StackActions.popToTop());
  };

  return (
    <View style={styles.totalContainer}>
      <View style={[styles.cartItem, styles.priceView]}>
        <Text style={styles.label}>{'Subtotal'}</Text>
        <Text style={styles.itemName}>
          {`$${productItem?.price * productCount}`}
        </Text>
      </View>
      <View style={[styles.cartItem, styles.priceView]}>
        <Text style={styles.label}>{'Delivery'}</Text>
        <Text style={styles.itemName}>{`$2`}</Text>
      </View>
      <View style={[styles.cartItem, styles.priceView]}>
        <Text style={styles.label}>{'Total'}</Text>
        <Text style={styles.itemName}>{`$${
          productItem?.price * productCount + 2
        }`}</Text>
      </View>
      <CustomButton
        title={'Proceed to Checkout'}
        isFilled={true}
        onClick={checkout}
        buttonStyles={styles.btnStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  headerIcons: {
    marginTop: DeviceInfo.hasNotch() ? 25 : 0,
    flexDirection: 'row',
    alignItems: 'center',
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
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    marginLeft: 15,
  },
  itemName: {
    fontSize: scaler(12),
    fontWeight: '400',
    maxWidth: width * 0.5,
  },
  itemPrice: {
    fontWeight: '300',
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
  totalContainer: {
    position: 'absolute',
    bottom: 90,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray,
  },
  label: {
    fontSize: scaler(12),
    fontWeight: '300',
    color: COLORS.lightBlue,
  },
  priceView: {
    marginTop: 5,
    marginHorizontal: 20,
  },
  btnStyle: {
    marginTop: 20,
    width: width * 0.9,
  },
});
