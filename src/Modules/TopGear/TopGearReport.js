import React, { useEffect } from "react";
import MiniItemCard from "./MiniItemCard";

function TopGearReport(props) {

    let topSet = props.topSet;
    console.log(topSet);
    let itemList = (topSet !== null && 'itemList' in topSet) ? props.topSet.itemList : [];
    console.log("Top Set: " + JSON.stringify(itemList));

    return (
        <div>
            {itemList.map((item, index) => (
                <MiniItemCard key={index} item={item} activateItem={true} />
            ))}


        </div>

    )
}

export default TopGearReport;