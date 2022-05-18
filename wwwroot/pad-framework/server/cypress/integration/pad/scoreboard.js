describe("Scoreboard", () => {
//Run before each test in this context
    beforeEach(() => {
//Set user as logged in
        const session = {"username": "test"};
        localStorage.setItem("session", JSON.stringify(session));
//Go to the specified URL
        cy.visit("http://localhost:8080/#scoreboard");
    });

    it("Scoreboard", () => {
        //checking if the different branches have the indicated values.
        cy.get('select[id="places"]').select("Geen").should('have.value', 'Geen')
        cy.get('select[id="places"]').select("Amsterdam").should('have.value', 'Amsterdam')
        cy.get('select[id="places"]').select("Apeldoorn").should('have.value', 'Apeldoorn')
        cy.get('select[id="places"]').select("Den Haag").should('have.value', 'Den Haag')
        cy.get('select[id="places"]').select("Eindhoven").should('have.value', 'Eindhoven')
        cy.get('select[id="places"]').select("Rotterdam").should('have.value', 'Rotterdam')
        cy.get('select[id="places"]').select("Utrecht").should('have.value', 'Utrecht')
    })
});

