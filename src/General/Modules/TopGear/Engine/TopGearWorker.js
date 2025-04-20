

self.onmessage = async function (e) {
    const {
      gameType,
      itemSets,
      itemList,
      wepCombos,
      strippedPlayer,
      contentType,
      baseHPS,
      currentLanguage,
      playerSettings,
      strippedCastModel
    } = e.data;
  
    try {
      if (gameType === "Retail") {
        const { runTopGear } = await import("./TopGearEngine.js");

        const result = await runTopGear(
          itemList,
          wepCombos,
          strippedPlayer,
          contentType,
          baseHPS,
          playerSettings,
          strippedCastModel
        );
  
        self.postMessage({ success: true, result });
      }
      else if (gameType === "Classic") {
        const { runTopGearClassic } = await import('./TopGearEngineClassic.js');
  
        const result = await runTopGearClassic(
          itemSets,
          strippedPlayer,
          contentType,
          baseHPS,
          currentLanguage,
          playerSettings,
          strippedCastModel
        );
    
        self.postMessage({ success: true, result });
      }
    } catch (error) {
      self.postMessage({ success: false, error: error.message || error });
    }
  };
  