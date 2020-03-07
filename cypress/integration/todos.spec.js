beforeEach(() => {
  indexedDB.deleteDatabase('Todos');
  cy.visit('/');
});

it('adds tasks', () => {
  cy.addTodo('Todo', 'Get more sleep');
  cy.findByText('Get more sleep').should('be.visible');

  cy.addTodo('In Progress', 'Make e2e tests');
  cy.findByText('Make e2e tests').should('be.visible');
});

it('removes a task', () => {
  cy.addTodo('Todo', 'Get more sleep');

  cy.findByText('Get more sleep').trigger('mouseover');
  cy.findByLabelText('Remove task').click();

  cy.findByLabelText('Get more sleep').should('not.exist');
});

it('saves tasks', () => {
  cy.addTodo('Todo', 'Get more sleep');
  cy.addTodo('Done', 'Add e2e tests');

  cy.reload();

  cy.findByText('Get more sleep').should('be.visible');
  cy.findByText('Add e2e tests').should('be.visible');
});

it('imports tasks from a file', () => {
  cy.findByText('import feature').should('not.exist');
  cy.findByLabelText('Import').attachFile('tasks.json', 'application/json');
  cy.findByText('import feature').should('be.visible');
});
