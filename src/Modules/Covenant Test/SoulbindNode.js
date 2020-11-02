import React from "react";

export default function SoulbindNode(props) {

    let selected = false;
    let position = {
        row: -1,
        column: -1
    }
    let type = '' // Soulbind, Potency Conduit, Endurance Conduit, Finesse Conduit

    return (
        <div>
            <img width={48} height={48} src={process.env.PUBLIC_URL + "/Images/Interface/SoulbindContainer.png"} />
        </div>
        

    )
}
