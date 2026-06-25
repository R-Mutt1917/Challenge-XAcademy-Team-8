Cypress.on('uncaught:exception', () => false)

describe ("Formulario de contacto", () => {

    beforeEach(() => {
        cy.visit("https://automationintesting.online/")
    })
    
        //Datos validos
    it("Completa el formulario con Datos Validos", () => {

        cy.fixture("Contacto").then((datos) => {
            
        cy.get('[id="name"]').type(datos.name)
        cy.get('[id="email"]').type(datos.email)
        cy.get('[id="phone"]').type(datos.phone)
        cy.get('[id="subject"]').type(datos.subject)
        cy.get('[id="description"]').type(datos.message)

v        

        cy.contains('Submit').click()

        cy.get('h3').should('contain.text', "Thanks for getting in touch")

        })

    })

        //Advertencia cuando el mensaje supera los 2000 caracteres
    it("Poner mas de 2000 caracteres en Message", () => {


        cy.fixture("Contacto").then((datos) => {

        cy.get('[id="name"]').type(datos.name)
        cy.get('[id="email"]').type(datos.email)
        cy.get('[id="phone"]').type(datos.phone)
        cy.get('[id="subject"]').type(datos.subject)

        //Genera un mensaje de 2026 caracteres para validar el límite de 2000
        cy.get('[id="description"]').type('A'.repeat(2026))

        cy.contains('Submit').click()

        //verificar advertencia
        cy.get('p').should('contain.text', "Message must be between 20 and 2000 characters.")

        })
    })

        //Datos invalidos
    it("Completa el formulario con Datos Invalidos", () => {

        cy.fixture("contactoInvalido").then((datos) => {

        cy.get('[id="name"]').type(datos.name)
        cy.get('[id="email"]').type(datos.email)
        cy.get('[id="phone"]').type(datos.phone)
        cy.get('[id="subject"]').type(datos.subject)
        cy.get('[id="description"]').type(datos.message)

        cy.contains('Submit').click()

        cy.contains('must be a well-formed email address').should('be.visible')
        cy.contains('Phone must be between 11 and 21 characters.').should('be.visible')
        cy.contains('Message must be between 20 and 2000 characters.').should('be.visible')


        })
    })
})