describe('stellar-burgers', function () {
  this.beforeEach(() => {
    cy.intercept('GET', '/api/auth/user', { fixture: 'login.json' }).as(
      'getUser'
    );
    window.localStorage.setItem('refreshToken', 'mockedRefreshToken');
    cy.setCookie('accessToken', 'mockedAccessToken');

    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );

    cy.visit('');
    cy.wait('@getUser');
    cy.wait('@getIngredients');

    cy.get('[data-cy=ingredient]')
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

  this.afterEach(() => {
    window.localStorage.removeItem('refreshToken');
    cy.clearCookie('accessToken');
  });

  it('ingridients modal close by crossbar', () => {
    cy.get('@ingredients').first().click();
    cy.get('[data-cy=modal]').should('exist');
    cy.get('[data-cy=modal-close]').click();
    cy.get('[data-cy=modal]').should('not.exist');
  });

  it('ingridients modal close by overlay', () => {
    cy.get('@ingredients').first().click();
    cy.get('[data-cy=modal]').should('exist');
    cy.get('[data-cy=modal-overlay]').click({ force: true });
    cy.get('[data-cy=modal]').should('not.exist');
  });

  it('add ingridients to  constructor', () => {
    cy.contains('Выберите булки').should('be.visible');
    cy.contains('Выберите начинку').should('be.visible');

    cy.get('@bunAddBtn').click();
    cy.contains('Выберите булки').should('not.exist');
    cy.get('div.constructor-element').should('have.length', 2);
    cy.get('@bun')
      .find('p')
      .eq(2)
      .invoke('text')
      .then((bunText) => {
        cy.get('div.constructor-element').should(
          'contain.text',
          bunText.trim()
        );
      });

    cy.get('@mainAddBtn').click();
    cy.contains('Выберите начинку').should('not.exist');
    cy.get('div.constructor-element').should('have.length', 3);
    cy.get('@main')
      .find('p')
      .eq(2)
      .invoke('text')
      .then((bunText) => {
        cy.get('div.constructor-element').should(
          'contain.text',
          bunText.trim()
        );
      });

    cy.get('@sauceAddBtn').click();
    cy.get('div.constructor-element').should('have.length', 4);
    cy.get('@sauce')
      .find('p')
      .eq(2)
      .invoke('text')
      .then((bunText) => {
        cy.get('div.constructor-element').should(
          'contain.text',
          bunText.trim()
        );
      });
  });

  it('create order', () => {
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );

    cy.get('@bunAddBtn').click();
    cy.get('@mainAddBtn').click();
    cy.get('@sauceAddBtn').click();
    cy.get('div.constructor-element').should('have.length', 4);

    cy.contains('Оформить заказ').click();
    cy.wait('@createOrder');

    cy.get('[data-cy=modal]').should('exist');
    cy.fixture('order.json').then((json) => {
      cy.get('[data-cy=order-number]')
        .should('exist')
        .and('have.text', json.order.number.toString());
    });

    cy.get('[data-cy=modal-close]').click();
    cy.get('[data-cy=modal]').should('not.exist');

    cy.contains('Выберите булки').should('be.visible');
    cy.contains('Выберите начинку').should('be.visible');
    cy.get('div.constructor-element').should('have.length', 0);
  });
});
