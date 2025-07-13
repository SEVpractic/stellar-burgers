import { TOrder } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';

export const createOrderAsync = createAsyncThunk(
  'order/create',
  async (ids: string[]) => await orderBurgerApi(ids)
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
  }
});

export const orderReducer = orderSlice.reducer;
export const { clearOrder } = orderSlice.actions;
