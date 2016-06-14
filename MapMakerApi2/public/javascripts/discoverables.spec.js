describe("discoverables", function() {

    it("a new bug should be added when discovered", function() {
        new Discoverables();
        expect(Discoverables.BugsFound.length).toEqual(0);

        Discoverables.discoverBug();

        expect(Discoverables.BugsFound.length).toEqual(1);
    });

    it("When the BugList runs empty, additional bugs can still be added", function() {
        new Discoverables();
        var listLength = Discoverables.Buglist.length;
        for (var i=0;i<listLength+1;i++) {
            Discoverables.discoverBug();
        }
        expect(Discoverables.BugsFound.length).toEqual(listLength+1);
        expect(Discoverables.BugsFound[listLength]).toEqual("Undefined bug")
    });

    it("a new feature should be added when discovered", function() {
        new Discoverables();
        expect(Discoverables.FeaturesFound.length).toEqual(0);

        Discoverables.discoverFeature();

        expect(Discoverables.FeaturesFound.length).toEqual(1);
    });

    it("When the FeatureList runs empty, additional features can still be added", function() {
        new Discoverables();
        var listLength = Discoverables.FeatureList.length;
        for (var i=0;i<listLength+1;i++) {
            Discoverables.discoverFeature();
        }
        expect(Discoverables.FeaturesFound.length).toEqual(listLength+1);
        expect(Discoverables.FeaturesFound[listLength]).toEqual("Undefined feature")
    });
});