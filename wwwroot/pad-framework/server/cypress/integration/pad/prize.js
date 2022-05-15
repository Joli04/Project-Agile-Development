describe("Prize", () => {
//Run before each test in this context
    beforeEach(() => {
//Set user as logged in
        const session = {"username": "test"};
        localStorage.setItem("session", JSON.stringify(session));
//Go to the specified URL
        cy.visit("http://localhost:8080/#prize");
    });

    it("Prize modal", () => {
        // checking for existing nav bar
        cy.get(".nav-link").should("exist");

        // checking for existing prize popup modal
        cy.get(".btn_prize_popup").should("exist");

        // checking if the button is clickable.
        cy.get(".btn_prize_popup").click();

        // checking if the modal is showing
        cy.get("#prize_popup").should("be.visible");

        //checking for the hover function
        cy.get("#prize1").trigger("mouseover");

        //checking whether prize img is shown
        cy.get(".popup").should("be.visible");

        //checking if close button exists
        cy.get(".close_prize_popup").should("exist");

        //checking if the button is clickable
        cy.get(".close_prize_popup").click();

        //modal should no longer be visible
        cy.get("#prize_popup").should("not.be.visible");
    })
});

