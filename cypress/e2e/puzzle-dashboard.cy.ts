// TO DO //

// Add tests for puzzles and packs when
// global wallet PR is merged:
// https://github.com/infinity-keys/ik-landing/pull/262

beforeEach(() => {
  cy.visit("/");
});

// describe("infinitykeys.io/puzzles", () => {
//   it("should click puzzle button and navigate to puzzle dashboard", () => {
//     cy.get('[data-cy="puzzle-link"]').contains("Puzzles").click();
//     cy.url().should("include", "/puzzles");
//   });

//   it("should go to first puzzle on puzzles page when thumbnail clicked", () => {
//     cy.get('[data-cy="puzzle-link"]').contains("Puzzles").click();
//     cy.url().should("include", "/puzzles");
//     cy.get(".puzzle-thumb").first().click();
//     cy.url().should("include", "/puzzle/");
//   });

//   it("go to landing page and verify input boxes", () => {
//     // @TODO: remove this when notright is public
//     cy.visit("/puzzle/notright");
//     // cy.get('[data-cy="puzzle-link"]').contains("Puzzles").click();
//     // cy.get(".puzzle-thumb").contains("notright").click();
//     // cy.url().should("include", "/puzzle/notright");
//     cy.get("input").should("have.length", 5);
//   });

//   // Update 2022-09-28: will update this test to check for content change at later date
//   it.only("should click on next and previous buttons", () => {
//     cy.visit("/puzzles");
//     cy.get("a.next").contains("Next").click();
//     cy.get("a.previous").contains("Previous").click();
//     cy.url().should("include", Cypress.config().baseUrl + "/puzzles");
//   });
// });

export {};
