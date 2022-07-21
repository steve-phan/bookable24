/// <reference types="cypress" />

describe("Home page", () => {
  it("render logo", () => {
    cy.visit("http://localhost:8000/")
    cy.get('[data-test-id="test-Contact"]').click()
    cy.url().should("include", "/contact")
  })
})
