import { decodeJwt } from "jose";
import { IkJwt } from "../../lib/types";
import { deleteUser } from "../../lib/fetchers";
import { makeUserToken } from "@lib/jwt";
import { IK_CLAIMS_NAMESPACE } from "@lib/constants";

// export const generateUserDeleteJWT = async (userId: string, email?: string) => {
//   return await makeUserToken(
//     {
//       claims: {
//         [IK_CLAIMS_NAMESPACE]: { puzzles: [], email },
//       },
//     },
//     userId
//   );
// };

describe("read cookies in cypress", () => {
  beforeEach(() => {
    cy.visit("/puzzle/notright");
  });

  afterEach(() => {
    cy.get("@userId").then(async (userId) => {
      console.log(userId);
      // const jwt = await generateUserDeleteJWT(userId.toString());
      // try {
      //   await deleteUser(jwt);
      //   cy.log(`user deleted ${userId}`);
      // } catch (error) {
      //   cy.log(`user deleted ${userId}`);
      // }
      // return;
    });
  });

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
