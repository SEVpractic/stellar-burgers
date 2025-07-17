import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import { ingredientsReducer } from './slices/IngridientSlice';
import { userSlice } from './slices/UserSlice';
import { constructorReducer } from './slices/ConstructorSlice';
import { orderReducer } from './slices/OrderSlice';
import { feedReducer } from './slices/FeedSlice';

const rootReducer = combineReducers({
  ingredientsReducer,
  [userSlice.name]: userSlice.reducer,
  constructorReducer,
  orderReducer,
  feedReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
