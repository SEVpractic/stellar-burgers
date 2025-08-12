import { createOrderAsync, getOrderAsync, getUsersOrdersAsync, orderSlice, TOrderState } from "../OrderSlice";
import { mockOrderIds, mockOrderNumber, mockCreateOrderResponce, mockOrderResponce, mockUserOrders } from "./mockData";

jest.mock('@api', () => ({
  orderBurgerApi: jest.fn()
}));

jest.mock('@api', () => ({
  getOrderByNumberApi: jest.fn()
}));

jest.mock('@api', () => ({
  getOrdersApi: jest.fn()
}));

const initiallState: TOrderState = {
  orderRequest: false,
  orderModalData: null,
  userOrders: [],
  loading: false,
  error: null
};

describe('OrderSlice test', () => {
  test('createOrderAsync.pending', () => {
    const state = orderSlice.reducer(
      initiallState,
      createOrderAsync.pending('', mockOrderIds)
    );

    expect(state.loading).toBe(true);
    expect(state.orderRequest).toBe(true);
    expect(state.error).toBeNull();
  });

  test('createOrderAsync.rejected', () => {
    const error = 'error';
    const state = orderSlice.reducer(
      initiallState,
      createOrderAsync.rejected(new Error(error), '', mockOrderIds)
    );

    expect(state.loading).toBe(false);
    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe(error);
  });

  test('createOrderAsync.fulfilled', () => {
    const state = orderSlice.reducer(
      initiallState,
      createOrderAsync.fulfilled(mockCreateOrderResponce, '', mockOrderIds)
    );

    expect(state.loading).toBe(false);
    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toEqual(mockCreateOrderResponce.order);
    expect(state.error).toBeNull();
  });

  test('getOrderAsync.pending', () => {
    const state = orderSlice.reducer(
      initiallState,
      getOrderAsync.pending('', mockOrderNumber)
    );

    expect(state.loading).toBe(true);
    expect(state.orderModalData).toBeNull();
    expect(state.error).toBeNull();
  });

  test('getOrderAsync.rejected', () => {
    const error = 'error';
    const state = orderSlice.reducer(
      initiallState,
      getOrderAsync.rejected(new Error(error), '', mockOrderNumber)
    );

    expect(state.loading).toBe(false);
    expect(state.orderModalData).toBeNull();
    expect(state.error).toBe(error);
  });

  test('getOrderAsync.fulfilled', () => {
    const state = orderSlice.reducer(
      initiallState,
      getOrderAsync.fulfilled(mockOrderResponce, '', mockOrderNumber)
    );

    expect(state.loading).toBe(false);
    expect(state.orderModalData).toEqual(mockOrderResponce.orders[0]);
  });

  test('getUsersOrdersAsync.pending', () => {
    const state = orderSlice.reducer(
      initiallState,
      getUsersOrdersAsync.pending('')
    );

    expect(state.loading).toBe(true);
    expect(state.userOrders).toEqual([]);
    expect(state.error).toBeNull();
  });

  test('getUsersOrdersAsync.rejected', () => {
    const error = 'error';
    const state = orderSlice.reducer(
      initiallState,
      getUsersOrdersAsync.rejected(new Error(error), '')
    );

    expect(state.loading).toBe(false);
    expect(state.userOrders).toEqual([]);
    expect(state.error).toBe(error);
  });

  test('getUsersOrdersAsync.fulfilled', () => {
    const state = orderSlice.reducer(
      initiallState,
      getUsersOrdersAsync.fulfilled(mockUserOrders.orders, '')
    );

    expect(state.loading).toBe(false);
    expect(state.userOrders).toEqual(mockOrderResponce.orders);
  });
});