
import { createItem } from "./ItemBar.js";

// Test AddItem
describe("Top Gear full test", () => {

    test("Item Bar: Embellished item", () => {
        const item = createItem(215133, "Binding of Binding", 590, 1, "", "Haste / Versatility");

        expect(item.uniqueEquip).toEqual("embellishment");
        //expect(item.stats.haste).toEqual(246);
    })



})
    // 

    // 

    // Test generic crafted item.

    


// Test components

