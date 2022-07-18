describe("infinitykeys.io/puzzles", () => {
  it("should click puzzle button and navigate to puzzle dashboard", () => {
    cy.visit("/");
    cy.contains("a.play", "Puzzles").click();
    cy.url().should("include", Cypress.config().baseUrl + "/puzzles");
  });

  it("should click hunts link and navigate to puzzle dashboard", () => {
    cy.visit("/");
    cy.contains("Hunts").click();
    cy.url().should("include", Cypress.config().baseUrl + "/puzzles");
  });

  it("should click on puzzle thumbnail and navigate to puzzle landing page", () => {
    cy.visit("/");
    cy.get("a.play").contains("Puzzles").click();
    cy.url().should("include", "/puzzles");
    cy.get(".puzzle-thumb").contains("thesis").click();
    cy.url().should("include", Cypress.config().baseUrl + "/puzzle");
  });

  it("should click on multiple thumbnails", () => {
    cy.visit("/");
    cy.contains("Hunts").click();
    cy.get(".puzzle-thumb").click({ multiple: true });
    cy.go("back");
  });

  it("go to landing page and verify input boxes", () => {
    cy.visit("/");
    cy.get("a.play").contains("Puzzles").click();
    cy.get(".puzzle-thumb").contains("notright").click();
    cy.url().should("include", "/puzzle/notright");
    cy.get("input").should("have.length", 5);
  });

  it("go to landing page and verify input field", () => {
    cy.visit("/");
    cy.get("a.play").contains("Puzzles").click();
    cy.get(".puzzle-thumb").contains("communitycode").click();
    cy.url().should("include", "/puzzle/communitycode");
    cy.get("input").should("have.length", 1);
  });
});
