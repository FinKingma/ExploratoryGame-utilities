describe('ET game', function(){
    beforeEach(function(){
        // visit our local server running the application
        //
        // visiting before each test ensures the app
        // gets reset to a clean state
        //
        // https://on.cypress.io/api/visit
        cy.server();
        cy.route("GET","/api/mapmaker", "fixture:map.json");
        cy.visit("http://localhost:2000");
    })

    xit('should have control options', function(){
        cy.get('#controls').should('contain', 'use keyboard');
        cy.get('#controls').should('contain', 'use mouse');
    });

    xit('can select mouse', function(){
        cy.get('#controls').select('use mouse');
    });

    xit('contains a wait for it', function(){
        cy
            .clock()
            .get('#play').click()
            .get('#getReady').should('exist')
            .tick(5000)
            .get('#title').should('contain','The Exploratory Testing Game')
    });

    it('ends after the timebox has ended', function(){
        cy
            .clock()
            .get('#play').click()
            .get('#getReady').should('exist')
            .tick(5000)
            .get('#title').should('contain','The Exploratory Testing Game')
            .tick(30000)
            .get('#header').should('contain','Completed');
    });

    xit('Finishes when player reaches goal', function(){
        cy.get('#play').click();
        cy.get('#getReady').should('exist');
        cy.wait(1000);
        //cy.hover does not work 
    });
});