import { selectors } from './selectors';

declare global {
  namespace Cypress {
    interface Chainable {
      aliasIngredients(): Chainable<void>;
      addIngredient(alias: string): Chainable<void>;
      checkConstructorCount(count: number): Chainable<void>;
      checkIngredientAdded(alias: string, expectedCount: number): Chainable<void>;
      closeModal(): Chainable<void>;
      closeModalByOverlay(): Chainable<void>;
    }
  }
}

export {};
