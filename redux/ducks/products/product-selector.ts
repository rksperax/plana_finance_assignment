import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';

const productsData = (): any => {
  const productsData = useSelector(
    (state: RootState) => state.product.productsData,
  );
  return productsData;
};

const favData = (): any => {
  const favItems = useSelector((state: RootState) => state.product.favItems);
  return favItems;
};

const cartData = (): any => {
  const cartItems = useSelector((state: RootState) => state.product.cartItems);
  return cartItems;
};

const cartPrice = (): any => {
  const cartPrice = useSelector((state: RootState) => state.product.cartPrice);
  return cartPrice;
};

const ProductSelector = {productsData, favData, cartData, cartPrice};

export default ProductSelector;
