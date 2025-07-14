import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getFeedsAsync = createAsyncThunk(
  'feeds/get',
  async () => await getFeedsApi()
);

export type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null;
};

const initFeedState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState: initFeedState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeedsAsync.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.loading = false;
        state.error = null;
      })
      .addCase(getFeedsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeedsAsync.rejected, (state, action) => {
        state.orders = [];
        state.total = 0;
        state.totalToday = 0;
        state.loading = false;
        state.error == action.error.message || null;
      });
  }
});

export const feedReducer = feedSlice.reducer;
