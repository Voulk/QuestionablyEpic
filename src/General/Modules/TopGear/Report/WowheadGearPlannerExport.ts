/*
import { IndividualSimUI } from '../../../individual_sim_ui';
import { Spec } from '../../../proto/common';
import { raceNames } from '../../../proto_utils/names';
import { IndividualWowheadGearPlannerImporter } from '../importers';
import { IndividualExporter } from './individual_exporter'; */

import { reforgeIDs } from "./TopGearExports";

// Credit to Wowsims for the original algorithm
const c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
const expansionTag = "mop-classic";
const expansionID = 15
const CHARACTER_LEVEL = 90

const ItemSlot = {
	"Head": 0,
	"Neck": 1,
	"Shoulder": 2,
	"Back": 3,
	"Chest": 4,
	"Wrist": 5,
	"Hands": 6,
	"Waist": 7,
	"Legs": 8,
	"Feet": 9,
	"Finger1": 10,
	"Finger2": 11,
	"Trinket1": 12,
	"Trinket2": 13,
	"1H Weapon": 14, // can be 1h or 2h
    "2H Weapon": 14, // can be 1h or 2h
	"Offhand": 15,
}

const exportSlotIDs = {
    "Head": 1,
    "Neck": 2,
    "Shoulder": 3,
    "Back": 15,
    "Chest": 5,
    "Wrist": 9,
    "Hands": 10,
    "Waist": 6,
    "Legs": 7,
    "Feet": 8,
    "Finger1": 11,
    "Finger2": 12,
    "Trinket1": 13,
    "Trinket2": 14,
    "1H Weapon": 16,
    "2H Weapon": 16,
    "Offhand": 17,
}

const enchantIDs = {
    "Jade Spirit": 104427,
    "Major Intellect": 104445, // Offhand
    "Greater Pearlescent Spellthread": 122393, // Legs
	"Greater Cerulean Spellthread": 122392, // Legs
    "Superior Mastery": 104420, // Hands
    "Greater Haste": 104416, // Hands
    "Superior Intellect": 104403, // Back
    "Glorious Stats": 104335, // Chest
    "Fur Lining": 124552, // Wrist 124552
    "Super Intellect": 104389, // Wrist
    "Pandaren's Step": 104414, // Feet
    "Greater Crane Wing Inscription": 121195, // Shoulder
}

const specIndexes = {
    "Restoration Druid Classic": 3,
    "Holy Paladin Classic": 0,
    "Discipline Priest Classic": 0,
    "Holy Priest Classic": 1,
    "Restoration Shaman Classic": 4,
    "Mistweaver Monk Classic": 1
}

function writeBits(value: number): number[] {
	let e = value;
	let t = 0;
	const bits: number[] = [];

	for (let a = 1; a <= 5; a++) {
		const n = 5 * a;
		if (e < 1 << n) {
			const nArray: number[] = [];
			while (nArray.length < a) {
				const t = e & 63;
				e >>= 6;
				nArray.unshift(t);
			}
			nArray[0] = nArray[0] | t;
			bits.push(...nArray);
			return bits;
		}
		e -= 1 << n;
		t = (64 | t) >> 1;
	}
	throw new Error('Value too large to encode.');
}

function writeTalents(talentStr: string): number[] {
	let t = 0;
	for (let n = talentStr.length - 1; n >= 0; n--) {
		t <<= 2;
		t |= 3 & Math.min(4, parseInt(talentStr.substring(n, n + 1)));
	}
	return writeBits(t);
}

function writeGlyphs(glyphIds: number[]): string {
	const e = [0];
	Object.keys(glyphIds)
		.sort((e, t) => Number(e) - Number(t))
		.forEach(t => {
			const glyphId = glyphIds[Number(t)];
			if (!glyphId) return;
			e.push(...writeBits(Number(t)));
			e.push(...writeBits(glyphId));
		});
	let glyphStr = '';
	for (let s = 0; s < e.length; s++) {
		glyphStr += c.charAt(e[s]);
	}
	return glyphStr;
}

