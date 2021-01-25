class UpgradeFinderResult {
  constructor(itemSet, differentials) {
    this.itemSet = itemSet;
    this.differentials = differentials;
  }

  itemSet = [];
  differentials = [];
  itemsCompared = 0;
}

export default UpgradeFinderResult;
