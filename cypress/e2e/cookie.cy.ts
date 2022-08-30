import { deleteUser } from "@lib/fetchers";
import { generateUserDeleteUrl } from "@lib/utils";
import { use } from "chai";
import { decodeJwt } from "jose";
import { IkJwt } from "../../lib/types";

beforeEach(() => {
  cy.visit("/puzzle/notright");
});

afterEach(async () => {
  cy.get("ourUserId");

  const jwt = await generateUserDeleteUrl(cy.get("ourUserId").toString());

  await deleteUser({ uid: cy.get("ourUserId").toString(), jwt });
});

describe("read cookies in cypress", () => {
  let userId: string | undefined;
  let puzzlesClaims: string[];

  it("claims start empty, puzzle solve adds claim. user stays consistent through session", () => {
    cy.getCookie("ik-id")
      .should("have.property", "value")
      .then((cookie) => {
        if (!cookie) {
          throw new Error("no cookie");
        }
        const ikDecoded = decodeJwt(String(cookie)) as unknown as IkJwt;
        userId = ikDecoded.sub;
        puzzlesClaims = ikDecoded.claims["https://infinitykeys.io"].puzzles;

        expect(userId).to.be.a("string");
        expect(puzzlesClaims).to.be.empty;
      });

    cy.get(".ik-code-input").first().wait(1000).type("gnorw", { delay: 750 });
    cy.getCookie("ik-id")
      .should("have.property", "value")
      .then((cookie) => {
        if (!cookie) {
          throw new Error("no cookie");
        }
        const ikDecoded = decodeJwt(String(cookie)) as unknown as IkJwt;
        expect(ikDecoded.sub).equals(userId);
        expect(puzzlesClaims).to.be.empty;
      });

    cy.get(".ik-code-input").first().wait(1000).type("wrong", { delay: 750 });
    cy.getCookie("ik-id")
      .should("have.property", "value")
      .then((cookie) => {
        if (!cookie) {
          throw new Error("no cookie");
        }
        const ikDecoded = decodeJwt(String(cookie)) as unknown as IkJwt;
        puzzlesClaims = ikDecoded.claims["https://infinitykeys.io"].puzzles;
        expect(ikDecoded.sub).equals(userId);
        expect(puzzlesClaims).to.include("notright");
      });
  });
});

export {};
