var Discoverables = function() {
    Discoverables.Buglist = [
        {
            name: "A tree fell on the road.",
            points: 50
        },
        {
            name: "A demon emerged from below.",
            points: 250
        },
        {
            name: "A chicken blocks the road.",
            points: 100
        },
        {
            name: "The road looks confusing.",
            points: 70
        },
        {
            name: "Apparently the road wasn't really done.",
            points: 99
        },
        {
            name: "The road just ends here.",
            points: 90
        },{
            name: "A mountain stands tall in the middle of the road.",
            points: 180
        },{
            name: "Traffic light always shows red.",
            points: 30
        },{
            name: "A lion blocks your path",
            points: 150
        }
    ];

    Discoverables.FeatureList = [
        {
            name: "A shiny new road was built.",
            points: 50
        },
        {
            name: "Walking elevator discovered.",
            points: 120
        },
        {
            name: "Pavement added. Good enough for crossing.",
            points: 50
        },
        {
            name: "A ferry can help you get across.",
            points: 50
        },
        {
            name: "This road has a pub!",
            points: 200
        },
        {
            name: "A bus can take you across.",
            points: 60
        },
        {
            name: "Road with extra lighting.",
            points: 70
        },
        {
            name: "An empty car stands at the side of the road.",
            points: 100
        },
        {
            name: "A treasure chest lies next to the road",
            points: 300
        }
    ];
    Discoverables.BugsFound = [];
    Discoverables.FeaturesFound = [];
};

Discoverables.discoverBug = function(Scorecard) {
    var bugNR = Math.floor((Math.random()*Discoverables.Buglist.length));
    if (Discoverables.Buglist[bugNR]) {
        Discoverables.BugsFound.push(Discoverables.Buglist[bugNR]);
        Discoverables.Buglist.splice(bugNR,1);
    } else {
        Discoverables.BugsFound.push({
            name: "Undefined bug.",
            points: 120
        });
    }
    Scorecard.discoveredBugs(Discoverables.BugsFound);
};

Discoverables.discoverFeature = function(Scorecard) {
    var featureNR = Math.floor((Math.random()*Discoverables.FeatureList.length));
    if (Discoverables.FeatureList[featureNR]) {
        Discoverables.FeaturesFound.push(Discoverables.FeatureList[featureNR]);
        Discoverables.FeatureList.splice(featureNR,1);
    } else {
        Discoverables.FeaturesFound.push({
            name: "Undefined feature.",
            points: 70
        });
    }
    Scorecard.discoveredFeatures(Discoverables.FeaturesFound);
};