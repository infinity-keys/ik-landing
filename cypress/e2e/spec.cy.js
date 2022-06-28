const { createPublicKey } = require("crypto");

describe("infinitykeys.io", () => {
  it("root landing page should load", () => {
    cy.visit("/");
    cy.contains("a.play", "Puzzles");
    cy.contains("What is");
    cy.contains("Infinity Keys?");
  });

  it("garbage input shows fail message on landing page", () => {
    cy.visit("/");
    cy.get(".ik-code-input").eq(0).type("g", { delay: 250 });
    cy.get(".ik-code-input").eq(1).type("a", { delay: 250 });
    cy.get(".ik-code-input").eq(2).type("r", { delay: 250 });
    cy.get(".ik-code-input").eq(3).type("b", { delay: 250 });
    cy.get(".ik-code-input").eq(4).type("a", { delay: 250 });
    cy.get(".ik-code-input").eq(5).type("g", { delay: 250 });
    cy.contains("Incorrect passcode. Try again.");
  });

  it("should navigate to blog from home page", () => {
    cy.visit("/");
    cy.get('.menu-items a[href="https://blog.infinitykeys.io"]').click();
  });

  it("should go to first puzzle on puzzles page when thumbnail clicked", () => {
    cy.visit("/");
    cy.get("a.play").contains("Puzzles").click();
    cy.url().should("include", "/puzzles");
    cy.get(".puzzle-thumb").first().click();
    cy.url().should("include", "/puzzle/");
  });
});
