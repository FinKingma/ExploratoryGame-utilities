describe("hero", function() {
    var context;

    beforeEach(function() {
        new Hero("keyboard",.7, 200, 100);
        var canvas = document.createElement('canvas');
        context = canvas.getContext('2d');
    });

    it("does not move over background", function() {
        //background color
        context.fillStyle = "rgba(154,202,202,0.8)";
        context.fillRect(0,0,200,100);
        
        Hero.speedX++;

        var startingPos = Hero.x;
        moveHero(context,200,100);

        expect(Hero.x).toEqual(startingPos);
    });

    it("moves over black lines", function() {
        context.fillStyle = "black";
        context.fillRect(0,0,200,100);
        
        Hero.speedX++;

        var startingPos = Hero.x;
        moveHero(context,200,100);

        expect(Hero.x).toEqual(startingPos + 1);
    });

    it("moves over blue lines", function() {
        context.fillStyle = "blue";
        context.fillRect(0,0,200,100);
        
        Hero.speedX++;

        var startingPos = Hero.x;
        moveHero(context,200,100);

        expect(Hero.x).toEqual(startingPos + 1);
    });

    it("moves over red lines", function() {
        context.fillStyle = "red";
        context.fillRect(0,0,200,100);
        
        Hero.speedX++;

        var startingPos = Hero.x;
        moveHero(context,200,100);

        expect(Hero.x).toEqual(startingPos + 1);
    });

    it("can move faster", function() {
        context.fillStyle = "blue";
        context.fillRect(0,0,200,100);
        
        Hero.speedX+=2;

        var startingPos = Hero.x;
        moveHero(context,200,100);

        expect(Hero.x).toEqual(startingPos + 2);
    });

    it("bounces back if at background", function() {
        //background color
        context.fillStyle = "rgba(154,202,202,0.8)";
        context.fillRect(Hero.x,0,200-Hero.x,100);

        context.fillStyle = "black";
        context.fillRect(0,0,Hero.x,100);
        
        Hero.speedX+=2;

        var startingPos = Hero.x;
        moveHero(context,200,100);

        expect(Hero.x).toEqual(startingPos-1);
    });
});

