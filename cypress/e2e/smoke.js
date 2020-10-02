describe("Smoke tests", () => {
  it("Home page: renders title", () => {
    cy.visit("/");
    cy.get("header").findByText(/hot potato!/i);
  });
  it("Home page: navigates to the recipes page", () => {
    cy.visit("/");
    cy.get("a[href*='recipes']").click();
  });
  it("Recipes page: renders title", () => {
    cy.visit("/recipes");
    cy.get("main > h1").findByText(/recipe index/i);
  });
});
