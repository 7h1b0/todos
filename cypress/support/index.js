Cypress.Commands.add('addTodo', (category, label) => {
  cy.get(`[aria-label="Add ${category} todo"]`).click();
  cy.get('input[name="add"]').type(label);
  cy.wait(100);
  cy.contains('ADD TASK').click();
});
