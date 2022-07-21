beforeEach(() => {
  cy.visit("/");
});

describe("infinitykeys.io/puzzles", () => {
  it("should click puzzle button and navigate to puzzle dashboard", () => {
    cy.contains("a.play", "Puzzles").click();
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
    cy.get("a.play").contains("Puzzles").click();
    cy.get(".puzzle-thumb").contains("notright").click();
    cy.url().should("include", "/puzzle/notright");
    cy.get("input").should("have.length", 5);
    cy.go("back");
  });

  it("go to landing page and verify input field", () => {
    cy.get("a.play").contains("Puzzles").click();
    cy.get(".puzzle-thumb").contains("communitycode").click();
    cy.url().should("include", "/puzzle/communitycode");
    cy.get("input").should("have.length", 1);
    cy.go("back");
  });

  it("should click on next and previous buttons", () => {
    cy.get("a.play").contains("Puzzles").click();
    cy.get("a.next").contains("Next").click();
    cy.get("a.previous").contains("Previous").click();
  });

  it("correct input using input boxes navigates to puzzle solved page", () => {
    cy.contains("a.header-nav--link", "Hunts").click();
    cy.get(".puzzle-thumb").contains("notright").click();
    cy.get(".ik-code-input").eq(0).type("w", { delay: 250 });
    cy.get(".ik-code-input").eq(1).type("r", { delay: 250 });
    cy.get(".ik-code-input").eq(2).type("o", { delay: 250 });
    cy.get(".ik-code-input").eq(3).type("n", { delay: 250 });
    cy.get(".ik-code-input").eq(4).type("g", { delay: 250 });
    cy.url().should("include", "/solved/notright");
  });

  it("incorrect input using input boxes displays fail message", () => {
    cy.contains("a.header-nav--link", "Hunts").click();
    cy.get(".puzzle-thumb").contains("notright").click();
    cy.get(".ik-code-input").eq(0).type("a", { delay: 250 });
    cy.get(".ik-code-input").eq(1).type("s", { delay: 250 });
    cy.get(".ik-code-input").eq(2).type("d", { delay: 250 });
    cy.get(".ik-code-input").eq(3).type("f", { delay: 250 });
    cy.get(".ik-code-input").eq(4).type("h", { delay: 250 });
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
