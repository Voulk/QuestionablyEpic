import React from "react";

const columnPos = [195, 290, 385];
const rowPos = [10, 85, 160, 235, 310, 385, 460, 535, 610];

export default function SoulbindNode(props) {
    const trait = props.soulbindTrait;
    const name =  trait.names.en; // Should be created dynamically based on language setting.
    const id = trait.id;
    const icon = process.env.PUBLIC_URL + "/Images/Icons/" + trait.icon;
    const containerIcon = '/Images/Interface/' + (name.includes('Conduit') ? 'SoulbindContainer' : 'soulbindcontainercircle') + '.png';
    let selected = false;
    let stat_bonus = {
        hps: 0,
        haste: 0,
        crit: 0,
        mastery: 0,
        vers: 0,
        intellect: 0
    }
    let position = {
        row: trait.position[0],
        column: trait.position[1]
    }
    let type = '' // Soulbind, Potency Conduit, Endurance Conduit, Finesse Conduit

    console.log("P" + JSON.stringify(props.soulbindTrait));

    return (
        <div style={{backgroundColor: 'forestgreen', width: '90px', borderRadius: '50%'}}>
            <img width={48} height={48} src={process.env.PUBLIC_URL + containerIcon} 
               style={{position: 'absolute',  zIndex: 2, left: columnPos[position.column], top: rowPos[position.row]}} />
            <img width={38} height={38} src={icon} 
            style={{position: 'absolute', objectFit: 'contain', borderRadius: '100%', zIndex: 1, left: columnPos[position.column]+5, top: rowPos[position.row]+5}} />
            <p style={{fontSize: 10, zIndex: 40, textAlign: 'center', position: 'absolute', left: columnPos[position.column]-18, top: rowPos[position.row]+28}}>{name}</p> 
            <p style={{fontSize: 10, zIndex: 41, textAlign: 'center', position: 'absolute',  left: columnPos[position.column], top: rowPos[position.row]+38}}>HPS: {stat_bonus.hps}</p> 
        </div>
        

    )
}
