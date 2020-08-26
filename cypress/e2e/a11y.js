describe("Accessibility tests", () => {
  beforeEach(() => {
    cy.visit("/").get("main").injectAxe();
  });

  it("Home page: has no critical impact accessibility violations", () => {
    cy.checkA11y(
      null,
      {
        includedImpacts: ["critical"],
      },
      terminalLog
    );
  });
  it("Recipes page: has no critical impact accessibility violations", () => {
    cy.get("a[href*='recipes']")
      .findByText(/recipes/i)
      .click()
      .checkA11y(
        null,
        {
          includedImpacts: ["critical"],
        },
        terminalLog
      );
  });
});

function terminalLog(violations) {
  cy.task(
    "log",
    `${violations.length} accessibility violation${
      violations.length === 1 ? "" : "s"
    } ${violations.length === 1 ? "was" : "were"} detected`
  );
  // pluck specific keys to keep the table readable
  const violationData = violations.map(
    ({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      nodes: nodes.length,
    })
  );

  cy.task("log", violationData);
}
