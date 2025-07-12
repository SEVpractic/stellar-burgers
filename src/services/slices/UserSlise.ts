import {
  getUserApi,
  loginUserApi,
  registerUserApi,
  TLoginData,
  TRegisterData
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';

export const checkUserAuthAsync = createAsyncThunk(
  'user/checkAuth',
  async () => {
    const accessToken = getCookie('accessToken');

    if (!accessToken) {
      throw new Error('No access token');
    }

    const result = await getUserApi();

    if (!result.success) {
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
    }

    return result.user;
  }
);

export const registerUserAsync = createAsyncThunk(
  'user/registerUser',
  async (registerData: TRegisterData) => {
    const result = await registerUserApi(registerData);
    return result.user;
  }
);

export const loginUserAsync = createAsyncThunk(
  'user/loginUser',
  async (loginData: TLoginData) => {
    const result = await loginUserApi(loginData);

    if (result.success) {
      setCookie('accessToken', result.accessToken, { expires: 28000 });
      setCookie('refreshToken', result.refreshToken, { expires: 28000 });
    }

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
        console.log('checkUserAuthAsync.fulfilled', action);
        state.user = action.payload;
        state.loading = false;
        state.error = null;
        state.isAuthChecked = true;
      })
      .addCase(checkUserAuthAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkUserAuthAsync.rejected, (state, action) => {
        console.log('checkUserAuthAsync.rejected', action);
        state.user = null;
        state.loading = false;
        state.error == action.error || null;
        state.isAuthChecked = true;
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
    builder
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
        state.isAuthChecked = true;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.user = null;
        state.loading = false;
        state.error = action.error.message || null;
        state.isAuthChecked = true;
      });
  }
});

export const { setAuthChecked, setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
