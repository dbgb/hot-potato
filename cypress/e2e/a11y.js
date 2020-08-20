describe("Accessibility tests", () => {
  beforeEach(() => {
    cy.visit("/").get("main").injectAxe();
  });

  it("Home page: has no critical impact accessibility violations", () => {
    cy.checkA11y(null, {
      includedImpacts: ["critical"],
    });
  });
  it("Recipes page: has no critical impact accessibility violations", () => {
    cy.get("a[href*='recipes']")
      .findByText(/recipes/i)
      .click()
      .checkA11y(null, {
        includedImpacts: ["critical"],
      });
  });
});
