import React from "react";
import { getSoulbindFormula } from "../Engine/EffectFormulas/Generic/GenericSoulbindFormulas";

const columnPos = [195, 290, 385];
const rowPos = [10, 85, 160, 235, 310, 385, 460, 535, 610];

// Creates a text based string from a given array of bonus_stats. 
function getBenefitString(bonus_stats) {
    let benefitString = ""
    Object.entries(bonus_stats).forEach(([key, value]) => {
        if (value !== 0) benefitString += key + ': ' + Math.round(value);
        
    })

    return benefitString;
}

function getLocalizedName(trait, lang = "en") {
    return trait.names[lang];

}

export default function SoulbindNode(props) {
    const trait = props.soulbindTrait;
    const name =  getLocalizedName(trait);
    const icon = process.env.PUBLIC_URL + "/Images/Icons/" + trait.icon;
    const containerIcon = '/Images/Interface/soulbindcontainer' + (name.includes('Conduit') ? 'hex' : 'circle') + (trait.active ? 'active' : '') + '.png';

    let stat_bonus = trait.bonus_stats;
    let position = {
        row: trait.position[0],
        column: trait.position[1]
    }
    let type = '' // Soulbind, Potency Conduit, Endurance Conduit, Finesse Conduit
    const benefitString = getBenefitString(stat_bonus);


    //console.log("P" + JSON.stringify(props.soulbindTrait));

    // The CSS here is a bit of a nightmare. TODO. 
    return (
        <div onClick={() => props.activateSoulbind(trait.id)} style={{backgroundColor: 'forestgreen', width: '100%', borderRadius: '50%'}}>
            <img width={48} height={48} src={process.env.PUBLIC_URL + containerIcon} 
               style={{position: 'absolute',  zIndex: 2, left: columnPos[position.column], top: rowPos[position.row]}} />
            <img width={38} height={38} src={icon} 
            style={{position: 'absolute', objectFit: 'contain', borderRadius: '100%', zIndex: 1, left: columnPos[position.column]+5, top: rowPos[position.row]+5}} />
            <p style={{fontSize: 10, zIndex: 40, color: 'Goldenrod', textAlign: 'center', position: 'absolute', left: columnPos[position.column]-18, top: rowPos[position.row]+28}}>{name}</p> 
            <p style={{fontSize: 10, zIndex: 41, color: 'Goldenrod', textAlign: 'center', position: 'absolute',  left: columnPos[position.column]+5, top: rowPos[position.row]+38}}>{benefitString}</p> 
        </div>
        

    )
}
