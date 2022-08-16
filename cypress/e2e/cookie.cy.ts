import { decodeJwt } from "jose";

beforeEach(() => {
  cy.visit("/");
});

describe("reads cookies in cypress", () => {
  it("test if cookie exist and verify/decode jwt", () => {
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
