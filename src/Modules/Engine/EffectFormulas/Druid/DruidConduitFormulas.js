
export const getDruidConduit = (conduitID, pl, contentType, itemLevel = 156) => {
    let bonus_stats = {};

    // === Potency Conduits ===
    // Flash of Clarity
    if (conduitID === 340616) {
        bonus_stats.HPS = 999; // Placeholder tester. 
        console.log("Sending back bonus stats");

    }

    // Floral Recycling
    else if (conduitID === 340621) {

    }

    // Ready for Anything
    else if (conduitID === 340550) {

    }

    // Unstoppable Growth
    else if (conduitID === 340549) {

    }

    // Deep Allegiance (Kyrian)
    else if (conduitID === 341378) {

    }

    // Endless Thirst (Venthyr)
    else if (conduitID === 341383) {

    }

    // Evolved Swarm (Necrolord)
    else if (conduitID === 341447) {

    }

    // Conflux of Elements (Night Fae)
    else if (conduitID === 341446) {

    }

    // === Endurance Conduits ===
    // Tough as Bark
    else if (conduitID === 340529) {

    }

    // Ursine Vigor
    else if (conduitID === 340541) {

    }

    // Innate Resolve
    else if (conduitID === 340543) {

    }

    // =============================

    return bonus_stats;
}