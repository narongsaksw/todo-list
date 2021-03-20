import {configureStore} from '@reduxjs/toolkit';
import conuterReducer from './models/counter';
import userReducer from './models/user';

export default configureStore({
  reducer: {
    counter: conuterReducer,
    user: userReducer,
  },
});
