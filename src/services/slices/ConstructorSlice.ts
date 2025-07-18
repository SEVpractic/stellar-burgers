import { createSlice, nanoid } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '@utils-types';
import { PayloadAction } from '@reduxjs/toolkit';

type TConstructorItems = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initConstructorItems: TConstructorItems = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState: initConstructorItems,
  reducers: {
    addIngridient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngridient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients = state.ingredients.filter(
        (el) => el.id !== action.payload.id
      );
    },
    moveIngridientUp: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const index = state.ingredients.findIndex(
        (el) => el.id === action.payload.id
      );

      if (index > 0) {
        const temp = state.ingredients[index - 1];
        state.ingredients[index - 1] = state.ingredients[index];
        state.ingredients[index] = temp;
      }
    },
    moveIngridientDown: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const index = state.ingredients.findIndex(
        (el) => el.id === action.payload.id
      );

      if (index >= 0 && index < state.ingredients.length - 1) {
        const temp = state.ingredients[index + 1];
        state.ingredients[index + 1] = state.ingredients[index];
        state.ingredients[index] = temp;
      }
    },
    clearConstructor: () => initConstructorItems
  }
});

export const constructorReducer = constructorSlice.reducer;
export const constructorActions = constructorSlice.actions;