function writeHash(data: WowheadGearPlannerData): string {
	let hash = '';
	const bits: number[] = [4];

	bits.push(...writeBits(expansionID));

    // Body type
	bits.push(1);

	bits.push(...writeBits(data.level ?? 0));

	bits.push(specIndexes[data.spec] ?? 0);

	const talentBits = writeTalents(data.talents);
	bits.push(...talentBits);

	const glyphStr = [writeGlyphs(data.glyphs ?? [])];

	bits.push(...writeBits(0))//glyphStr.length));
	//glyphStr.forEach(e => {
	//	bits.push(...writeBits(e.length));
	//	bits.push(...e.split('').map(e => c.indexOf(e)));
	//});

	const items = data.items ?? [];
	bits.push(...writeBits(items.length)); // after z
	items.forEach(e => {

		let t = 0;
		const n: number[] = [];

		n.push(...writeBits(e.slotId ?? 0));
		n.push(...writeBits(e.itemId ?? 0));

		t <<= 1;
		if (e.randomEnchantId !== undefined) {
			t |= 1;
			let s = e.randomEnchantId;
			const r = s < 0 ? 1 : 0;
			if (r) s *= -1;
			s <<= 1;
			s |= r;
			n.push(...writeBits(s));
		}
		t <<= 1;
		if (e.upgradeRank !== undefined) {
			t |= 1;
			n.push(...writeBits(e.upgradeRank));
		}
		t <<= 1;
		if (e.reforge !== undefined) {
			t |= 1;
			n.push(...writeBits(e.reforge));
		}
		const r = removeTrailingZeros((e.gemItemIds ?? []).slice(0, 8));
		t <<= 3;
		t |= r.length;
		r.forEach(e => n.push(...writeBits(e)));
		const l = removeTrailingZeros((e.enchantIds ?? []).slice(0, 4));
		t <<= 2;
		t |= l.length;
		l.forEach(e => n.push(...writeBits(e)));
		bits.push(...writeBits(t));
		bits.push(...n);
	});

	let hashData = '';
	for (let e = 0; e < bits.length; e++) hashData += c.charAt(bits[e]);
	if (hashData) {
		hash += hashData;
	}
	return hash;
}

function removeTrailingZeros(arr: number[]): number[] {
	while (arr.length > 0 && arr[arr.length - 1] === 0) {
		arr.pop();
	}
	return arr;
}

export interface WowheadGearPlannerData {
	class?: string;
	race?: string;
	genderId?: number;
	specIndex?: number;
	level: number;
	talents: string;
	glyphs: number[];
	items: WowheadItemData[];
}

export interface WowheadItemData {
	slotId: number;
	itemId: number;
	randomEnchantId?: number;
	reforge?: number;
	upgradeRank?: number;
	gemItemIds?: number[];
	enchantIds?: number[];
}

export function createWowheadGearPlannerLink(data: WowheadGearPlannerData): string {
	const baseUrl = '';
	const hash = writeHash(data);
	return baseUrl + hash;
}



