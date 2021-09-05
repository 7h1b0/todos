import '@testing-library/cypress/add-commands';
import '@cypress/code-coverage/support';

Cypress.Commands.add('addTask', (category, label, tags = '') => {
  cy.findByRole('button', { name: `Add ${category} task` }).click();
  cy.findByRole('textbox', { name: /task title/i }).type(label);
  cy.findByRole('textbox', { name: /tags separated by comma/i }).type(tags);
  cy.findByRole('button', { name: /Add task/i }).click();
});

Cypress.Commands.add(
  'attachFile',
  {
    prevSubject: 'element',
  },
  ($input, fileName, type) => {
    cy.fixture(fileName)
      .then(JSON.stringify)
      .then((jsonStr) => new Blob([jsonStr], { type }))
      .then((blob) => {
        const file = new File([blob], fileName, { type });
        const dt = new DataTransfer();
        dt.items.add(file);
        $input[0].files = dt.files;

        cy.wrap($input).trigger('input', { force: true });
      });
  },
);
