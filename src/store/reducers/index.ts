import { combineReducers } from 'redux';
import { commonReducer } from '@store/slices/common';
import { postReducer } from '@store/slices/posts';
import { videoReducer } from '@store/slices/videos';
import { authorReducer } from '@store/slices/author';
import { productReducer } from '@store/slices/products';
import { cartReducer } from '@store/slices/cart';
import { layoutReducer } from "@store/slices/layout"
import { blogReducer } from '@store/slices/blog'
import { formationReducer } from '@store/slices/formation'
import { bannerReducer } from "@store/slices/add-banner";


const rootReducer = combineReducers({
  common: commonReducer,
  posts: postReducer,
  video: videoReducer,
  author: authorReducer,
  product: productReducer,
  cart: cartReducer,
  layout: layoutReducer,
  blog: blogReducer,
  formations: formationReducer,
  banners: bannerReducer
});

export default rootReducer;
