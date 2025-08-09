import {
  constructorActions,
  constructorSelectors,
  constructorSlice,
  TConstructorItems
} from '../ConstructorSlice';
import { mockBun, mockIngredient, mockSauce } from './mockData';

const initiallState: TConstructorItems = {
  bun: null,
  ingredients: []
};

test('addBun', () => {
  const state = constructorSlice.reducer(
    initiallState,
    constructorActions.addIngridient(mockBun)
  );

  expect(state.bun).not.toBeNull();
  expect(state.bun).toMatchObject({
    ...mockBun,
    id: expect.any(String)
  });
});

test('addIngredient', () => {
  const state = constructorSlice.reducer(
    initiallState,
    constructorActions.addIngridient(mockIngredient)
  );

  expect(state.ingredients[0]).toMatchObject({
    ...mockIngredient,
    id: expect.any(String)
  });
});

test('removeIngridient', () => {
  const state = constructorSlice.reducer(
    { ...initiallState, ingredients: [mockIngredient] },
    constructorActions.removeIngridient(mockIngredient)
  );

  expect(state.ingredients).toEqual([]);
});

test('moveIngridientUp', () => {
  const state = constructorSlice.reducer(
    { ...initiallState, ingredients: [mockIngredient, mockSauce] },
    constructorActions.moveIngridientUp(mockSauce)
  );

  expect(state.ingredients[0]).toMatchObject({
    ...mockSauce,
    id: expect.any(String)
  });
});

test('moveIngridientDown', () => {
  const state = constructorSlice.reducer(
    { ...initiallState, ingredients: [mockIngredient, mockSauce] },
    constructorActions.moveIngridientDown(mockIngredient)
  );

  expect(state.ingredients[0]).toMatchObject({
    ...mockSauce,
    id: expect.any(String)
  });
});

test('clearConstructor', () => {
  const state = constructorSlice.reducer(
    {
      ...initiallState,
      bun: mockBun,
      ingredients: [mockIngredient, mockSauce]
    },
    constructorActions.clearConstructor()
  );

  expect(state.bun).toBeNull();
  expect(state.ingredients).toEqual([]);
});

test('selectBun', () => {
  const state = {
    bunConstructor: {
      bun: mockBun,
      ingredients: []
    }   
  };

  const result = constructorSelectors.selectBun(state);

  expect(result).toMatchObject({
    ...mockBun,
    id: expect.any(String)
  });
});

test('selectIngredients', () => {
  const state = {
    bunConstructor: {
      bun: mockBun,
      ingredients: [mockIngredient, mockSauce]
    }   
  };

  const result = constructorSelectors.selectIngredients(state);

  expect(result).toHaveLength(2);
  expect(result[0]).toMatchObject({
    ...mockIngredient,
    id: expect.any(String)
  });
});
