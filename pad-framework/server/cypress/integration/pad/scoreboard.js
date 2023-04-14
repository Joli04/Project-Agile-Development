describe("Scoreboard", () => {
//Run before each test in this context
    beforeEach(() => {
//Set user as logged in
        const session = {"username": "Lisa"};
        localStorage.setItem("session", JSON.stringify(session));
//Go to the specified URL
        cy.visit("http://localhost:8080/#scoreboard");
        cy.server()
    });

    it("Scoreboard", () => {
        // checking for existing nav bar
        cy.get(".nav-link").should("exist");

        // checking if the div exists
        cy.get(".col-12").should("exist");

        // checking if the div exists
        cy.get(".table-responsive-sm").should("exist")

        // checking if the table body exists
        cy.get("#tablebody").should("exist")

        // checking if the table data exists
        cy.get("td.text-center").should("exist")

        // checking if the table header exists
        cy.get("th.text-center").should("exist")
    })
    it("Filter table", () => {
        cy.get('select[id="places"]').select("none").should('have.value', 'none')
        cy.get('select[id="places"]').select("Amsterdam").should('have.value', 'Amsterdam')
        cy.get('select[id="places"]').select("Apeldoorn").should('have.value', 'Apeldoorn')
        cy.get('select[id="places"]').select("Den Haag").should('have.value', 'Den Haag')
        cy.get('select[id="places"]').select("Eindhoven").should('have.value', 'Eindhoven')
        cy.get('select[id="places"]').select("Rotterdam").should('have.value', 'Rotterdam')
        cy.get('select[id="textprize1"]').select("Utrecht").should('have.value', 'Utrecht')
    })
        //checking if the different branches have the indicated values.
});

