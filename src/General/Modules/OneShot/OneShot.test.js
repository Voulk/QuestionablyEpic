
import { getKeyMult } from "./OneShot";

describe("Key Level base multipliers", () => {
    test("Mythic +25", () => {
        expect(Math.round(100*getKeyMult(25))/100).toEqual(7.73)
    })

    test("Mythic +20", () => {
        expect(Math.round(100*getKeyMult(20))/100).toEqual(4.8)
    })

    test("Mythic +15", () => {
        expect(Math.round(100*getKeyMult(15))/100).toEqual(2.98)
    })

});