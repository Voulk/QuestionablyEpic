import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import druid from "../../../Images/DruidSmall.png";


export default function CharComponent(props) {
    
        return(
            <div className="charComp">
                <div className="charLeft" >
                    <img src={druid} />
                </div>

                <div className="charRight">
                    <p style={{fontSize: "18px", marginTop: "4px", marginBottom: "0px", textAlign: "left", fontWeight: "bold"}}>{props.name}</p>
                    <p style={{fontSize: "14px", marginTop: "2px", textAlign: "left"}}>{props.spec}</p>


                </div>
                   


            </div>



        )
}