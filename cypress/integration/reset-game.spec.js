context("Reset game", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Reset game success", () => {
    cy.findByTestId("reset-game-button").click();

    cy.findByTestId("first-player-score").contains("0");
    cy.findByTestId("draw-score").contains("0");
    cy.findByTestId("second-player-score").contains("0");
  });
});
