//Run before each test in this context
describe("Scoreboard", () => {
    const endpoint = "/scoreboard/:place"
//Run before each test in this context
    beforeEach(() => {
//Set user as logged in
        const session = {"username": "Richard", "id": 4};
        localStorage.setItem("session", JSON.stringify(session));
//Go to the specified URL
        cy.visit("http://localhost:8080/#scoreboard");
    });

//Test: Validate scoreboard form
    it("Valid scoreboard form", () => {

        //Find the field for the username, check if it exists.
        cy.get("#places").should("exist");

        //Find the field for the password, check if it exists.
        cy.get("#tablebody").should("exist");
    });

    it ("Successful selected branch", () => {
        cy.get("#places").select("Amsterdam").should("have.value", "Amsterdam");
    });

    // it("Failed to select", () => {
    //     cy.get("#places").select("Utrecht").should("have.value", "Utrecht");
    // });

});

