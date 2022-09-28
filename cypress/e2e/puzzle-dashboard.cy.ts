// TO DO //

// Add tests for puzzles and packs when
// global wallet PR is merged:
// https://github.com/infinity-keys/ik-landing/pull/262

beforeEach(() => {
  cy.visit("/");
});

describe("infinitykeys.io/puzzles", () => {
  it("should click puzzle button and navigate to puzzle dashboard", () => {
    cy.get('[data-cy="puzzle-link"]').contains("Puzzles").click();
    cy.url().should("include", "/puzzles");
  });

  it("should go to first puzzle on puzzles page when thumbnail clicked", () => {
    cy.get('[data-cy="puzzle-link"]').contains("Puzzles").click();
    cy.url().should("include", "/puzzles");
    cy.get(".puzzle-thumb").first().click();
    cy.url().should("include", "/puzzle/");
  });

  it("go to landing page and verify input boxes", () => {
    cy.get('[data-cy="puzzle-link"]').contains("Puzzles").click();
    cy.get(".puzzle-thumb").contains("notright").click();
    cy.url().should("include", "/puzzle/notright");
    cy.get("input").should("have.length", 5);
  });

  // commented out 2022-08-01 per this PR
  // https://github.com/infinity-keys/ik-landing/pull/205
  // updating default puzzle view to 16 eliminates the Next and Previous buttons
  // not enough puzzles to generate these buttons

  //Update 2022-09-09: added test for next and previous buttons
  //per this PR https://github.com/infinity-keys/ik-landing/pull/328
  //the updated default puzzle view has enough puzzles to test next and previous button functionality

  it.only("should click on next and previous buttons", () => {
    cy.visit("/puzzles");
    cy.get("a.next").contains("Next").click();
    cy.get("a.previous").contains("Previous").click();
    cy.url().should("include", Cypress.config().baseUrl + "/puzzles");
  });
});

export {};
