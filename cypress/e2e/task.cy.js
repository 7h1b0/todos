const path = require('path');

beforeEach(() => {
  indexedDB.deleteDatabase('Todos');
  cy.visit('/');
});

it('allows to add, remove and drag and drop tasks', () => {
  cy.addTask('Todo', 'Get more sleep');
  cy.addTask('Todo', 'increase coverage', 'important, test');

  cy.findByRole('region', { name: 'Todo' }).within(() => {
    cy.findByRole('article', { name: 'Get more sleep' }).within(() => {
      cy.findByRole('heading', { name: 'Get more sleep' }).should('be.visible');
    });
    cy.findByRole('article', { name: 'increase coverage' }).within(() => {
      cy.findByRole('heading', { name: 'increase coverage' }).should(
        'be.visible',
      );
      cy.findByText('important').should('be.visible');
      cy.findByText('test').should('be.visible');
    });
  });

  cy.addTask('In Progress', 'Make e2e tests', 'e2e');
  cy.findByRole('region', { name: 'In Progress' }).within(() => {
    cy.findByRole('article', { name: 'Make e2e tests' }).should('be.visible');
    cy.findByRole('article', { name: 'Get more sleep' }).should('not.exist');
    cy.findByRole('article', { name: 'increase coverage' }).should('not.exist');
  });

  // Button only appears on :hover events, force: true is necessary
  cy.findByRole('button', { name: 'Remove Get more sleep' }).click({
    force: true,
  });
  cy.findByRole('article', { name: 'Get more sleep' }).should('not.exist');

  cy.findByRole('region', { name: 'Todo' })
    .findByRole('article', { name: 'increase coverage' })
    .should('be.visible');

  const dataTransfer = new DataTransfer();
  cy.findByRole('article', { name: 'increase coverage' }).trigger('dragstart', {
    dataTransfer,
  });
  cy.findByText('In Progress').trigger('drop', { dataTransfer });

  cy.findByRole('region', { name: 'Todo' })
    .findByRole('article', { name: 'increase coverage' })
    .should('not.exist');
  cy.findByRole('region', { name: 'In Progress' })
    .findByRole('article', { name: 'increase coverage' })
    .should('be.visible');

  cy.findByRole('searchbox').type('e2e');
  cy.findByRole('article', { name: 'increase coverage' }).should('not.exist');
  cy.findByRole('article', { name: 'Make e2e tests' }).should('be.visible');
});

it('saves tasks', () => {
  cy.addTask('Todo', 'Get more sleep', 'task');
  cy.addTask('Done', 'Add e2e tests', 'e2e');

  cy.reload();

  cy.findByRole('article', { name: 'Get more sleep' }).within(() => {
    cy.findByRole('heading', { name: 'Get more sleep' }).should('be.visible');
    cy.findByText('task').should('be.visible');
  });

  cy.findByRole('article', { name: 'Add e2e tests' }).within(() => {
    cy.findByRole('heading', { name: 'Add e2e tests' }).should('be.visible');
    cy.findByText('e2e').should('be.visible');
  });
});

// Headless firefox doesn't support downloading a file
it('exports tasks to a file', { browser: '!firefox' }, () => {
  cy.addTask('Todo', 'Should be exported', 'important');

  cy.findByRole('button', { name: 'Export' }).click();

  const downloadedFilename = path.join('cypress/downloads', 'tasks.json');

  cy.readFile(downloadedFilename, { timeout: 15000 }).should(({ tasks }) => {
    expect(tasks.length).to.equals(1);

    const [task] = tasks;
    expect(task.title).to.equals('Should be exported');
    expect(task.categoryId).to.equals(0);
  });
});

it('imports tasks from a file', () => {
  cy.fixture('tasks.json').as('tasks');
  cy.findByText('import feature').should('not.exist');

  // Input is hidden but the label isn't
  cy.findByLabelText('Import').selectFile('@tasks', { force: true });

  cy.findByRole('region', { name: 'Todo' })
    .findByRole('article', { name: 'import feature' })
    .within(() => {
      cy.findByRole('heading', { name: 'import feature' }).should('be.visible');
      cy.findByText('exported').should('be.visible');
    });

  cy.findByRole('article', { name: 'dark theme' }).should('not.exist');

  cy.findByRole('button', { name: 'Theme' }).click();

  cy.findByRole('article', { name: 'import feature' }).should('not.exist');
  cy.findByRole('region', { name: 'In Progress' })
    .findByRole('article', { name: 'dark theme' })
    .within(() => {
      cy.findByRole('heading', { name: 'dark theme' }).should('be.visible');
      cy.findByText('feature').should('be.visible');
      cy.findByText('dark').should('be.visible');
    });
});
