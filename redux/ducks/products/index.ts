import slice from './product-slice';
import thunks from './product-thunk';
import selectors from './product-selector';

export default {
  reducer: slice.reducer,
  ...selectors,
  ...slice.actions,
  ...thunks,
};
