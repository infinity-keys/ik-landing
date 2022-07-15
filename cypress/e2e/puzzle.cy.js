describe("infinitykeys.io/puzzles", () => {
  it("should click puzzle button and navigate to puzzle dashboard", () => {
    cy.visit("/");
    cy.contains("a.play", "Puzzles").click();
    cy.url().should("include", "/puzzles");
  });

  it("should click hunts link and navigate to puzzle dashboard", () => {
    cy.visit("/");
    cy.contains("Hunts").click();
    cy.url().should("include", "/puzzles");
  });

  it("should click on puzzle thumbnail and navigate to puzzle landing page", () => {
    cy.visit("/");
    cy.get("a.play").contains("Puzzles").click();
    cy.url().should("include", "/puzzles");
    cy.get(".puzzle-thumb").contains("thesis").click();
    cy.url().should("include", "/puzzle");
  });

  it.only("should click on multiple thumbnails and navigate to select puzzle landing pages", () => {
    cy.visit("/");
    cy.contains("Hunts").click();
    cy.get(".puzzle-thumb").click({ multiple: true });
    cy.get(".puzzle-thumb").contains("avalanche").click();
    cy.url().should("include", "/puzzle");
  });
});
