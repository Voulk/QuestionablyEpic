
import { createItem } from "./ItemBar.js";

// Test AddItem
describe("Top Gear full test", () => {

    test("Item Bar: Embellished item", () => {
        const item = createItem(204704, "Adaptive Dracothyst Armguards", 447, 1, "", "Haste / Versatility");

        expect(item.uniqueEquip).toEqual("embellishment");
        expect(item.stats.haste).toEqual(246);
    })

    test("Item Bar: Generic Crafted Item w/ Missive", () => {
        const item = createItem(193001, "Elemental Lariat", 421, 0, "", "Crit / Mastery");

        expect(item.stats.crit).toEqual(605);
        expect(item.stats.mastery).toEqual(605);
        expect(item.socket).toEqual(3);
    })

})
    // 

    // 

    // Test generic crafted item.

    


// Test components

