import {
  getIngredientsAsync,
  ingredientsSlice,
  TIngredientsState
} from '../IngridientSlice';
import { mockIngridientsData } from './mockData';

jest.mock('@api', () => ({
  getIngredientsApi: jest.fn()
}));

const initiallState: TIngredientsState = {
  ingredients: [],
  loading: false,
  error: null
};

describe('IngridientSlice test', () => {
  test('getIngredientsAsync.pending', () => {
    const state = ingredientsSlice.reducer(
      initiallState,
      getIngredientsAsync.pending('')
    );

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('getIngredientsAsync.rejected', () => {
    const error = 'error';
    const state = ingredientsSlice.reducer(
      initiallState,
      getIngredientsAsync.rejected(new Error(error), '')
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
  });

  test('getIngredientsAsync.fulfilled', () => {
    const state = ingredientsSlice.reducer(
      initiallState,
      getIngredientsAsync.fulfilled(mockIngridientsData, '')
    );

    expect(state.loading).toBe(false);
    expect(state.ingredients).toEqual(mockIngridientsData);
    expect(state.error).toBeNull();
  });
});
