context("Reset game", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Reset game success", () => {
    // cy.getByTestId("reset-game-button").click();
    cy.get("[data-testid=reset-game-button]");

    // cy.getByTestId("first-player-score").contains("0");
    cy.get("[data-testid=first-player-score]").contains("0");

    // cy.getByTestId("draw-score").contains("0");
    cy.get("[data-testid=draw-score]").contains("0");

    cy.get("[data-testid=second-player-score]").contains("0");
    // cy.getByTestId("second-player-score").contains("0");
  });
});
