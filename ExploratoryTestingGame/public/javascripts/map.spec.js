describe("map", function() {
    var helloProvider;
    beforeEach(function(done) {

        helloProvider = Pact.mockService({
            consumer: 'ExploratoryTestingGame',
            provider: 'MapMakerApi',
            port: 1234,
            done: function (error) {
                expect(error).toBe(null);
            }
        });

        helloProvider.resetSession(done);
    });

    it("should say hello", function(done) {
        helloProvider
            .given("casual")
            .uponReceiving("request for an awesome map")
            .withRequest({
                method: 'get',
                path: '/api/mapmaker',
                headers: {
                    'features': '30',
                    'bugs':'4'
                }
            })
            .willRespondWith({
                status: 200,
                body: {
                    "posY0": {
                        "posX0": {
                            "pathRight": Pact.Match.term({matcher: "^(Working|Broken)$", generate: "Working"}),
                            "pathDown": Pact.Match.term({matcher: "^(Working|Broken)$", generate: "Working"})
                        }
                    }
                }
            });

        helloProvider.run(done, function(runComplete) {
            var map = new Map(function(data) {
                expect(data).toBeDefined();
                expect(data["posY0"]["posX0"]["pathRight"]).toBe("Working");

                
                runComplete();
            });
        });
    });
});