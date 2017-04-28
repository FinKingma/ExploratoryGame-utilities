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

    it('should have control options', function(){
        cy.get('#controls').should('contain', 'use keyboard');
        cy.get('#controls').should('contain', 'use mouse');
    });

    it('can select mouse', function(){
        cy.get('#controls').select('use mouse');
    });

    it('contains a wait for it', function(){
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
            .tick(1000)
            .get('#title').should('contain','The Exploratory Testing Game')
            .tick(31000)
            .get('#header').should('contain','Completed');
    });

    xit('Finishes when player reaches goal', function(){
        //while previous scenario doesn't work due to the lack of control over time-events, don't try to fix this.

        cy
            .clock()
            .get('#play').click()
            .get('#getReady').should('exist')
            .tick(5000)
            .get('#title').should('contain','The Exploratory Testing Game');

            cy.tick(1000);
        cy.document().then(function(document) {
            var keyboardEvent = document.createEvent("KeyboardEvent");
            var initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? "initKeyboardEvent" : "initKeyEvent";


            keyboardEvent[initMethod](
                            "keydown", // event type : keydown, keyup, keypress
                                true, // bubbles
                                true, // cancelable
                                window, // viewArg: should be window
                                false, // ctrlKeyArg
                                false, // altKeyArg
                                false, // shiftKeyArg
                                false, // metaKeyArg
                                38, // keyCodeArg : unsigned long the virtual key code, else 0
                                0 // charCodeArgs : unsigned long the Unicode character associated with the depressed key, else 0
            );
            //down = 40
            //up = 38
            //left = 37
            //right = 39
            document.dispatchEvent(keyboardEvent);
        });
        cy.tick(1000);
        cy.document().then(function(document) {
            var keyboardEvent = document.createEvent("KeyboardEvent");
            var initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? "initKeyboardEvent" : "initKeyEvent";


            keyboardEvent[initMethod](
                            "keydown", // event type : keydown, keyup, keypress
                                true, // bubbles
                                true, // cancelable
                                window, // viewArg: should be window
                                false, // ctrlKeyArg
                                false, // altKeyArg
                                false, // shiftKeyArg
                                false, // metaKeyArg
                                37, // keyCodeArg : unsigned long the virtual key code, else 0
                                0 // charCodeArgs : unsigned long the Unicode character associated with the depressed key, else 0
            );
            //down = 40
            //up = 38
            //left = 37
            //right = 39
            document.dispatchEvent(keyboardEvent);
        });
        cy.tick(2000);
        cy.get('#header').should('contain','Completed');
        
        //cy.hover does not work 
    });
});