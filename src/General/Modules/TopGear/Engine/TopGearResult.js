import ItemSet from "General/Modules/TopGear/ItemSet";

export class TopGearResult {
  constructor(itemSet, differentials, contentType) {
    this.itemSet = itemSet;
    this.differentials = differentials;
    this.contentType = contentType
  }

  itemSet = new ItemSet();
  contentType = "";
  differentials = [];
  itemsCompared = 0;
  id = "";
}

export default TopGearResult;
