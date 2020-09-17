import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from "react-i18next";

const legendaryImages = {
    'The Dark Titans Lesson' : require('../../../Images/Legendaries/TheDarkTitansLesson.jpg')
   
}

export default function LegendaryObject(props) {
    const { t, i18n } = useTranslation();
    const item = props.item;
    
        return(
            <div className="lego">
                <div className="titleBox">
                    
                    <p style={{fontSize: "16px", marginTop: "5px", marginLeft: "5px", fontWeight: "bold", display: "inline-block"}}>{t(item.name + ".name")}</p>
                    <img src={legendaryImages[item.name]} alt=''/> 
                </div>
                
            <div style={{height: "60%", position: "relative"}}>
                <p className="legodesc">{t(item.name + ".desc")}</p>
                <div className="legostats">
                    <p>Expected HPS: {item.expectedHPS}<br />
                    Expected DPS: {item.expectedDPS}<br /></p>
                </div>
                
            </div>

            <div className="legodroploc">
                <p style={{marginTop: "4px"}}>Pattern drops from: {t(item.name + '.droploc')}</p>
            </div>

        </div>



        )
}