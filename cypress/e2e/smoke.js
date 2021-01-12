describe("Home page: smoke tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Renders the header title", () => {
    cy.get("header").findByText(/hot potato!/i);
  });
});

describe("Recipe index: smoke tests", () => {
  it("Renders the header title", () => {
    cy.visit("/recipes");
    cy.get("main > h1").findByText(/recipe index/i);
  });
});
