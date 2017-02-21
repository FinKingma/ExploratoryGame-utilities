describe("discoverables", function() {

    it("a new bug should be added when discovered", function() {
        new Discoverables();
        new Scorecard(.3, 30);
        expect(Discoverables.BugsFound.length).toEqual(0);

        Discoverables.discoverBug(Scorecard);

        expect(Discoverables.BugsFound.length).toEqual(1);
    });

    it("When the BugList runs empty, additional bugs can still be added", function() {
        new Discoverables();
        new Scorecard(.3, 30);
        var listLength = Discoverables.Buglist.length;
        for (var i=0;i<listLength+1;i++) {
            Discoverables.discoverBug(Scorecard);
        }
        expect(Discoverables.BugsFound.length).toEqual(listLength+1);
        expect(Discoverables.BugsFound[listLength]).toEqual({name: "Undefined bug.", points: 120 })
    });

    it("a new feature should be added when discovered", function() {
        new Discoverables();
        new Scorecard(.3, 30);
        expect(Discoverables.FeaturesFound.length).toEqual(0);

        Discoverables.discoverFeature(Scorecard);

        expect(Discoverables.FeaturesFound.length).toEqual(1);
    });

    it("When the FeatureList runs empty, additional features can still be added", function() {
        new Discoverables();
        new Scorecard(.3, 30);
        var listLength = Discoverables.FeatureList.length;
        for (var i=0;i<listLength+1;i++) {
            Discoverables.discoverFeature(Scorecard);
        }
        expect(Discoverables.FeaturesFound.length).toEqual(listLength+1);
        expect(Discoverables.FeaturesFound[listLength]).toEqual({name: "Undefined feature.", points: 70 })
    });
});