var Discoverables = function() {
    Discoverables.Buglist = [
        "A tree fell on the road.",
        "A demon emerged from below.",
        "A chicken blocks the road.",
        "The road looks confusing.",
        "Apparently the road wasn't really done.",
        "A herd of cows was spotted.",
        "The road just ends here.",
        "A mountain stands tall in the middle of the road.",
        "Traffic light always shows red.",
        "A lion blocks your path"
    ];
    Discoverables.FeatureList = [
        "A shiny new road was built.",
        "Walking elevator discovered.",
        "Pavement added. Good enough for crossing.",
        "A ferry can help you get across.",
        "This road has a pub!",
        "A bus can take you across.",
        "Road with extra lighting.",
        "An empty car stands at the side of the road."
    ];
    Discoverables.BugsFound = [];
    Discoverables.FeaturesFound = [];
};

Discoverables.discoverBug = function() {
    var bugNR = Math.floor((Math.random()*Discoverables.Buglist.length));
    if (Discoverables.Buglist[bugNR]) {
        Discoverables.BugsFound.push(Discoverables.Buglist[bugNR]);
        Discoverables.Buglist.splice(bugNR,1);
    } else {
        Discoverables.BugsFound.push("Undefined bug");
    }
    Scorecard.discoveredBugs(Discoverables.BugsFound);
};

Discoverables.discoverFeature = function() {
    var featureNR = Math.floor((Math.random()*Discoverables.FeatureList.length));
    if (Discoverables.FeatureList[featureNR]) {
        Discoverables.FeaturesFound.push(Discoverables.FeatureList[featureNR]);
        Discoverables.FeatureList.splice(featureNR,1);
    } else {
        Discoverables.FeaturesFound.push("Undefined feature");
    }
    Scorecard.discoveredFeatures(Discoverables.FeaturesFound);
};