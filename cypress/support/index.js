import '@testing-library/cypress/add-commands';
import '@cypress/code-coverage/support';

Cypress.Commands.add('addTask', (category, label, tags = '') => {
  cy.findByRole('button', { name: `Add ${category} task` }).click();
  cy.findByRole('textbox', { name: /task title/i }).type(label);
  cy.findByRole('textbox', { name: /tags separated by comma/i }).type(tags);
  cy.findByRole('button', { name: /Add task/i }).click();
});
