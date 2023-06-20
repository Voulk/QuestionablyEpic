export class TopGearResult {
  constructor(itemSet, differentials, contentType) {
    this.itemSet = itemSet;
    this.differentials = differentials;
    this.contentType = contentType
  }

  itemSet = [];
  contentType = "";
  differentials = [];
  itemsCompared = 0;
}

export default TopGearResult;
