const { createPublicKey } = require("crypto");
const { link } = require("fs");

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

  it("fills out partner contact form and submits successfully", () => {
    cy.intercept("POST", "https://formspree.io/f/mdobjay1", {
      statusCode: 200,
    });
    cy.visit("/");
    cy.get('[data-cy="email-partner"] input').type("you@me.com");
    cy.get('[data-cy="email-partner"] button').click();
    cy.get('[data-cy="email-partner-success"]').contains(
      "Thank you for signing up!"
    );
  });

  it("fills out newsletter contact form and submits successfully", () => {
    cy.intercept("POST", "https://formspree.io/f/mdobjay1", {
      statusCode: 200,
    });
    cy.visit("/");
    cy.get('[data-cy="email-newsletter"] input').type("you@me.com");
    cy.get('[data-cy="email-newsletter"] button').click();
    cy.get('[data-cy="email-newsletter-success"]').contains(
      "Thank you for signing up!"
    );
  });

  it.only("clicks on a link and directs to the expected url", () => {
    cy.visit("/");
    cy.contains("Home").click();
    cy.url().should("include", Cypress.config().baseUrl + "/");
    cy.go("back");

    cy.visit("/");
    cy.contains("Hunts").click();
    cy.url().should("include", "/puzzles");
    cy.go("back");

    cy.visit("/");
    cy.contains("Puzzles").click();
    cy.url().should("include", "/puzzles");
    cy.go("back");

    cy.visit("/");
    cy.contains("Thesis").click();
    cy.url().should(
      "include",
      "https://blog.infinitykeys.io/what-is-infinity-keys"
    );
    cy.go("back");

    cy.visit("/");
    cy.contains("Blog").click();
    cy.url().should("include", "https://blog.infinitykeys.io");
    cy.go("back");
  });
});
