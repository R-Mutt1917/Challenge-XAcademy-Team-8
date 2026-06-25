describe('Módulo de Navegación - XAcademy Team 8', () => {

  // Ignorar errores de hidratación de React para que no se trabe el test
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  beforeEach(() => {
    cy.visit('https://automationintesting.online/');
  });

  it('Validar el boton "Rooms"', () => {
    cy.get(':nth-child(1) > .nav-link').click();
    cy.url().should('include', '/#rooms');

    cy.get('#rooms').first().should('be.visible');
  });

  it('Validar el boton "Booking"', () => {
    cy.get(':nth-child(2) > .nav-link').click();
    cy.url().should('include', '/#booking');

    cy.get('#booking').first().should('be.visible');
  });    

  it('Validar el boton "Location"', () => {
    cy.get(':nth-child(4) > .nav-link').click();
    cy.url().should('include', '/#location');

    cy.get('#location').first().should('be.visible');
  });

  it('Validar el boton "Contact"', () => {
    cy.get(':nth-child(5) > .nav-link').click();
    cy.url().should('include', '/#contact');
    
    cy.get('#contact').first().should('be.visible');
  })

  it('Validar el boton "Admin"', () => {
    cy.get(':nth-child(6) > .nav-link').click();
    cy.url().should('include', '/admin');
  });
});