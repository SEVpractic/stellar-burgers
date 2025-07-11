import { getUserApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { getCookie } from '../../utils/cookie';

export const checkUserAuthAsync = createAsyncThunk(
  'user/checkAuth',
  async (_, { dispatch }) => {
    const token = getCookie('accessToken');
    if (token) {
      try {
        const result = await getUserApi();
        console.log('resultUser:', result);
        dispatch(setUser(result));
        return result.user;
      } catch {
        localStorage.clear();
      }
    }
    dispatch(setAuthChecked());
    return null;
  }
);

type TUserState = {
  user: TUser | null;
  loading: boolean;
  error: string | null;
  isAuthChecked: boolean;
};

const userInitialState: TUserState = {
  user: null,
  loading: false,
  error: null,
  isAuthChecked: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    setAuthChecked: (state) => {
      state.isAuthChecked = true;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserAuthAsync.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(checkUserAuthAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkUserAuthAsync.rejected, (state, action) => {
        state.user = null;
        state.loading = false;
        state.error == action.error || null;
      });
  }
});

export const { setAuthChecked: setAuthChecked, setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
