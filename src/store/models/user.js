import {createSlice} from '@reduxjs/toolkit';

export const user = createSlice({
  name: 'user',
  initialState: {
    isAuth: false,
  },
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setIsAuth} = user.actions;

export default user.reducer;
