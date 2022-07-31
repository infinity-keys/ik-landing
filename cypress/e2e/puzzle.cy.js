beforeEach(() => {
  cy.visit("/");
});

describe("infinitykeys.io/puzzles", () => {
  it("should click puzzle button and navigate to puzzle dashboard", () => {
    cy.get('[data-cy="puzzle-link"]').contains("Puzzles").click();
    cy.url().should("include", "/puzzles");
    cy.go("back");
  });

  it("should click hunts link and navigate to puzzle dashboard", () => {
    cy.contains("a.header-nav--link", "Hunts").click();
    cy.url().should("include", "/puzzles");
    cy.go("back");
  });

  it("should click on multiple thumbnails", () => {
    cy.get("a.header-nav--link").contains("Hunts").click();
    cy.get(".puzzle-thumb").first().click();
    cy.get(".puzzle-thumb").last().click();
    cy.go("back");
  });

  it("go to landing page and verify input boxes", () => {
    cy.get('[data-cy="puzzle-link"]').contains("Puzzles").click();
    cy.get(".puzzle-thumb").contains("notright").click();
    cy.url().should("include", "/puzzle/notright");
    cy.get("input").should("have.length", 5);
    cy.go("back");
  });

  it("go to landing page and verify input field", () => {
    cy.get('[data-cy="puzzle-link"]').contains("Puzzles").click();
    cy.get(".puzzle-thumb").contains("communitycode").click();
    cy.url().should("include", "/puzzle/communitycode");
    cy.get("input").should("have.length", 1);
    cy.go("back");
  });

  it("should click on next and previous buttons", () => {
    cy.get('[data-cy="puzzle-link"]').contains("Puzzles").click();
    cy.get("a.next").contains("Next").click();
    cy.get("a.previous").contains("Previous").click();
    cy.go("back");
  });

  it("correct input using input boxes navigates to puzzle solved page", () => {
    cy.contains("a.header-nav--link", "Hunts").click();
    cy.get(".puzzle-thumb").contains("notright").click();
    cy.get(".ik-code-input").first().wait(1000).type("wrong", { delay: 750 });
    cy.url().should("include", "/solved/notright");
  });

  it.only("incorrect input using input boxes displays fail message", () => {
    cy.contains("a.header-nav--link", "Hunts").click();
    cy.get(".puzzle-thumb").contains("notright").click();
    cy.get(".ik-code-input").first().wait(1000).type("asdfg", { delay: 750 });
    cy.contains("Sorry, that answer was correct. Try wrong this time.");
  });

  it("correct input using input field navigates to puzzle solved page", () => {
    cy.contains("a.header-nav--link", "Hunts").click();
    cy.get(".puzzle-thumb").contains("communitycode").click();
    cy.get("input").type("with kindness and respect");
    cy.url().should("include", "/solved/communitycode");
  });

  it("incorrect input using input field displays fail message", () => {
    cy.contains("a.header-nav--link", "Hunts").click();
    cy.get(".puzzle-thumb").contains("communitycode").click();
    cy.get("input").type("thiw ssendink dna tcepser");
    cy.contains("Thats not it. Need help? Join our discord");
  });
});
