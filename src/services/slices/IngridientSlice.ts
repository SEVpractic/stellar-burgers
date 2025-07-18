import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export const getIngredientsAsync = createAsyncThunk(
  'ingredients/getIngredients',
  getIngredientsApi
);

type TIngredientsState = {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
};

const initialIngredientsState: TIngredientsState = {
  ingredients: [],
  loading: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: initialIngredientsState,
  reducers: {},
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectLoading: (state) => state.loading,
    selectError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.ingredients = action.payload;
      })
      .addCase(getIngredientsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredientsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error == action.error.message || null;
      });
  }
});

export const ingredientsSelectors = ingredientsSlice.selectors;
