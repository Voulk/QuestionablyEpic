import ItemSet from "General/Modules/TopGear/ItemSet";

export class TopGearResult {
  constructor(itemSet: ItemSet, differentials: any[], contentType: contentTypes) {
    this.itemSet = itemSet;
    this.differentials = differentials;
    this.contentType = contentType
  }

  itemSet: ItemSet;
  contentType: contentTypes;
  differentials: any[] = [];
  itemsCompared: number =  0;
  id: string = "";
  new: boolean = false;

  // How many of the items the player selected carry an embellishment. Only two can be worn at once, so when this is
  // higher the report explains why a selected embellished item didn't make the final set.
  embellishedSelected: number = 0;

  // Throughput of the gear the player is currently wearing, evaluated through the same path as the candidate sets.
  // Used to show how much of an upgrade the best set is. 0 when the spec has no cast model, or nothing is equipped.
  equippedHPS: number = 0;

  // Per-option comparison table for gems, enchants, flask and Folio runes, priced against the player's currently
  // equipped gear so they can fine tune stats. Null when nothing is flagged as equipped.
  optionComparisons: any = null;

  // The winning gem / enchant / Folio configuration when joint optimisation ran, plus what it gained.
  optimalConfig: any = null;
}

export default TopGearResult;
