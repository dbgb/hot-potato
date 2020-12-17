describe("Home page: smoke tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Renders the header title", () => {
    cy.get("header").findByText(/hot potato!/i);
  });

  it("Navigates to the recipes page", () => {
    cy.get("a[href*='recipes']").click();
  });
});

describe("Recipe index: smoke tests", () => {
  it("Renders the header title", () => {
    cy.visit("/recipes");
    cy.get("main > h1").findByText(/recipe index/i);
  });
});
