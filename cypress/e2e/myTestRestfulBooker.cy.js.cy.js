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

describe('Modulo de Contacto', () => {

  Cypress.on('uncaught:exception', () => {
    return false;
  });
  
  beforeEach(() => {
    cy.visit('https://automationintesting.online/');
    
    // Cargamos el fixture y lo guardamos en un alias llamado 'datos'
    cy.fixture('contactoData').as('datos');
  });
  
  it('Llenar formulario de contacto con datos del fixture', function () {
    // Usamos 'function ()' en el 'it' para poder acceder al alias con 'this.datos'
    
    // Llamamos al comando personalizado pasando los datos del fixture
    cy.llenarFormularioContacto(this.datos);

    // Validar la confirmación de éxito utilizando el nombre del fixture
    cy.get('.col-lg-8 > .card > .card-body > .h4')
      .should('be.visible')
      .and('contain', `Thanks for getting in touch ${this.datos.name}!`);
  });

});


