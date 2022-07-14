describe("infinitykeys.io/puzzles", () => {
  it("should click button and navigate to puzzle dashboard", () => {
    cy.visit("/");
    cy.contains("a.play", "Puzzles").click();
    cy.url().should("include", "/puzzles");
  });

  it("should click hunts link and navigate to puzzle dashboard", () => {
    cy.visit("/");
    cy.contains("Hunts").click();
    cy.url().should("include", "/puzzles");
  });

  it.only("should click on puzzle thumbnail and navigate to puzzle landing page", () => {
    cy.visit("/");
    cy.get("a.play").contains("Puzzles").click();
    cy.url().should("include", "/puzzles");
    cy.get(".puzzle-thumb").first().click();
    // cy.get(".puzzle-thumb").first().click({ multiple: true });
    cy.url().should("include", "/puzzle");
  });
});
