describe("Formulario de contacto - Mensaje excesivamente largo", () => {
  const longMessage = "Texto excesivamente largo. ".repeat(90);

  it("muestra una advertencia y evita el envio cuando el mensaje supera los 2000 caracteres", () => {
    cy.visit("/");

    cy.get("#name").should("be.visible").type("Gi Ferreira");
    cy.get("#email").should("be.visible").type("gi.ferreira@example.com");
    cy.get("#phone").should("be.visible").type("11234567890");
    cy.get("#subject").should("be.visible").type("Validacion de mensaje largo");

    cy.get("#description")
      .should("be.visible")
      .clear()
      .type(longMessage, { delay: 0 });

    cy.contains("button", /^submit$/i)
      .should("be.visible")
      .click();

    cy.contains(".alert", "Message must be between 20 and 2000 characters", { timeout: 10000 })
      .should("be.visible");
  });
});

describe("Navegacion superior - Rooms", () => {
  it("realiza scroll hasta la seccion Rooms al seleccionar la opcion del menu", () => {
    cy.visit("/");

    cy.get('nav a[href="/#rooms"]')
      .should("be.visible")
      .and("have.text", "Rooms")
      .click();

    cy.hash().should("eq", "#rooms");

    cy.get("#rooms")
      .should("be.visible")
      .within(() => {
        cy.contains("h2", "Our Rooms").should("be.visible");
      });

    cy.contains("#rooms h2", "Our Rooms").then(($heading) => {
      const rect = $heading[0].getBoundingClientRect();

      expect(rect.top).to.be.greaterThan(-10);
      expect(rect.top).to.be.lessThan(180);
      expect(rect.bottom).to.be.greaterThan(0);
    });
  });
});

