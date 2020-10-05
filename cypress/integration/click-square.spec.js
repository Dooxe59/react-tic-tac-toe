context("Handle click on square", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Click on empty square", () => {
    cy.get(".square").eq(0).click();
    cy.get("@click").should("be.called");
    // cy.get(".square").eq(1).click(); // O

    // const expectedValue = cy.findByTestId("next-player-value");

    // cy.findByTestId("square0").click();

    // console.log(cy.findByTestId("square0").textContent);
    // cy.findByTestId("square0").contains(expectedValue);
  });
});
