// A container that holds the highest selected set. 
import React from "react";
import MiniItemCard from "./MiniItemCard";

export default function TopSetComponent(props) {
    let itemList = props.itemList;

    return(
        <div
            style={{
                
            }}>
            {itemList.map((item, index) => (
                <MiniItemCard key={index} item={item} activateItem={true} />
            ))}
        </div>
    )


}