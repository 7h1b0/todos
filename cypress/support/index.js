import '@testing-library/cypress/add-commands';

Cypress.Commands.add('addTask', (category, label) => {
  cy.findByLabelText(`Add ${category} task`).click();
  cy.findByLabelText('Task Label').type(label);
  cy.findByText('ADD TASK').click();
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
