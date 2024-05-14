
import Player from "General/Modules/Player/Player";
import { buildNewWepCombos, getItemProp } from "General/Engine/ItemUtilities"
import { Item } from "General/Modules/Player/Item"
import { createStore } from 'redux';
import rootReducer from "Redux/Reducers/RootReducer";
import { composeWithDevTools } from '@redux-devtools/extension';
import { runTopGearBC } from "General/Modules/TopGear/Engine/TopGearEngineBC"

describe("Top Gear Test", () => {
    test("Top Gear Test", () => {
        const itemIDList = [68777,67131,67130,64904,64673,64672,64645,64489,62431,62420,62050,60280,60278,59453,59220,58484,58189,56561,56297,56361,56405, 60276]; // 
        const itemList = [];
        const player = new Player("Voulk", "Restoration Druid Classic", 99, "NA", "Stonemaul", "Night Elf");
        const store = createStore(rootReducer, /* preloadedState, */ composeWithDevTools());
        const gameType = "Classic";
        const resultData = [];
        const castModel = JSON.parse(JSON.stringify(player.getActiveModel("Raid")));

        itemIDList.forEach((itemID) => {
            const item = new Item(itemID, getItemProp(itemID, "name", gameType), getItemProp(itemID, "slot", gameType), 0, "", 0, getItemProp(itemID, "itemLevel", gameType), "", "Classic")
            item.active = true;
            itemList.push(item);
            player.addActiveItem(item);
        })

        expect(true).toEqual(true);

        /*
        let wepCombos = buildNewWepCombos(player, true);

        const result = runTopGearBC(itemList, wepCombos, player, "Raid", 0, "en", store.getState().playerSettings, castModel, true, [], [])
        
        //console.log(JSON.stringify(result.differentials.map(differentials => differentials.items.map(item => item.name))));

        result.itemSet.itemList.forEach(item => {
            resultData.push(item.name + " - " + item.flags + " - Gems:" + item.socketedGems)
        })

        console.log("SCORE: " + result.itemSet.hardScore)
        console.log(resultData); */

    });

});