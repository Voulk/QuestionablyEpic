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
}

export default TopGearResult;
