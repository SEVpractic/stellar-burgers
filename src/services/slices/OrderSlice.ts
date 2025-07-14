import { TOrder } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderBurgerApi, getOrderByNumberApi } from '@api';

export const createOrderAsync = createAsyncThunk(
  'order/create',
  async (ids: string[]) => await orderBurgerApi(ids)
);

export const getOrderAsync = createAsyncThunk(
  'order/get',
  async (id: number) => await getOrderByNumberApi(id)
);

export type TOrderState = {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  loading: boolean;
  error: string | null;
};

const initOrderState: TOrderState = {
  orderRequest: false,
  orderModalData: null,
  loading: false,
  error: null
};

export const orderSlice = createSlice({
  name: 'order',
  initialState: initOrderState,
  reducers: {
    clearOrder: () => initOrderState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(createOrderAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.orderRequest = true;
      })
      .addCase(createOrderAsync.rejected, (state, action) => {
        state.loading = false;
        state.error == action.error.message || null;
        state.orderRequest = false;
      });
    builder
      .addCase(getOrderAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.orderModalData = action.payload?.orders?.[0];
      })
      .addCase(getOrderAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.orderModalData = null;
      })
      .addCase(getOrderAsync.rejected, (state, action) => {
        state.loading = false;
        state.error == action.error.message || null;
        state.orderModalData = null;
      });
  }
});

export const orderReducer = orderSlice.reducer;
export const { clearOrder } = orderSlice.actions;
