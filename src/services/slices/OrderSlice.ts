import { TOrder } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderBurgerApi, getOrderByNumberApi, getOrdersApi } from '@api';

export const createOrderAsync = createAsyncThunk(
  'order/create',
  async (ids: string[]) => await orderBurgerApi(ids)
);

export const getOrderAsync = createAsyncThunk(
  'order/get',
  async (id: number) => await getOrderByNumberApi(id)
);

export const getUsersOrdersAsync = createAsyncThunk(
  'order/getAllByUser',
  getOrdersApi
);

export type TOrderState = {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  userOrders: TOrder[];
  loading: boolean;
  error: string | null;
};

const initOrderState: TOrderState = {
  orderRequest: false,
  orderModalData: null,
  userOrders: [],
  loading: false,
  error: null
};

export const orderSlice = createSlice({
  name: 'order',
  initialState: initOrderState,
  reducers: {
    clearOrder: () => initOrderState
  },
  selectors: {
    selectOrderModalData: (state) => state.orderModalData,
    selectOrderRequest: (state) => state.orderRequest,
    selectUserOrders: (state) => state.userOrders,
    selectLoading: (state) => state.loading,
    selectError: (state) => state.error
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
        state.error = action.error.message || null;
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
        state.error = action.error.message || null;
        state.orderModalData = null;
      });
    builder
      .addCase(getUsersOrdersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.userOrders = action.payload;
      })
      .addCase(getUsersOrdersAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.userOrders = [];
      })
      .addCase(getUsersOrdersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
        state.userOrders = [];
      });
  }
});

export const orderSelectors = orderSlice.selectors;
export const orderActions = orderSlice.actions;
