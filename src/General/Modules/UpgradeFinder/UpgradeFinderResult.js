class UpgradeFinderResult {
  constructor(itemSet, differentials, contentType) {
    this.itemSet = itemSet;
    this.differentials = differentials;
    this.contentType = contentType;
  }

  id = 0;
  itemSet = [];
  differentials = [];
  itemsCompared = 0;
  contentType = "";
}

export default UpgradeFinderResult;
