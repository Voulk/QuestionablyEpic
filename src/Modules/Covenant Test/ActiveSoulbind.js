

class ActiveSoulbind {
    constructor(id, itemLevel, itemName, type) {
        this.id = id;
        this.itemLevel = itemLevel;
        this.name = itemName; // Placeholder. Names shouldn't be initialized and should be displayed dynamically based on language settings.
        this.type = type;
    }

    id = 0;
    hps = 0;
    name = ""; // This needs to be localized. There are a few ways we can do it.
    itemLevel = 156; 
    icon = ""
    type = "" // Potency, Finesse or Endurance. We are mostly focusing on Potency and Endurance since Finesse are very scenario specific. 

}

export default ActiveSoulbind;