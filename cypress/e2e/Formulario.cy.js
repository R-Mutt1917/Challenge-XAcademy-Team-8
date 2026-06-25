Cypress.on('uncaught:exception', () => false)

describe ("Comprobar funcionamiento del calendario", () => {

    beforeEach(() => {
        cy.visit("https://automationintesting.online/")
    })

    //Los datos son Correctos pero redirige a una pantalla en negro "This page couldn’t load"
    it("Formulario con datos Validos", () => {

        cy.get('a[href*="/reservation/1"]').click()
        cy.get('#doReservation').click()


        cy.get('[name="firstname"]').type("juancho")
        cy.get('[name="lastname"]').type("pepasd")
        cy.get('[name="email"]').type("juanpepe@gmail.com")
        cy.get('[name="phone"]').type("12345678910")

        cy.contains('Reserve Now').click()

        cy.contains('Booking Confirmed').should('be.visible')
    })

})