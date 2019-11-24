beforeEach(() => {
  indexedDB.deleteDatabase('Todos');
  cy.visit('http://127.0.0.1:3000');
});

it('should add tasks', () => {
  cy.addTodo('Todo', 'Get more sleep');
  cy.contains('Get more sleep');

  cy.addTodo('In Progress', 'Make e2e tests');
  cy.contains('Make e2e tests');
});

it('should remove a task', () => {
  cy.addTodo('Todo', 'Get more sleep');

  cy.contains('Get more sleep').trigger('mouseover');
  cy.get('.delete').click();

  cy.contains('Get more sleep').should('not.exist');
});
