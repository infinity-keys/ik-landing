beforeEach(() => {
  cy.visit("/");
});

describe("infinitykeys.io", () => {
  it("root landing page should load", () => {
    cy.get('[data-cy="puzzle-link"]').contains("Puzzles");
    cy.contains("What is");
    cy.contains("Infinity Keys?");
  });

  it("garbag input shows fail message on landing page", () => {
    cy.get(".ik-code-input").first().wait(1000).type("garbag", { delay: 250 });
    cy.get('[data-cy="submit"]').contains("Submit").click().wait(1000);
    cy.contains("Thats not it. Need help?");
  });

  it("should navigate to blog from home page", () => {
    cy.get('.menu-items a[href="https://blog.infinitykeys.io"]').click();
  });

  it("fills out business contact and submits scuccessfully", () => {
    cy.intercept("POST", "https://formspree.io/f/mdobjayl", {
      statusCode: 200,
      body: { next: "/thanks?language=en", ok: true },
    }).as("busSubmit");
    cy.get('[data-cy="email-partner"] input').type("test1@example.com");
    cy.get('[data-cy="email-partner"] button').click();
    cy.wait("@busSubmit").then(() => {
      cy.get('[data-cy="email-partner-success"]').contains(
        "Thank you for signing up!"
      );
    });
  });

  it("fills out newsletter contact form and submits successfully", () => {
    cy.intercept("POST", "https://formspree.io/f/xnqrqdaq", {
      statusCode: 200,
      body: { next: "/thanks?language=en", ok: true },
    }).as("parSubmit");
    cy.get('[data-cy="email-newsletter"] input').type("test2@example.com");
    cy.get('[data-cy="email-newsletter"] button').click();
    cy.wait("@parSubmit").then(() => {
      cy.get('[data-cy="email-newsletter-success"]').contains(
        "Thank you for signing up!"
      );
    });
  });

  it("clicks on nav link and directs to the expected url", () => {
    cy.get(".header").contains("Home").click();
    cy.url().should("include", Cypress.config().baseUrl + "/");

    cy.visit("/");
    cy.get(".header").contains("Collab").click();
    cy.url().should("include", Cypress.config().baseUrl + "/#collab");

    cy.visit("/");
    cy.get(".header").contains("Thesis").click();
    cy.url().should(
      "include",
      "https://blog.infinitykeys.io/what-is-infinity-keys"
    );

    cy.visit("/");
    cy.get(".header").contains("Blog").click();
    cy.url().should("include", "https://blog.infinitykeys.io");

    cy.visit("/");
    cy.get(".header").contains("Puzzles").click();
    cy.url().should("include", Cypress.config().baseUrl + "/puzzles");

    cy.visit("/");
    cy.get('[data-cy="ik logo"]').click();
    cy.url().should("include", Cypress.config().baseUrl + "/");
  });

  it("click on social icon and directs to expected url", () => {
    cy.get('[data-cy="discord"]').should(
      "have.attr",
      "href",
      "https://discord.com/invite/infinitykeys"
    );

    cy.visit("/");
    cy.get('[data-cy="twitter"]').should(
      "have.attr",
      "href",
      "https://twitter.com/InfinityKeys"
    );
  });
});

export {};
