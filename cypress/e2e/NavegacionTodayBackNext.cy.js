Cypress.on('uncaught:exception', () => false)

describe ("Comprobar funcionamiento del calendario", () => {

    beforeEach(() => {
        cy.visit("https://automationintesting.online/")
    })

    it("Validar Navegación de Next/Today/Back", () => {

        cy.get('a[href*="/reservation/1"]').click()
        cy.contains('Next').click()
        cy.contains('Next').click()
        cy.contains('Back').click()

        cy.contains('Today').click()

    })
})
