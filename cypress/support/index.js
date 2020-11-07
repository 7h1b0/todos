import '@testing-library/cypress/add-commands';
import '@cypress/code-coverage/support';

Cypress.Commands.add('addTask', (category, label) => {
  cy.findByText(`Add ${category} task`).click();
  cy.findByPlaceholderText(/Enter task label/i).type(label);
  cy.findByText(/Add task/i).click();
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
