// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('completarFormulario', () => {
    cy.fixture('usuarios').then((usuario) => {
        cy.get('[name="firstname"]').type(usuario[0].nombre);
        cy.get('[name="lastname"]').type(usuario[0].apellido);
        cy.get('[name="email"]').type(usuario[0].email);
        cy.get('[name="phone"]').type(usuario[0].telefono);
    })
})

Cypress.Commands.add('validarAPI', (codigo) => {
    if (codigo == 400) {
        cy.log('No se ha cargado ninguna reserva')
    }
    else if (codigo == 201) {
        cy.log('Reserva cargada correctamente')
    }

});