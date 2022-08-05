// beforeEach(() => {
//   cy.visit("/");
// });

describe("infinitykeys.io", () => {
  it("display all cookies", () => {
    // cy.contains("a.header-nav--link", "Hunts").click();
    // cy.get(".puzzle-thumb").contains("notright").click();
    // cy.get(".ik-code-input").first().wait(1000).type("wrong", { delay: 750 });
    // cy.url().should("include", "/solved/notright");
    cy.getCookies("_ga");
  });
});
