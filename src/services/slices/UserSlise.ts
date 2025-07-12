import { getUserApi, registerUserApi, TRegisterData } from '@api';
import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue
} from '@reduxjs/toolkit';
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

export const registerUserAsync = createAsyncThunk(
  'user/registerUser',
  async (registerData: TRegisterData) => {
    const result = await registerUserApi(registerData);
    return result.user;
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
    builder
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
        state.isAuthChecked = true;
      })
      .addCase(registerUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.user = null;
        state.loading = false;
        state.error = action.error.message || null;
        state.isAuthChecked = true;
      });
  }
});

export const { setAuthChecked: setAuthChecked, setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
