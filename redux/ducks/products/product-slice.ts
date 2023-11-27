import {createSlice} from '@reduxjs/toolkit';
import ProductThunk from './product-thunk';

const initialState = {
  fetchProductSuccess: false,
  fetchProductLoading: false,
  productsData: [],
  favItems: [],
  cartItems: [],
  cartPrice: 0,
};

const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    reset: (state, payload: any) => {},
  },
  extraReducers: builder => {
    builder
      // .addCase(ProductThunk.fetchAllProducts.pending, state => {
      //   state.fetchProductSuccess = false;
      //   state.fetchProductLoading = true;
      //   state.productsData = [];
      // })
      .addCase(ProductThunk.fetchAllProducts.fulfilled, (state, action) => {
        state.fetchProductSuccess = true;
        state.fetchProductLoading = false;
        // state.favItems = [];
        // state.cartItems = [];
        // state.cartPrice = 0;

        let arr = action.payload;

        const productsDataArr = state.productsData as any;
        if (
          productsDataArr.length === 0 ||
          !productsDataArr[0].hasOwnProperty('favorite')
        ) {
          arr = arr.map((item: any) => ({...item, favorite: false}));
          state.favItems = [];
        }

        state.productsData = arr;
      })
      .addCase(ProductThunk.fetchAllProducts.rejected, state => {
        state.fetchProductSuccess = false;
        state.fetchProductLoading = false;
        state.productsData = [];
      })

      .addCase(ProductThunk.addToFav.fulfilled, (state, action) => {
        const tempArr = state.favItems as any;
        tempArr.push(action.payload);
        state.favItems = tempArr;

        const productsDataArr = state.productsData as any;
        for (let i = 0; i < productsDataArr.length; i++) {
          if (productsDataArr[i].id === action.payload.id) {
            productsDataArr[i].favorite = true;
            break;
          }
        }
        state.productsData = productsDataArr;
      })

      .addCase(ProductThunk.removeFromFav.fulfilled, (state, action) => {
        const itemName = action.payload.title;
        const updatedProducts = state.favItems.filter(
          (item: any) => item.title !== itemName,
        );

        state.favItems = updatedProducts;

        const productsDataArr = state.productsData as any;
        for (let i = 0; i < productsDataArr.length; i++) {
          if (productsDataArr[i].id === action.payload.id) {
            productsDataArr[i].favorite = false;
            break;
          }
        }
        state.productsData = productsDataArr;
      })

      .addCase(ProductThunk.addToCart.fulfilled, (state, action) => {
        const tempArr = state.cartItems ? state.cartItems : ([] as any);

        const existing =
          tempArr?.length > 0 &&
          tempArr.find((item: any) => item.id === action.payload.id);

        if (existing) {
          existing.count += 1;
        } else {
          const product = action.payload as any;

          tempArr.push({...product, count: 1});
          state.cartItems = tempArr;
        }
        const cartPriceAfterAdd = tempArr.reduce(
          (total: number, item: any) => total + item.price * item.count,
          0,
        );
        state.cartPrice = cartPriceAfterAdd;
      })

      .addCase(ProductThunk.removeFromCart.fulfilled, (state, action) => {
        const tempArr = state.cartItems ? state.cartItems : ([] as any);

        const existingProductIndex = tempArr.findIndex(
          (item: any) => item.id === action.payload.id,
        );

        if (existingProductIndex !== -1) {
          const existingProduct =
            tempArr?.length > 0 && tempArr[existingProductIndex];

          if (existingProduct.count > 1) {
            existingProduct.count -= 1;
          } else {
            tempArr.splice(existingProductIndex, 1);
          }
        }
        state.cartItems = tempArr;

        const cartPriceAfterRemove = tempArr.reduce(
          (total: number, item: any) => total + item.price * item.count,
          0,
        );
        state.cartPrice = cartPriceAfterRemove;
      })

      .addCase(ProductThunk.removeAllFromCart.fulfilled, state => {
        state.cartItems = [];
        state.cartPrice = 0;
      });
  },
});

export default ProductSlice;
