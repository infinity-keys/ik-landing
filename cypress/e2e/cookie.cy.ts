import { decodeJwt } from "jose";

beforeEach(() => {
  cy.visit("/");
  cy.get('[data-cy="puzzle-link"]').contains("Puzzles").click();
});

describe("read cookies in cypress", () => {
  it("test if cookie exist when no puzzle attempt/puzzle fail/puzzle solve", () => {
    cy.getCookie("ik-id")
      .should("have.property", "value")
      .then((cookie) => {
        if (!cookie) {
          throw new Error("no cookie");
        }
        const decoded = decodeJwt(String(cookie));
        console.log(decoded);
      });

    cy.get(".puzzle-thumb").contains("notright").click();
    cy.get(".ik-code-input").first().wait(1000).type("gnorw", { delay: 750 });
    cy.getCookie("ik-id")
      .should("have.property", "value")
      .then((cookie) => {
        if (!cookie) {
          throw new Error("no cookie");
        }
        const decoded = decodeJwt(String(cookie));
        cy.wrap(decoded.sub).as("userId");
        cy.get("@userId").should("have.property", "sub");
        cy.wrap(decoded.claims["https://infinitykeys.io"]).as("puzzleCount");
        cy.get("@puzzleCount").should("have.property", "puzzles");
      });

    cy.get(".ik-code-input").first().wait(1000).type("wrong", { delay: 750 });
    cy.getCookie("ik-id")
      .should("have.property", "value")
      .then((cookie) => {
        if (!cookie) {
          throw new Error("no cookie");
        }
        const decoded = decodeJwt(String(cookie));
        cy.wrap(decoded.sub).as("userId");
        cy.wrap(decoded.claims["https://infinitykeys.io"]).as("puzzleCount");
        cy.get("@userId").should("have.property", "sub");
        cy.get("@puzzleCount").should("have.property", "puzzles");
      });
  });
});

export {};
