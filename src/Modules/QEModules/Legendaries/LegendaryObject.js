import React, { Component } from 'react';
import ReactDOM from 'react-dom';


const legendaryImages = {
    'The Dark Titans Lesson' : require('../../../Images/Legendaries/TheDarkTitansLesson.jpg')
   
}

export default function LegendaryObject(props) {
        return(
            <div className="lego">
                <div className="titleBox">
                    <img src={legendaryImages[props.name]} alt=''/> 
 
                    <p style={{fontSize: "16px", marginTop: "2px", textAlign: "center", fontWeight: "bold", display: "inline-block"}}>{this.props.name}</p>
                </div>
                
            <div style={{height: "45%", borderWidth: "0 0 2px 0", borderStyle: "solid", borderColor: "black"}}>
                <p>Legendary Info</p>

            </div>
            <div>
                <p style={{fontSize: "16px", margin: "1px", marginLeft: "auto", marginRight: "auto", textAlign: "center", fontWeight: "bold"}}>Expected HPS: {this.props.hps}</p>
            </div>
        </div>



        )
}