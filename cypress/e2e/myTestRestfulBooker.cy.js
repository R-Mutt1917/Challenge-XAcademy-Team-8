// Configuración global: Evita que el test falle por errores internos de la propia aplicación web (Shady Meadows)
Cypress.on('uncaught:exception', () => {
    // Retornamos false para que Cypress ignore las excepciones no controladas de la app
    return false;
});

describe('Challenge Cohorte I - 2026: Sistema de Reservas & Contacto', () => {

    // =========================================================================
    // MÓDULO DE RESERVAS
    // =========================================================================
    describe('Módulo de Reservas', () => {

        beforeEach(() => {
            // Interceptamos la llamada de red POST que va a la API de reservas para validar el backend
            cy.intercept('POST', '**/api/booking').as('reservaAPI');
            // Navegamos a la URL base antes de cada caso de prueba garantizando independencia
            cy.visit('https://automationintesting.online/');
        });

        it('Caso 28 - Reserva exitosa como usuario invitado', () => {
            // Usamos cy.contains en lugar de selectores css indexados (nth-child) para evitar que falle si cambia el orden
            cy.contains('Book this room').click();
            
            // Asertamos que la URL cambie correctamente incorporando parámetros de reserva
            cy.url().should('include', '/reservation/1?checkin=');
            
            // Abrimos el bloque del formulario
            cy.get('#doReservation').click();

            // Comando personalizado de soporte para completar los campos obligatorios
            cy.completarFormulario();

            // Confirmamos el envío de la reserva
            cy.get('.btn-primary').click();
            
            // Aserción de UI: Esperamos hasta 15 segundos que impacte en la pantalla el mensaje de confirmación exitosa
            cy.contains('Booking Confirmed', { timeout: 15000 }).should('be.visible');
        });

        it('Caso 29 - Cargar reserva sin completar ningún campo', () => {
            // Abrimos el formulario de reserva de la primera habitación
            cy.contains('Book this room').click();
            cy.url().should('include', '/reservation/1?checkin=');
            cy.get('#doReservation').click();
            
            // Intentamos enviar el formulario completamente vacío para forzar las validaciones
            cy.get('.btn-primary').click();

            // Aserción de UI: Validamos que se muestre visible el bloque de alertas rojas
            cy.get('.alert').should('be.visible');
            
            // Aserción de API: Esperamos que responda la red interceptada y validamos su Status Code mediante un comando personalizado
            cy.wait('@reservaAPI').then((interception) => {
                // Evaluamos que devuelva el código de error correspondiente (ej: 400 Bad Request o 409 Conflict)
                cy.validarAPI(interception.response.statusCode);
            });
        });
    });

    // =========================================================================
    // MÓDULO DE CONTACTO
    // =========================================================================
    describe('Módulo de Contacto', () => {
        
        beforeEach(() => {
            // Navegamos a la sección principal donde se ubica el formulario inferior de contacto
            cy.visit('https://automationintesting.online/');
            
            // Cargamos el archivo fixture externo (contactoData.json) para no dejar datos quemados en el código
            cy.fixture('contactoData').as('datos');
        });
        
        // Usamos la estructura tradicional de 'function ()' para que Cypress maneje correctamente el contexto de 'this.datos'
        it('Caso 3.3 - Llenar formulario de contacto con datos del fixture', function () {
            
            // Ejecutamos el comando personalizado inyectándole el objeto cargado desde el fixture
            cy.llenarFormularioContacto(this.datos);

            // Aserción dinámica de UI: Validamos que aparezca el mensaje de éxito estructurado con el nombre del JSON
            cy.get('.col-lg-8 > .card > .card-body > .h4')
              .should('be.visible')
              .and('contain', `Thanks for getting in touch ${this.datos.name}!`);
        });
    });
});