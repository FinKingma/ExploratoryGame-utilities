describe("timebox", function() {

    it("ticks after each second", function() {
        this.clock = new sinon.useFakeTimers();
        timeboxSeconds = 30;
        new timebox(timeboxSeconds, function(currentTimebox, totalTimebox) {
            timeboxSeconds = currentTimebox;
        }, function() {
            ///
        });
        expect(timeboxSeconds).toEqual(30);
        this.clock.tick(1000);
        expect(timeboxSeconds).toEqual(29);
    });

    it("ends after timebox has expired", function() {
        this.clock = new sinon.useFakeTimers();
        timeboxSeconds = 30;
        new timebox(timeboxSeconds, function(currentTimebox, totalTimebox) {
            ///
        }, function() {
            timeboxSeconds = 0;
        });
        expect(timeboxSeconds).toEqual(30);
        this.clock.tick(30000);
        expect(timeboxSeconds).toEqual(0);
    });
});