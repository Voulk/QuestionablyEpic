import React from "react";

// The soulbind stat panel sums up all of the active soulbinds in the tree.
export default function SoulbindStatPanel(props) {

    return(
        <div className="statPanel">
            <p>Selected Stat Gain Breakdown
            Estimated HPS: {props.hps}</p>

        </div>
    )

}