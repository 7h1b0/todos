const path = require('path');

beforeEach(() => {
  indexedDB.deleteDatabase('Todos');
  cy.visit('/');
});

it('allows to add, remove and drag and drop tasks', () => {
  cy.addTask('Todo', 'Get more sleep', 'task');
  cy.addTask('Todo', 'increase coverage', 'important, test');

  cy.findByLabelText('Todo').within(() => {
    cy.findByText('Get more sleep').should('be.visible');
    cy.findByText('increase coverage').should('be.visible');

    cy.findAllByRole('listitem').should('have.length', 3);
    cy.findByText('task').should('be.visible');
    cy.findByText('important').should('be.visible');
    cy.findByText('test').should('be.visible');
  });

  cy.addTask('In Progress', 'Make e2e tests', 'e2e');
  cy.findByLabelText('In Progress').within(() => {
    cy.findByText('Make e2e tests').should('be.visible');
    cy.findByText('Get more sleep').should('not.exist');
    cy.findByText('increase coverage').should('not.exist');
  });

  // Button only appears on :hover events, force: true is necessary
  cy.findByLabelText('Remove Get more sleep').click({ force: true });
  cy.findByText('Get more sleep').should('not.exist');

  cy.findByLabelText('Todo')
    .findByText('increase coverage')
    .should('be.visible');

  const dataTransfer = new DataTransfer();
  cy.findByText('increase coverage').trigger('dragstart', { dataTransfer });
  cy.findByText('In Progress').trigger('drop', { dataTransfer });

  cy.findByLabelText('Todo')
    .findByText('increase coverage')
    .should('not.exist');
  cy.findByLabelText('In Progress')
    .findByText('increase coverage')
    .should('be.visible');
});

it('saves tasks', () => {
  cy.addTask('Todo', 'Get more sleep', 'task');
  cy.addTask('Done', 'Add e2e tests', 'e2e');

  cy.reload();

  cy.findByText('Get more sleep').should('be.visible');
  cy.findByText('task').should('be.visible');
  cy.findByText('Add e2e tests').should('be.visible');
  cy.findByText('e2e').should('be.visible');
});

// Headless firefox doesn't support downloading a file
it('exports tasks to a file', { browser: '!firefox' }, () => {
  cy.addTask('Todo', 'Should be exported', 'important');
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
  cy.findByText('exported').should('be.visible');
  cy.findByText('feature').should('be.visible');
  cy.findByText('dark').should('be.visible');
});
