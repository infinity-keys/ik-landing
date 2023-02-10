beforeEach(() => {
  cy.visit("/");
});

describe("infinitykeys.io", () => {
  it("root landing page should load", () => {
    cy.contains("What is");
    cy.contains("Infinity Keys?");
  });

  it("wrong input shows fail message on landing page", () => {
    cy.get(".ik-code-input").first().wait(1000).type("garbag", { delay: 250 });
    cy.get('[data-cy="submit"]').contains("Submit").click();
    cy.get('[data-cy="fail_message_check"]').contains(
      "Thats not it. Need help?"
    );
  });

  it("correct input shows success message on landing page", () => {
    cy.get(".ik-code-input").first().wait(1000).type("unlock", { delay: 250 });
    cy.get('[data-cy="submit"]').contains("Submit").click();
    cy.get('[data-cy="success_message_check"]').contains("Play More");
  });

  // it("fills out business contact and submits scuccessfully", () => {
  //   cy.intercept("POST", "https://formspree.io/f/mdobjayl", {
  //     statusCode: 200,
  //     body: { next: "/thanks?language=en", ok: true },
  //   }).as("busSubmit");
  //   cy.get('[data-cy="email-partner"] input').type("test1@example.com");
  //   cy.get('[data-cy="email-partner"] button').click();
  //   cy.wait("@busSubmit").then(() => {
  //     cy.get('[data-cy="email-partner-success"]').contains(
  //       "Thank you for signing up!"
  //     );
  //   });
  // });

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
    // cypress can't access new window, so we're removing target _blank
    cy.get(".header").contains("Thesis").invoke("removeAttr", "target").click();
    cy.url().should(
      "include",
      "https://blog.infinitykeys.io/what-is-infinity-keys"
    );

    cy.visit("/");
    // cypress can't access new window, so we're removing target _blank
    cy.get(".header").contains("Blog").invoke("removeAttr", "target").click();
    cy.url().should("include", "https://blog.infinitykeys.io");

    cy.visit("/");
    cy.get(".header").contains("Play").click();
    cy.url().should("include", Cypress.config().baseUrl + "/packs");

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
