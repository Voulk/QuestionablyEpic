import React, { Component } from 'react';
import ReactDOM from 'react-dom';



export default function CharComponent(props) {
    
        return(
            <div className="lego">
                <div className="titleBox">
                    
 
                    <p style={{fontSize: "16px", marginTop: "2px", textAlign: "center", fontWeight: "bold", display: "inline-block"}}>{props.name}</p>
                </div>
                
            <div style={{height: "45%", borderWidth: "0 0 2px 0", borderStyle: "solid", borderColor: "black"}}>
                

            </div>
            <div>
                <p style={{fontSize: "16px", margin: "1px", marginLeft: "auto", marginRight: "auto", textAlign: "center", fontWeight: "bold"}}>Spec: {props.spec}</p>
            </div>
        </div>



        )
}