export function getWHData(player: any, itemList: any[], reforges: any[], enchants: any[]): string {

		const convertWowheadRace = (raceName: string): string => {
			const alliancePrefix = raceName.endsWith('(A)') ? 'alliance-' : undefined;
			const hordePrefix = raceName.endsWith('(H)') ? 'horde-' : undefined;
			return (alliancePrefix ?? hordePrefix ?? '') + raceName.replaceAll(' (A)', '').replaceAll(' (H)', '').replaceAll(/\s/g, '-').toLowerCase();
		};

		const classStr = player.spec.split(' ').at(-2).toLowerCase();
		const raceStr = player.race.replace(' ', '-').toLowerCase(); // convertWowheadRace(raceNames.get(player.getRace())!);
		const url = `https://www.wowhead.com/mop-classic/gear-planner/${classStr}/${raceStr}/`;

		const addGlyph = (glyphItemId: number): number => {
			const spellId = 0//glyphItemToSpellId(glyphItemId);
			return spellId ?? 0;
		};

		const glyphs = [0] //player.getGlyphs();
		const data: WowheadGearPlannerData = {
			level: CHARACTER_LEVEL,
			specIndex: specIndexes[player.spec], //player.getPlayerSpec().specIndex,
			talents: "000000",//player.getTalentsString(),
			glyphs: [
				/*addGlyph(glyphs.major1),
				addGlyph(glyphs.major2),
				addGlyph(glyphs.major3),
				addGlyph(glyphs.minor1),
				addGlyph(glyphs.minor2),
				addGlyph(glyphs.minor3),*/
			],
			items: [],
		};

    
		//const gear = player.getGear();
        const rings = itemList.filter(item => item.slot === 'Finger');
        const trinkets = itemList.filter(item => item.slot === 'Trinket');
        Object.keys(exportSlotIDs).forEach((slotName, i) => {
            let item = null;
            let customSlot = ""
            if (i === 10) {
                item = rings[0]; // Finger1
                customSlot = "Finger1";
            } else if (i === 11) {
                item = rings[1]; // Finger2
                customSlot = "Finger2";
            } else if (i === 12) {
                item = trinkets[0]; // Trinket1
                customSlot = "Trinket1";
            } else if (i === 13) {
                item = trinkets[1]; // Trinket2
                customSlot = "Trinket2";
            } else {
                item = itemList.find(item => item.slot === slotName);
            }

            if (!item) return;

				const slotId = exportSlotIDs[slotName]; //exportSlotIDs[customSlot ? customSlot : item.slot];
				const itemData: WowheadItemData = {
					slotId: slotId,
					itemId: item.id,
					enchantIds: [],
				};

				//if (item._randomSuffix?.id) itemData.randomEnchantId = item._randomSuffix.id;
				//if (item._enchant?.spellId) itemData.enchantIds!.push(item._enchant.spellId);
				//if (item._tinker?.spellId) itemData.enchantIds!.push(item._tinker.spellId);
				if (item.socketedGems && item.socketedGems.length > 0) itemData.gemItemIds = item.socketedGems;
				//if (item._reforge) itemData.reforge = item._reforge.id;
                if (reforges[item.id]) itemData.reforge = reforgeIDs[reforges[item.id]];
                if (enchants[item.slot]) itemData.enchantIds!.push(enchantIDs[enchants[item.slot]]);
                if (!itemData.reforge && item.flags.includes('ItemReforged')) {
                    const reforge = item.flags.find(flag => flag.startsWith('Reforged:'));
                    itemData.reforge = reforgeIDs[reforge];
                }
				//if (item._upgrade > 0) itemData.upgradeRank = item._upgrade;

				data.items.push(itemData);
        })
		/*itemList.getItemSlots()
			//.sort((slot1, slot2) => IndividualWowheadGearPlannerImporter.slotIDs[slot1] - IndividualWowheadGearPlannerImporter.slotIDs[slot2])
			.forEach(itemSlot => {
				const item = gear.getEquippedItem(itemSlot);
				if (!item) return;

				const slotId = IndividualWowheadGearPlannerImporter.slotIDs[itemSlot];
				const itemData: WowheadItemData = {
					slotId,
					itemId: item.id,
					enchantIds: [],
				};

				//if (item._randomSuffix?.id) itemData.randomEnchantId = item._randomSuffix.id;
				if (item._enchant?.spellId) itemData.enchantIds!.push(item._enchant.spellId);
				if (item._tinker?.spellId) itemData.enchantIds!.push(item._tinker.spellId);
				//if (item._gems) itemData.gemItemIds = item._gems.map(gem => gem?.id ?? 0);
				if (item._reforge) itemData.reforge = item._reforge.id;
				if (item._upgrade > 0) itemData.upgradeRank = item._upgrade;

				data.items.push(itemData);
			});*/

		const hash = createWowheadGearPlannerLink(data);
		return url + hash;
	}
