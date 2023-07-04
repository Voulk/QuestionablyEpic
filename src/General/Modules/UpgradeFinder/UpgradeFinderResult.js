class UpgradeFinderResult {
  constructor(itemSet, differentials, contentType) {
    this.itemSet = itemSet;
    this.differentials = differentials;
    this.contentType = contentType;
  }

  
  itemSet = [];
  differentials = [];
  itemsCompared = 0;
  contentType = "";
}

export default UpgradeFinderResult;
