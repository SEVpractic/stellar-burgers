import { selectors } from '../support/selectors';

describe('stellar-burgers', function () {
  this.beforeEach(() => {
    cy.intercept('GET', '/api/auth/user', { fixture: 'login.json' }).as('getUser');
    window.localStorage.setItem('refreshToken', 'mockedRefreshToken');
    cy.setCookie('accessToken', 'mockedAccessToken');

    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');

    cy.visit('');
    cy.wait('@getUser');
    cy.wait('@getIngredients');

    cy.aliasIngredients();
  });

  this.afterEach(() => {
    window.localStorage.removeItem('refreshToken');
    cy.clearCookie('accessToken');
  });

  it('ingredients modal close by crossbar', () => {
    cy.get('@ingredients').first().click();
    cy.get(selectors.modal).should('exist');
    cy.closeModal();
  });

  it('ingredients modal close by overlay', () => {
    cy.get('@ingredients').first().click();
    cy.get(selectors.modal).should('exist');
    cy.closeModalByOverlay();
  });

  it('add ingredients to constructor', () => {
    cy.contains(selectors.selectBun).should('be.visible');
    cy.contains(selectors.selectMain).should('be.visible');

    cy.addIngredient('@bunAddBtn');
    cy.contains(selectors.selectBun).should('not.exist');
    cy.checkIngredientAdded('@bun', 2);

    cy.addIngredient('@mainAddBtn');
    cy.contains(selectors.selectMain).should('not.exist');
    cy.checkIngredientAdded('@main', 3);

    cy.addIngredient('@sauceAddBtn');
    cy.checkIngredientAdded('@sauce', 4);
  });

  it('create order', () => {
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as('createOrder');

    cy.addIngredient('@bunAddBtn');
    cy.addIngredient('@mainAddBtn');
    cy.addIngredient('@sauceAddBtn');
    cy.checkConstructorCount(4);

    cy.contains('Оформить заказ').click();
    cy.wait('@createOrder');

    cy.get(selectors.modal).should('exist');
    cy.fixture('order.json').then((json) => {
      cy.get(selectors.orderNumber)
        .should('exist')
        .and('have.text', json.order.number.toString());
    });

    cy.closeModal();

    cy.contains(selectors.selectBun).should('be.visible');
    cy.contains(selectors.selectMain).should('be.visible');
    cy.checkConstructorCount(0);
  });
});
