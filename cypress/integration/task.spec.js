const path = require('path');

beforeEach(() => {
  indexedDB.deleteDatabase('Todos');
  cy.visit('/');
});

it('adds tasks', () => {
  cy.addTask('Todo', 'Get more sleep');
  cy.addTask('Todo', 'increase coverage');

  cy.findByLabelText('Todo').within(() => {
    cy.findByText('Get more sleep').should('be.visible');
    cy.findByText('increase coverage').should('be.visible');
  });

  cy.addTask('In Progress', 'Make e2e tests');
  cy.findByLabelText('In Progress').within(() => {
    cy.findByText('Make e2e tests').should('be.visible');
    cy.findByText('Get more sleep').should('not.exist');
    cy.findByText('increase coverage').should('not.exist');
  });
});

it('removes a task', () => {
  cy.addTask('Todo', 'Get more sleep');

  cy.findByText('Get more sleep').trigger('mouseover');
  cy.findByLabelText('Remove task').click();

  cy.findByLabelText('Get more sleep').should('not.exist');
});

it('saves tasks', () => {
  cy.addTask('Todo', 'Get more sleep');
  cy.addTask('Done', 'Add e2e tests');

  cy.reload();

  cy.findByText('Get more sleep').should('be.visible');
  cy.findByText('Add e2e tests').should('be.visible');
});

it('exports tasks to a file', () => {
  cy.addTask('Todo', 'Should be exported');
  cy.findByText('Export').click();

  const downloadedFilename = path.join('cypress/downloads', 'tasks.json');

  cy.readFile(downloadedFilename, { timeout: 15000 }).should((tasks) => {
    expect(tasks.length).to.equals(1);

    const [task] = tasks;
    expect(task.title).to.equals('Should be exported');
    expect(task.categoryId).to.equals(0);
  });
});

it('imports tasks from a file', () => {
  cy.findByText('import feature').should('not.exist');
  cy.findByLabelText('Import').attachFile('tasks.json', 'application/json');
  cy.findByText('import feature').should('be.visible');
});

it('allows drag and drop', () => {
  const dataTransfer = new DataTransfer();
  const task = 'Move to progress';

  cy.addTask('Todo', task);

  cy.findByLabelText('Todo').findByText(task).should('be.visible');

  cy.findByText(task).trigger('dragstart', { dataTransfer });
  cy.findByText('In Progress').trigger('drop', { dataTransfer });

  cy.findByLabelText('Todo').findByText(task).should('not.exist');
  cy.findByLabelText('In Progress').findByText(task).should('be.visible');
});
