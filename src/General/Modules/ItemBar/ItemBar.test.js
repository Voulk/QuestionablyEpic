
import { createItem } from "./ItemBar.js";

// Test AddItem
describe("Top Gear full test", () => {

    test("Item Bar: Embellished item", () => {
        const item = createItem(204704, "Adaptive Dracothyst Armguards", 447, 1, "", "Haste / Versatility");

        expect(item.uniqueEquip).toEqual("embellishment");
        //expect(item.stats.haste).toEqual(246);
    })



})
    // 

    // 

    // Test generic crafted item.

    


// Test components

