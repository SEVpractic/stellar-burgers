import {
  checkUserAuthAsync,
  loginUserAsync,
  logoutUserAsync,
  registerUserAsync,
  TUserState,
  updateUserAsync,
  userSlice
} from '../UserSlice';
import { mockLoginData, mockUserData, mockUserRegisterData } from './mockData';

jest.mock('@api', () => ({
  getUserApi: jest.fn()
}));

jest.mock('@api', () => ({
  registerUserApi: jest.fn()
}));

jest.mock('@api', () => ({
  loginUserApi: jest.fn()
}));

jest.mock('@api', () => ({
  logoutApi: jest.fn()
}));

jest.mock('@api', () => ({
  updateUserApi: jest.fn()
}));

const initiallState: TUserState = {
  user: null,
  loading: false,
  error: null,
  isAuthChecked: false
};

describe('UserSlice test', () => {
  test('checkUserAuthAsync.pending', () => {
    const state = userSlice.reducer(
      initiallState,
      checkUserAuthAsync.pending('')
    );

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('checkUserAuthAsync.rejected', () => {
    const error = 'error';
    const state = userSlice.reducer(
      initiallState,
      checkUserAuthAsync.rejected(new Error(error), '')
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
    expect(state.isAuthChecked).toBe(true);
    expect(state.user).toBeNull();
  });

  test('checkUserAuthAsync.fulfilled', () => {
    const state = userSlice.reducer(
      initiallState,
      checkUserAuthAsync.fulfilled(mockUserData, '')
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.isAuthChecked).toBe(true);
    expect(state.user).toEqual(mockUserData);
  });

  test('registerUserAsync.pending', () => {
    const state = userSlice.reducer(
      initiallState,
      registerUserAsync.pending('', mockUserRegisterData)
    );

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('registerUserAsync.rejected', () => {
    const error = 'error';
    const state = userSlice.reducer(
      initiallState,
      registerUserAsync.rejected(new Error(error), '', mockUserRegisterData)
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
    expect(state.isAuthChecked).toBe(true);
    expect(state.user).toBeNull();
  });

  test('registerUserAsync.fulfilled', () => {
    const state = userSlice.reducer(
      initiallState,
      registerUserAsync.fulfilled(mockUserData, '', mockUserRegisterData)
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.isAuthChecked).toBe(true);
    expect(state.user).toEqual(mockUserData);
  });

  test('loginUserAsync.pending', () => {
    const state = userSlice.reducer(
      initiallState,
      loginUserAsync.pending('', mockLoginData)
    );

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('loginUserAsync.rejected', () => {
    const error = 'error';
    const state = userSlice.reducer(
      initiallState,
      loginUserAsync.rejected(new Error(error), '', mockLoginData)
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
    expect(state.isAuthChecked).toBe(true);
    expect(state.user).toBeNull();
  });

  test('loginUserAsync.fulfilled', () => {
    const state = userSlice.reducer(
      initiallState,
      loginUserAsync.fulfilled(mockUserData, '', mockLoginData)
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.isAuthChecked).toBe(true);
    expect(state.user).toEqual(mockUserData);
  });

  test('logoutUserAsync.pending', () => {
    const state = userSlice.reducer(initiallState, logoutUserAsync.pending(''));

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('logoutUserAsync.rejected', () => {
    const error = 'error';
    const state = userSlice.reducer(
      initiallState,
      logoutUserAsync.rejected(new Error(error), '')
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
  });

  test('logoutUserAsync.fulfilled', () => {
    const state = userSlice.reducer(
      initiallState,
      logoutUserAsync.fulfilled({ success: true }, '')
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.user).toBeNull();
  });

  test('updateUserAsync.pending', () => {
    const state = userSlice.reducer(
      initiallState,
      updateUserAsync.pending('', mockUserRegisterData)
    );

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('updateUserAsync.rejected', () => {
    const error = 'error';
    const state = userSlice.reducer(
      initiallState,
      updateUserAsync.rejected(new Error(error), '', mockUserRegisterData)
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
    expect(state.isAuthChecked).toBe(true);
    expect(state.user).toBeNull();
  });

  test('updateUserAsync.fulfilled', () => {
    const state = userSlice.reducer(
      initiallState,
      updateUserAsync.fulfilled(mockUserData, '', mockUserRegisterData)
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.user).toEqual(mockUserData);
    expect(state.isAuthChecked).toBe(true);
  });
});
