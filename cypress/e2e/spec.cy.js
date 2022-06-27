describe("infinitykeys.io", () => {
  it("root landing page should load", () => {
    cy.visit("/");
    cy.contains("a.play", "Puzzles");
    cy.contains("What is");
    cy.contains("Infinity Keys?");
  });
});
