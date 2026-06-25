Cypress.on('uncaught:exception', () => false)

describe('Modulo de Reservas', () => {

    beforeEach(() => {
        cy.intercept('POST', '**/api/booking').as('reservaAPI')
        cy.visit('https://automationintesting.online/')
    })

    it('Reserva exitosa como usuario invitado', () => {
        cy.get(':nth-child(1) > .card > .card-footer > .btn').click();
        cy.url().should('include', '/reservation/1?checkin=');
        cy.get('#doReservation').click();

        cy.completarFormulario();

        cy.get('.btn-primary').click();
        cy.contains('Booking Confirmed', { timeout: 15000 }).should('be.visible');

    })

    it('Cargar reserva sin completar ningún campo', () => {

        cy.get(':nth-child(1) > .card > .card-footer > .btn').click();
        cy.url().should('include', '/reservation/1?checkin=');
        cy.get('#doReservation').click();
        cy.get('.btn-primary').click();

        cy.get('.alert').should('be.visible');
        cy.wait('@reservaAPI').then((interception) => {
            cy.validarAPI(interception.response.statusCode);
        });
    })
})

