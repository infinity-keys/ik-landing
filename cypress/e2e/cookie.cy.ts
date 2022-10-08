import { decodeJwt } from "jose";
import { IkJwt } from "../../lib/types";
import { deleteUser } from "../../lib/fetchers";
import { gqlApiSdk } from "@lib/server";

describe("read cookies in cypress", () => {
  beforeEach(() => {
    cy.visit("/puzzle/notright");
  });

  // Update 9/30/2022: code stub to delete test users, ran into HMAC error,
  // will work on cleaning up tests users at a later time

  // afterEach(() => {
  //   cy.get("@userJwt").then(async (userJwt) => {
  //     console.log(userJwt);
  //     try {
  //       const gql = await gqlApiSdk();
  //       const ikDecoded = decodeJwt(String(userJwt)) as unknown as IkJwt;
  //       const userId = ikDecoded.sub;
  //       console.log(userId);
  //       const user = await gql.UserExist({ userId });
  //       console.log(user);
  //       if (user.users_by_pk?.user_id) {
  //         await deleteUser(userJwt.toString());
  //         cy.log(`user deleted ${userJwt}`);
  //       }
  //     } catch (error) {
  //       cy.log(`user not deleted ${userJwt}, ${error}`);
  //     }
  //   });
  // });

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

        cy.wrap(userId).as("userId");
        cy.wrap(String(cookie)).as("userJwt");

        puzzlesClaims = ikDecoded.claims["https://infinitykeys.io"].puzzles;

        expect(userId).to.be.a("string");
        expect(puzzlesClaims).to.be.empty;
      });

    cy.get(".ik-code-input").first().wait(1000).type("gnorw", { delay: 750 });
    cy.get('[data-cy="submit"]').contains("Submit").click().wait(1000);
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
    cy.get('[data-cy="submit"]').contains("Submit").click().wait(1000);
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
