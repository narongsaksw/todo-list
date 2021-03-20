import {configureStore} from '@reduxjs/toolkit';
import conuterReducer from './models/counter';

export default configureStore({
  reducer: {
    counter: conuterReducer,
  },
});
