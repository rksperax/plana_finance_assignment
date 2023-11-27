import {createAsyncThunk} from '@reduxjs/toolkit';
import ProductService from './product-service';

const fetchAllProducts = createAsyncThunk(
  'fetchAllProducts',
  async (_, {rejectWithValue, dispatch}) => {
    const res = (await ProductService.getRequest('products')) as any;

    console.log('res =>', JSON.stringify(res));

    if (
      res?.data &&
      res?.status === 200 &&
      res.data?.products &&
      res.data.products.length > 0
    ) {
      return res.data.products;
    }
    return [];
  },
);

const addToFav = createAsyncThunk(
  'addToFav',
  async (item: any, {rejectWithValue, dispatch}) => {
    if (item?.title) {
      return item;
    }
    return {};
  },
);

const removeFromFav = createAsyncThunk(
  'removeFromFav',
  async (item: any, {rejectWithValue, dispatch}) => {
    if (item?.title) {
      return item;
    }
    return {};
  },
);

const addToCart = createAsyncThunk(
  'addToCart',
  async (item: any, {rejectWithValue, dispatch}) => {
    if (item?.title) {
      return item;
    }
    return {};
  },
);

const removeFromCart = createAsyncThunk(
  'removeFromCart',
  async (item: any, {rejectWithValue, dispatch}) => {
    if (item?.title) {
      return item;
    }
    return {};
  },
);

const removeAllFromCart = createAsyncThunk(
  'removeAllFromCart',
  async (_, {rejectWithValue, dispatch}) => {
    return true;
  },
);

const ProductThunk = {
  fetchAllProducts,
  addToFav,
  removeFromFav,
  addToCart,
  removeFromCart,
  removeAllFromCart,
};

export default ProductThunk;
