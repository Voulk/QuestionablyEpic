import {conduits} from '../CooldownPlanner/Data/Data'

class ActiveConduit {
    constructor(id, itemLevel, itemName, type) {
        this.id = id;
        this.itemLevel = itemLevel;
        this.name = itemName; // Placeholder. Names shouldn't be initialized and should be displayed dynamically based on language settings.
        this.type = type;
        this.icon = this.getIcon(this.id);
        
    }

    id = 0;
    hps = 45;
    name = ""; // This needs to be localized. There are a few ways we can do it.
    itemLevel = 156; 
    icon = ""
    type = "" // Potency, Finesse or Endurance. We are mostly focusing on Potency and Endurance since Finesse are very scenario specific. 


    getIcon = (id) => {
        let temp = conduits.filter(function (conduit) {
            return conduit.guid === id;
            });
            
            
            if ((temp.length > 0) && ("abilityIcon" in temp[0]))
            return process.env.PUBLIC_URL + "/Images/Icons/" + temp[0].abilityIcon;
            else return process.env.PUBLIC_URL + "/Images/Icons/missing.jpg";
    }
}

export default ActiveConduit;