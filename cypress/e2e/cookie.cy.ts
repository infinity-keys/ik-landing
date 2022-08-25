import { decodeJwt } from "jose";
import { IkJwt } from "../../lib/types";

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
        const ikDecoded = decodeJwt(String(cookie)) as unknown as IkJwt;
        cy.wrap(ikDecoded.sub).as("userId");
        cy.get("@userId").should("have.property", "sub");
        cy.wrap(ikDecoded.claims["https://infinitykeys.io"]).as("claims");
        cy.get("@claims").should("have.property", "puzzles");
      });

    cy.get(".puzzle-thumb").contains("notright").click();
    cy.get(".ik-code-input").first().wait(1000).type("gnorw", { delay: 750 });
    cy.getCookie("ik-id")
      .should("have.property", "value")
      .then((cookie) => {
        if (!cookie) {
          throw new Error("no cookie");
        }
        const ikDecoded = decodeJwt(String(cookie)) as unknown as IkJwt;
        cy.wrap(ikDecoded.sub).as("userId");
        cy.get("@userId").should("have.property", "sub");
        cy.wrap(ikDecoded.claims["https://infinitykeys.io"]).as("claims");
        cy.get("@claims").should("have.property", "puzzles");
      });

    cy.get(".ik-code-input").first().wait(1000).type("wrong", { delay: 750 });
    cy.getCookie("ik-id")
      .should("have.property", "value")
      .then((cookie) => {
        if (!cookie) {
          throw new Error("no cookie");
        }
        const ikDecoded = decodeJwt(String(cookie)) as unknown as IkJwt;
        cy.wrap(ikDecoded.sub).as("userId");
        cy.get("@userId").should("have.property", "sub");
        cy.wrap(ikDecoded.claims["https://infinitykeys.io"]).as("claims");
        cy.get("@claims").should("have.property", "puzzles");
      });
  });
});

export {};
