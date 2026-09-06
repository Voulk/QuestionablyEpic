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
}

export default TopGearResult;
