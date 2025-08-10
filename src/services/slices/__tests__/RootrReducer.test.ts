import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { constructorSlice } from '../ConstructorSlice';
import { feedSlice } from '../FeedSlice';
import { ingredientsSlice } from '../IngridientSlice';
import { orderSlice } from '../OrderSlice';
import { userSlice } from '../UserSlice';

describe('rootReducer', () => {
  test('initialState', () => {
    const rootReducer = combineReducers({
      [ingredientsSlice.name]: ingredientsSlice.reducer,
      [userSlice.name]: userSlice.reducer,
      [constructorSlice.name]: constructorSlice.reducer,
      [orderSlice.name]: orderSlice.reducer,
      [feedSlice.name]: feedSlice.reducer
    });

    const store = configureStore({
      reducer: rootReducer
    });

    const initialState = store.getState();

    store.dispatch({ type: 'UNKNOWN_ACTION' });
    expect(store.getState()).toEqual(initialState);
  });
});
