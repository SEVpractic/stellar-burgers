import { feedSlice, getFeedsAsync, TFeedState } from "../FeedSlice";
import { mockUserOrders } from "./mockData";

jest.mock('@api', () => ({
  getFeedsApi: jest.fn()
}));

const initiallState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

describe('FeedSlice test', () => {
  test('getFeedsAsync.pending', () => {
    const state = feedSlice.reducer(
      initiallState,
      getFeedsAsync.pending('')
    );

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('getFeedsAsync.rejected', () => {
    const error = 'error';
    const state = feedSlice.reducer(
      initiallState,
      getFeedsAsync.rejected(new Error(error), '')
    );

    expect(state.total).toEqual(0);
    expect(state.totalToday).toEqual(0);
    expect(state.loading).toBe(false);
    expect(state.orders).toEqual([]);
    expect(state.error).toBe(error);
  });

  test('getFeedsAsync.fulfilled', () => {
    const state = feedSlice.reducer(
      initiallState,
      getFeedsAsync.fulfilled(mockUserOrders, '')
    );

    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(mockUserOrders.orders);
    expect(state.total).toEqual(mockUserOrders.total);
    expect(state.totalToday).toEqual(mockUserOrders.totalToday);
    expect(state.error).toBeNull();
  });
});