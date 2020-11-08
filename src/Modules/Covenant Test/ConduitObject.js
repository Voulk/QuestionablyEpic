import React from "react";
import { useTranslation } from "react-i18next";
import './Covenants.css';

export default function ConduitObject(props) {
    const { t } = useTranslation();
    const conduit = props.conduit;
  
    return (
      <div className="conduit">
          <img src='' />
          <p className="conduitTitleText">{conduit.name}</p>

      </div>
    );
  }