import '@testing-library/cypress/add-commands';
import '@cypress/code-coverage/support';

Cypress.Commands.add('addTask', (category, label, tags = '') => {
  cy.findByRole('button', { name: `Add ${category} task` }).click();
  cy.findByRole('textbox', { name: /title/i }).type(label);
  cy.findByRole('textbox', { name: /tags/i }).type(tags);
  cy.findByRole('button', { name: /Add task/i }).click();
});

Cypress.Commands.add('addBoard', (boardTitle) => {
  cy.findByRole('button', { name: 'Add board' }).click();
  cy.findByRole('textbox', { name: /title/i }).type(boardTitle);
  cy.findByRole('button', { name: 'Add board' }).click();
});
