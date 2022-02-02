

export function getItemSet(id, pieces) {
    let effects = [];
    let temp = itemSets.filter(function (set) {
      return set.id === parseInt(id);
    });
    if (temp.length > 0) {
      for (const [bonus, effectid] of Object.entries(temp[0].setBonuses)) {
        //console.log("Getting bonuss" + bonus + ". ID: " + effectid + ". Pieces: " + pieces);
        if (pieces >= bonus) effects.push({type: 'set bonus', name: effectid, class: temp[0].class});
      }
      return effects;
    }
    else return "";
  }

export const itemSets = [
    {
      /* ---------------------------------------------------------------------------------------------- */
      /*                                 Grand Upwelling (Monk T28)                                     */
      /* ---------------------------------------------------------------------------------------------- */
      // 
      id: 1504,
      class: "Mistweaver Monk",
      setBonuses: {
        2: "Mistweaver T28-2", // +5% Essence Font Healing, +2s HoT duration
        4: "Mistweaver T28-4"  // TFT creates a rune that adds flat healing to all healing events while inside. Lasts 10s.
      },
    },


]