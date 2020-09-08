

export default function getLegendaryInfo(legendary, spec, pl)  {
 
    // Druid
    if (spec === "Restoration Druid") {
        getDruidLegendary(legendary, pl);
    }

    // TODO: Other specs.
    else {
        return 0;
    }


}

const getDruidLegendary = (legendary, pl) => {
    let result = 0.0;
    let name = legendary.name;

    //alert(JSON.stringify(pl));    

    if (name === "Rejuv Spreader") {
        let rejuvHealingPerc = pl.getSpellHealingPerc("Rejuvenation");
        let baseTicks = 1 + (5 * pl.getStatPerc("Haste"));
        let expectedTicksWithLegendary = (baseTicks / (1 - 0.02 * Math.ceil(baseTicks)));
        let rejuvHealingInc = (expectedTicksWithLegendary / baseTicks) - 1;
        let expectedHPS = Math.round(rejuvHealingInc * rejuvHealingPerc * pl.getHPS());

        // Do Math
        legendary.expectedHPS = expectedHPS;

    }
    else if (name === "Swiftmend Extension") {
        // Do Math
        legendary.expectedHPS = 11;
    }

    else if (name === "The Dark Titans Lesson") {
        // Do Math
        legendary.expectedHPS = 7;
    }




    return result;


}