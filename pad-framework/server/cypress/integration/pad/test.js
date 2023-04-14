describe("Transport", () => {
//Run before each test in this context
    beforeEach(() => {
//Set user as logged in
        const session = {"username": "Vincent"};
        localStorage.setItem("session", JSON.stringify(session));

        const today = new Date().toLocaleDateString();

        // create mocked response for get request
        const mockedResponseGetUserTransport = {
            id_user_transport: 3,
            id_user: 7,
            transport_date: today,
        }
        // endpoint GET for user_transport
        const endPointGetUserTransport = "/user_transport";

        cy.intercept("GET", endPointGetUserTransport, {
            statusCode: 200,
            body: mockedResponseGetUserTransport,
        }).as("getUserTransport")

        const mockedResponseGetTransport = {
            id_transport: 1,
            transport_name: "car",
            image_link: "https://images.ctfassets.net/wmdwnw6l5vg5/71jz89dFBIdA9KHrLh8T0h/c4c0a817afe77c35ff5a1461f052b03f/economy.png",
            point: 1
        }

        const endPointTransport = "/transport";

        cy.intercept("GET", endPointTransport, {
            statusCode: 200,
            body: mockedResponseGetTransport,
        })
    });

    it("Transport modal UI", () => {
        // go to the specified url
        cy.visit("http://localhost:8080/#transport");

        //checking for existing nav bar
        cy.get(".nav-link").should("exist");

        // checking for existing transport card
        cy.get('.transport_card').should("exist");

        // checking for existing prize popup modal
        cy.get(".btn_transport_popup").should("exist");

        // checking if the button is clickable.
        cy.get(".btn_transport_popup").click();

        // checking if the modal is showing
        cy.get("#vehiclePopup").should("be.visible");

        // check if both buttons exists
        cy.get(".btn-success").should("exist");
        cy.get(".btn-danger").should("exist");
        // cy.get(".btn-danger").click();

        //checking if both buttons are visible
        cy.get(".btn-danger").should("be.visible");
        cy.get(".btn-success").should("be.visible");

        // check if the cycling button exists and is visible
        cy.get('.cycling-button').should('exist');
        cy.get('.cycling-button').should('be.visible');

        // click the cycling button
        console.log(cy.get(".cycling-button"));
        cy.get('.cycling-button').click();

        // after clicking an specific image should appear
        cy.get('.bike-img').should('be.visible');

        // click the cancel button
        // cy.get('.btn-danger').click();

        // after clicking the image shouldn't be visible anymore
        // cy.get('.bike-img').should('not.be.visible');
    });
    it("transport good", () => {

        // creating mocked response for put request
        const mockedResponsePut = {
            id_user_transport: 1,
            id_user: 4,
            transport_date: "07/14/2022",
        }
        // creating endpoint PUT for user_transport
        const endpointPut = `/user_transport/${mockedResponsePut.id_user_transport}`;

        // intercept put
        cy.intercept("PUT", endpointPut, {
            statuscode: 200,
            body: mockedResponsePut,
        }).as("userTransportPUT")

        // check if the confirm button exists and if it's visible
        cy.get(".btn-success").should("exist")
        cy.get(".btn-success").should("be.visible")

        // cycling button visible and click it
        cy.get('.cycling-button').should('be.visible');
        cy.get('.cycling-button').click();

        // click the confirm button
        cy.get('.btn-success').click();

        // cy.wait("@userTransportPUT")

        // the response
        cy.get("@userTransportPUT").should(t => {
            const body = mockedResponsePut;
            expect(body.transport_date).equals("07/14/2022");
            expect(body.id_user).equals(4);
        })
    })

    // it("Transport bad", () => {
    //
    // })

})
