describe("Smoke tests", () => {
  it("Home page is rendered correctly", () => {
    cy.visit("/");
    cy.get(".header").findByText(/hot potato!/i);
  });
  it("Navigates to the second page", () => {
    cy.visit("/");
    cy.findByText(/go to page 2/i).click();
    cy.findByText(/hi from the second page/i);
  });
  it("Page 2 text is rendered", () => {
    cy.visit("/page-2");
    cy.findAllByText(/page 2/i);
  });
});
