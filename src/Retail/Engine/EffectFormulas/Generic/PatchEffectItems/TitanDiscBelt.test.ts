import { processedValue } from "Retail/Engine/EffectFormulas/EffectUtilities";
import Player from "General/Modules/Player/Player";
import { circletGemData } from "./CyrcesCircletData";
import { printBeltData } from "./TitanDiscBeltData";
import each from "jest-each";



describe("Belt Data Check", () => {
    test("Titan Disc Belt Data", () => {
        const evoker = new Player("Mock", "Preservation Evoker", 99, "NA", "Stonemaul", "Night Elf");
        printBeltData(evoker);
    });
});

