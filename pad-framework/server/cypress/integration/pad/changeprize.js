describe("Changing prizes", () => {
//Run before each test in this context
    beforeEach(() => {
//Set user as logged in
        const session = {"username": "Richard", "id": 3, "admin": 1};
        localStorage.setItem("session", JSON.stringify(session));

        cy.log(JSON.stringify(session))
        //Go to the specified URL
        cy.server()
        cy.visit("http://localhost:8080/#prize");
    });

    it("Checken of alles bestaat.", () => {
        cy.get(".nav-link").should("exist");

        cy.get("#month").should("exist");
        cy.get("#year").should("exist");

        cy.get("#prize1").should("exist");
        cy.get('#prize1').should("exist").contains(/[^A-z][^0-9]/g)

        cy.get("#prize2").should("exist");
        cy.get('#prize2').should("exist").contains(/[^A-z][^0-9]/g)

        cy.get("#prize3").should("exist");
        cy.get('#prize3').should("exist").contains(/[^A-z][^0-9]/g)

        cy.get("#prize1_monthly").should("exist");
        cy.get('#prize1_monthly').should("exist").contains(/[^A-z][^0-9]/g)

        cy.get("#prize2_monthly").should("exist");
        cy.get('#prize2_monthly').should("exist").contains(/[^A-z][^0-9]/g)

        cy.get("#prize3_monthly").should("exist");
        cy.get('#prize3_monthly').should("exist").contains(/[^A-z][^0-9]/g)

    })


    it("Invullen van juiste gegevens", () => {
        // checking for existing nav bar
        cy.get("#year").should("exist").click();
        cy.get('#textprize1').type('A new bike')
        cy.get('#textprize2').type('To the sun')
        cy.get('#textprize3').type('Dinner for four')

        cy.get('#confirm').click()

        cy.get("#month").should("exist");
    })

    it("Invullen van onjuist gegevens", () => {
        // checking for existing nav bar
        cy.get(".nav-link").should("exist");

        cy.get("#year").should("exist").click();

        cy.get('#textprize1').type(' ')
        cy.get('#confirm').should("exist").click();
        cy.on('window:alert',(txt)=>{
            //Mocha assertions
            expect(txt).to.contains("You cannot enter just a space for prize.");
        })
        cy.visit("http://localhost:8080/#prize");
    })

});

