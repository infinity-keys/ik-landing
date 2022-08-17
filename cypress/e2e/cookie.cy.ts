import { decodeJwt } from "jose";

beforeEach(() => {
  cy.visit("/");
});

describe("reads cookies in cypress", () => {
  it.only("test if cookie exist and verify/decode jwt", () => {
    cy.getCookie("ik-id")
      .should("have.property", "value")
      .then((cookie) => {
        console.log(cookie);
        //console.log(process.env.NODE_ENV);
        if (!cookie) {
          throw new Error("no cookie");
        }
        const decoded = decodeJwt(String(cookie));
        console.log(decoded);
      });
  });

  it("test if cookie exist when no puzzle attempt/puzzle fail/puzzle solve", () => {
    cy.visit("/");
    cy.get('[data-cy="puzzle-link"]').contains("Puzzles").click();
    cy.getCookie("ik-id")
      .should("have.property", "value")
      .then((cookie) => {
        console.log(cookie);
        console.log(process.env.NODE_ENV);
        if (!cookie) {
          throw new Error("no cookie");
        }
        const decoded = decodeJwt(String(cookie));
        console.log(decoded);
      });

    cy.visit("/");
    cy.get('[data-cy="puzzle-link"]').contains("Puzzles").click();
    cy.get(".puzzle-thumb").contains("notright").click();
    cy.get(".ik-code-input").first().wait(1000).type("gnorw", { delay: 750 });
    cy.wait(4000);
    cy.getCookie("ik-id")
      .should("have.property", "value")
      .then((cookie) => {
        console.log(cookie);
        console.log(process.env.NODE_ENV);
        if (!cookie) {
          throw new Error("no cookie");
        }
        const decoded = decodeJwt(String(cookie));
        console.log(decoded);
      });

    cy.visit("/");
    cy.get('[data-cy="puzzle-link"]').contains("Puzzles").click();
    cy.get(".puzzle-thumb").contains("notright").click();
    cy.get(".ik-code-input").first().wait(1000).type("wrong", { delay: 750 });
    cy.wait(4000);
    cy.getCookie("ik-id")
      .should("have.property", "value")
      .then((cookie) => {
        console.log(cookie);
        console.log(process.env.NODE_ENV);
        if (!cookie) {
          throw new Error("no cookie");
        }
        const decoded = decodeJwt(String(cookie));
        console.log(decoded);
      });
  });
});

export {};
