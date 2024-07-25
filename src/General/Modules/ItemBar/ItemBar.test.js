
import { createItem } from "./ItemBar.js";

// Test AddItem
describe("Top Gear full test", () => {

    test("Item Bar: Embellished item", () => {
        const item = createItem(204704, "Adaptive Dracothyst Armguards", 447, 1, "", "Haste / Versatility");

        expect(item.uniqueEquip).toEqual("embellishment");
    })

    test("Item Bar: Generic Crafted Item w/ Missive", () => {
        const item = createItem(193001, "Elemental Lariat", 421, 0, "", "Crit / Mastery");

        expect(item.socket).toEqual(3);
    })

})
    // 

    // 

    // Test generic crafted item.

    


// Test components

