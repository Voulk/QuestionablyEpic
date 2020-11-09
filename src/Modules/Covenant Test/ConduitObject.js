import React from "react";
import { useTranslation } from "react-i18next";
import './Covenants.css';

export default function ConduitObject(props) {
    const { t } = useTranslation();
    const conduit = props.conduit;
  
    return (
      <div className="conduit">
          
        
        <div className="conduitTop" >
            <p className="conduitTitleText">{conduit.name}</p>
        </div>
        <div className="conduitBottom" >

        </div>

        

      </div>
    );
  }