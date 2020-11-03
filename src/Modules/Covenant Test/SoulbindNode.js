import React from "react";

const columnPos = [195, 290, 385];
const rowPos = [20, 100, 180, 240, 320, 400];

export default function SoulbindNode(props) {
    const trait = props.soulbindTrait;

    let selected = false;
    let position = {
        row: trait.position[0],
        column: trait.position[1]
    }
    let type = '' // Soulbind, Potency Conduit, Endurance Conduit, Finesse Conduit

    console.log("P" + JSON.stringify(props.soulbindTrait));

    return (
        <div>
            <img width={48} height={48} src={process.env.PUBLIC_URL + "/Images/Interface/SoulbindContainer.png"} 
                style={{position: 'absolute', left: columnPos[position.column], top: rowPos[position.row]}} />
        </div>
        

    )
}
