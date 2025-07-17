import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
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
      localStorage.removeItem('refreshToken');
    }

    return result.user;
  }
);

export const registerUserAsync = createAsyncThunk(
  'user/registerUser',
  async (registerData: TRegisterData) => {
    const result = await registerUserApi(registerData);

    if (result.success) {
      setCookie('accessToken', result.accessToken, { expires: 28000 });
      localStorage.setItem('refreshToken', result.refreshToken);
    }

    return result.user;
  }
);

export const loginUserAsync = createAsyncThunk(
  'user/loginUser',
  async (loginData: TLoginData) => {
    const result = await loginUserApi(loginData);

    if (result.success) {
      setCookie('accessToken', result.accessToken, { expires: 28000 });
      localStorage.setItem('refreshToken', result.refreshToken);
    }

    return result.user;
  }
);

export const logoutUserAsync = createAsyncThunk('user/logoutUser', async () => {
  const result = await logoutApi();

  if (result.success) {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  }

  return result;
});

export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (updateData: Partial<TRegisterData>) => {
    const result = await updateUserApi(updateData);

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
  selectors: {
    selectUser: (state) => state.user,
    selectAuthChecked: (state) => state.isAuthChecked,
    selectUserError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserAuthAsync.fulfilled, (state, action) => {
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
    builder
      .addCase(logoutUserAsync.fulfilled, (state, action) => {
        state.user = null;
        state.loading = false;
        state.error = null;
      })
      .addCase(logoutUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
    builder
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
        state.isAuthChecked = true;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.user = null;
        state.loading = false;
        state.error = action.error.message || null;
        state.isAuthChecked = true;
      });
  }
});

export const { setAuthChecked, setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
export const userSelectors = userSlice.selectors;
