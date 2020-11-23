import React from "react";
import { useTranslation } from "react-i18next";

const legendaryImages = {
  "The Dark Titans Lesson": require("../../Images/Legendaries/TheDarkTitansLesson.jpg"),
  "Circle of Life and Death": require("../../Images/Legendaries/CircleOfLifeAndDeath.jpg"),
  "Lycaras Fleeting Glimpse": require("../../Images/Legendaries/LycarasFleetingGlimpse.jpg"),
  "Memory of the Mother Tree": require("../../Images/Legendaries/MemoryOfTheMotherTree.jpg"),
  "Oath of the Elder Druid": require("../../Images/Legendaries/OathOfTheElderDruid.jpg"),
  "Verdant Infusion": require("../../Images/Legendaries/VerdantInfusion.jpg"),
  "Vision of Unending Growth": require("../../Images/Legendaries/VisionOfUnendingGrowth.jpg"),

  // Paladin
  "From Dusk till Dawn": require("../../Images/Legendaries/FromDuskTillDawn.jpg"),
  "Vanguards Momentum": require("../../Images/Legendaries/VanguardsMomentum.jpg"),
  "The Magistrates Judgment": require("../../Images/Legendaries/TheMagistratesJudgment.jpg"),
  "Inflorescence of the Sunwell": require("../../Images/Legendaries/InflorescenceOfTheSunwell.jpg"),
  "Maraads Dying Breath": require("../../Images/Legendaries/MaraadsDyingBreath.jpg"),
  "Shadowbreaker, Dawn of the Sun": require("../../Images/Legendaries/ShadowbreakerDawnOfTheSun.jpg"),
  "Shock Barrier": require("../../Images/Legendaries/ShockBarrier.jpg"),
};

export default function LegendaryObject(props) {
  const { t } = useTranslation();
  const item = props.item;
  const hpsString = item.bonus_stats.HPS > 5 ? item.bonus_stats.HPS : "Coming Soon";

  return (
    <div className="lego">
      <div className="titleBox">
        <p
          style={{
            fontSize: "16px",
            marginTop: "5px",
            marginLeft: "5px",
            fontWeight: "bold",
            display: "inline-block",
          }}
        >
          {t(item.name + ".name")}
        </p>
        <img src={legendaryImages[item.name]} alt="" />
      </div>

      <div style={{ height: "60%", position: "relative" }}>
        <p className="legodesc">{t(item.name + ".desc")}</p>
        <div className="legostats">
          <p>
            HPS: {hpsString}
            {/*Expected DPS: {item.bonus_stats.DPS} */}
          </p>
        </div>
      </div>

      <div className="legodroploc">
        <p style={{ marginTop: "4px" }}>
          Pattern drops from: {t(item.name + ".droploc")}
        </p>
      </div>
    </div>
  );
}