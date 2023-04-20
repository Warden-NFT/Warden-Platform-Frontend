export {} // add this line to make the file a module

describe("reCAPTCHA popup", () => {
  beforeEach(() => {
    cy.intercept("GET", "/user", {})
  })

  it("should show the reCAPTCHA popup when the user tries to log in", () => {
    // Arrange
    cy.visit("http://127.0.0.1:3000/auth/login")

    // Act
    cy.get("input[name=phoneNumber]").type("0900000000")
    cy.get("input[name=password]").type("test")
    cy.get("button[type=submit]").click()

    cy.wait(2000)

    // Assert
    // check that there's an iframe with title="reCAPTCHA" shown
    cy.get("iframe[title='reCAPTCHA']").should("be.visible")
  })

  it("should show the reCAPTCHA popup when the user tries to sign up", () => {
    // Arrange
    cy.visit("http://127.0.0.1:3000/auth/register")

    // Act
    cy.get("button[value=Customer").click()
    cy.get("input[name=firstName").type("Test")
    cy.get("input[name=lastName").type("Test")
    cy.get("input[name=email").type("Test")
    cy.get("input[name=phoneNumber").type("0900000000")
    cy.get("input[name=password").type("Test")
    cy.get("input[name=repeatPassword").type("Test")
    cy.get("button[type=submit]").click()

    cy.wait(2000)

    // Assert
    // check that there's an iframe with title="reCAPTCHA" shown
    cy.get("iframe[title='reCAPTCHA']").should("be.visible")
  })

  it("should show the reCAPTCHA popup when the user tries to buy a ticket", () => {
    // Arrange

    // set the cookie
    cy.setCookie(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDM4NDQ0NzY1ZGI4ZDc0ZTE0ZWY0YWUiLCJyb2xlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2ODE5Nzc3NjQsImV4cCI6MTY4NDU2OTc2NH0.LUHpARc3pcx2H7qNuF33Ab7b0v1abWUDEgpiabB7CPc"
    )
    cy.intercept("GET", "/user", (req) => {
      req.reply({
        fixture: "user/userFixtures.json"
      })
    }).as("getUser")

    cy.visit(
      "http://127.0.0.1:3000/marketplace/640d8d27ed4becff87d7f300/64380c6bbf3c27a785ded562/64380cccbf3c27a785dedc6f"
    )

    cy.wait("@getUser")

    cy.intercept("GET", "/smart-contract/abi", {
      fixture: "smartContract/abi.json"
    })
    cy.intercept("GET", "/smart-contract/bytecode", {
      fixture: "smartContract/bytecode.json"
    })
    cy.intercept(
      "GET",
      "/ticket/quota/check?address=0x45Fb4CcBC9975b07b96d91047ddd06c38E0e8878&ticketCollectionId=64380cccbf3c27a785dedc4b&ticketType=general",
      {
        fixture: "quota/checkQuota.json"
      }
    )

    cy.get("button[data-testid=rk-connect-button").click()
    cy.get("button[data-testid=rk-wallet-option-metaMask").click()
    cy.get("button[data-testid=purchase-ticket-button", {
      timeout: 30000
    }).click()

    cy.wait(2000)

    // Assert
    // check that there's an iframe with title="reCAPTCHA" shown, allow timeout of 30 seconds
    cy.get("iframe[title='reCAPTCHA']", { timeout: 30000 }).should("be.visible")
  })

  it.only("should show the reCAPTCHA popup when the user tries to sell a ticket", () => {
    // Arrange

    // set the cookie
    cy.setCookie(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDM4NDQ0NzY1ZGI4ZDc0ZTE0ZWY0YWUiLCJyb2xlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2ODE5Nzc3NjQsImV4cCI6MTY4NDU2OTc2NH0.LUHpARc3pcx2H7qNuF33Ab7b0v1abWUDEgpiabB7CPc"
    )
    cy.intercept("GET", "/user", (req) => {
      req.reply({
        fixture: "user/userFixtures.json"
      })
    }).as("getUser")

    // Act

    cy.visit("http://127.0.0.1:3000/me/64410a6575a1a2113e05ceaa")

    cy.wait("@getUser")

    cy.get("button[data-testid=rk-connect-button").click()
    cy.get("button[data-testid=rk-wallet-option-metaMask").click({
      timeout: 30000
    })

    cy.contains("Sell it here!", { timeout: 30000 }).click({ timeout: 30000 })

    // click the first input with type radio
    cy.get("input[type=radio]", { timeout: 30000 })
      .first()
      .click({ timeout: 30000 })

    // click the button that contains "Next"
    cy.contains("Next").click()

    // click the button that contains "Verify"
    cy.contains("Verify").click()

    cy.wait(2000)

    // Assert
    // check that there's an iframe with title="reCAPTCHA" shown, allow timeout of 30 seconds
    cy.get("iframe[title='reCAPTCHA']", { timeout: 30000 }).should("be.visible")
  })
})
