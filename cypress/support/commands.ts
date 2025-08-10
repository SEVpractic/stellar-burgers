import { selectors } from './selectors';

Cypress.Commands.add('aliasIngredients', () => {
  cy.get(selectors.ingredient)
    .should('exist')
    .should('have.length', 15)
    .as('ingredients');

  cy.get('@ingredients').first().should('exist').as('bun');
  cy.get('@bun').find('button').should('exist').as('bunAddBtn');

  cy.get('@ingredients').eq(2).should('exist').as('main');
  cy.get('@main').find('button').should('exist').as('mainAddBtn');

  cy.get('@ingredients').last().should('exist').as('sauce');
  cy.get('@sauce').find('button').should('exist').as('sauceAddBtn');
});

Cypress.Commands.add('addIngredient', (alias) => {
  cy.get(alias).click();
});

Cypress.Commands.add('checkConstructorCount', (count) => {
  cy.get(selectors.constructorElement).should('have.length', count);
});

Cypress.Commands.add('checkIngredientAdded', (alias, expectedCount) => {
  cy.get(alias)
    .find('p')
    .eq(2)
    .invoke('text')
    .then((text) => {
      cy.checkConstructorCount(expectedCount);
      cy.get(selectors.constructorElement).should(
        'contain.text',
        text.trim()
      );
    });
});

Cypress.Commands.add('closeModal', () => {
  cy.get(selectors.modalClose).click();
  cy.get(selectors.modal).should('not.exist');
});

Cypress.Commands.add('closeModalByOverlay', () => {
  cy.get(selectors.modalOverlay).click({ force: true });
  cy.get(selectors.modal).should('not.exist');
});
