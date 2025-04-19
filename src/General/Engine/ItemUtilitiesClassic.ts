

export function filterClassicItemListBySource(itemList: any[], sourceInstance: number, sourceBoss: number) {
    let temp = itemList.filter(function (item) {
      return (item.source.instanceId == sourceInstance && item.source.encounterId == sourceBoss) || (item.source.instanceId == sourceInstance && sourceBoss == 0);
    });
  
    return temp;
  } 
