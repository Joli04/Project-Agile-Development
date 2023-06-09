describe("Transport", () => {
//Run before each test in this context
    beforeEach(() => {
//Set user as logged in
        const session = {"username": "test"};
        localStorage.setItem("session", JSON.stringify(session));
//Go to the specified URL
//         cy.intercept('/transport');
        cy.intercept('/navbar');
        cy.visit("http://localhost:8080/#transport");
    });

    it("Transport modal", () => {
        // checking for existing nav bar
        cy.get(".nav-link").should("exist");

        // checking for existing prize popup modal
        cy.get(".btn_transport_popup").should("exist");

        // checking if the button is clickable.
        cy.get(".btn_transport_popup").click();

        // checking if the modal is showing
        cy.get("#vehiclePopup").should("be.visible");

        cy.get(".btn-danger").should("be.visible");

        cy.get(".btn-success").should("be.visible");

        cy.intercept('/user_transport1');
        cy.intercept('PUT', '/user_transport1/id_user_transport', {
            statusCode: 200,
        }).as('login');
        cy.visit("http://localhost:8080/#user_transport1/5")

        cy.get(".btn-success").should("exist");


        cy.get(".btn-danger").click();

        cy.get(".errorMsg").should("be.visible")

        // cy.get(".errorMsg").should("be.visible");
        //
        // cy.get(".car-button").click();
        //
        // cy.visit("http://localhost:8080/#transport");
        //
        // cy.get(".btn-success").click();


        // cy.get(".alert").should("be.visible");
        // cy.get("")





//CY.INTERCEPT  voor elk endpoint.

        //checking for the hover function
        // cy.get("#prize1").trigger("mouseover");
        //
        // //checking whether prize img is shown
        // cy.get(".popup").should("be.visible");
        //
        // //checking if close button exists
        // cy.get(".close_prize_popup").should("exist");
        //
        // //checking if the button is clickable
        // cy.get(".close_prize_popup").click();
        //
        // //modal should no longer be visible
        // cy.get("#prize_popup").should("not.be.visible");
    })
});

