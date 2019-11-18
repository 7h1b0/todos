beforeEach(() => {
  indexedDB.deleteDatabase('Todos');
  cy.visit('http://127.0.0.1:3000');
});

it('should add tasks', () => {
  cy.addTodo('Todo', 'Get more sleep');
  cy.contains('1Todo');
  cy.contains('Get more sleep');
  cy.contains('0In Progress');

  cy.addTodo('In Progress', 'Make e2e tests');
  cy.contains('1In Progress');
  cy.contains('Make e2e tests');
});

it('should remove a task', () => {
  cy.addTodo('Todo', 'Get more sleep');

  cy.contains('Get more sleep').trigger('mouseover');
  cy.get('.delete').click();

  cy.contains('Get more sleep').should('not.exist');
});
