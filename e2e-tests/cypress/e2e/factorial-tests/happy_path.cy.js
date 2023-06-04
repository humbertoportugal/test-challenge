import { NUMBER_INPUT, CALCULATE_BUTTON, RESULT_DIV } from "../../support/elements";
import { baseUrl } from "../../support/config";

describe('Calculating the factorial', () => {
  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it('Calculates the factorial of 5 and expects the result to be 120', () => {
    cy.get(NUMBER_INPUT).type(5);
    cy.get(CALCULATE_BUTTON).click();
    cy.get(RESULT_DIV, { timeout: 10000 }).should('be.visible').contains('120');
  });
});