import React from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Card, CardActions, CardContent, Divider, Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    minHeight: 200,
    borderColor: "goldenrod",
  },
  content: {
    height: 150,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const legendaryImages = {
  // Druid
  "The Dark Titans Lesson": require("../../Images/Legendaries/TheDarkTitansLesson.jpg"),
  "Circle of Life and Death": require("../../Images/Legendaries/CircleOfLifeAndDeath.jpg"),
  "Lycaras Fleeting Glimpse": require("../../Images/Legendaries/LycarasFleetingGlimpse.jpg"),
  "Memory of the Mother Tree": require("../../Images/Legendaries/MemoryOfTheMotherTree.jpg"),
  "Oath of the Elder Druid": require("../../Images/Legendaries/OathOfTheElderDruid.jpg"),
  "Verdant Infusion": require("../../Images/Legendaries/VerdantInfusion.jpg"),
  "Vision of Unending Growth": require("../../Images/Legendaries/VisionOfUnendingGrowth.jpg"),

  // Paladin
  "Of Dusk and Dawn": require("../../Images/Legendaries/FromDuskTillDawn.jpg"),
  "Vanguards Momentum": require("../../Images/Legendaries/VanguardsMomentum.jpg"),
  "The Magistrates Judgment": require("../../Images/Legendaries/TheMagistratesJudgment.jpg"),
  "Inflorescence of the Sunwell": require("../../Images/Legendaries/InflorescenceOfTheSunwell.jpg"),
  "Maraads Dying Breath": require("../../Images/Legendaries/MaraadsDyingBreath.jpg"),
  "Shadowbreaker, Dawn of the Sun": require("../../Images/Legendaries/ShadowbreakerDawnOfTheSun.jpg"),
  "Shock Barrier": require("../../Images/Legendaries/ShockBarrier.jpg"),
  "The Mad Paragon": require("../../Images/Legendaries/ability_paladin_conviction.jpg"),
  "Relentless Inquisitor": require("../../Images/Legendaries/spell_holy_divinepurpose.jpg"),

  // Monk
  "Escape from Reality": require("../../Images/Legendaries/EscapeFromReality.jpg"),
  "Invoker's Delight": require("../../Images/Legendaries/InvokersDelight.jpg"),
  "Roll Out": require("../../Images/Legendaries/RollOut.jpg"),
  "Fatal Touch": require("../../Images/Legendaries/FatalTouch.jpg"),
  "Ancient Teachings of the Monastery": require("../../Images/Legendaries/AncientTeachingsoftheMonastery.jpg"),
  "Yu'lon's Whisper": require("../../Images/Legendaries/YulonsWhisper.jpg"),
  "Clouded Focus": require("../../Images/Legendaries/CloudedFocus.jpg"),
  "Tear of Morning": require("../../Images/Legendaries/TearofMorning.jpg"),
  "Vitality Sacrifice": require("../../Images/Legendaries/VitalitySacrifice.jpg"),
  "Sephuz's Proclamation": require("../../Images/Legendaries/SephuzsProclamation.jpg"),
  "Echo of Eonar": require("../../Images/Legendaries/EchoofEonar.jpg"),

  // Priest
  "Clarity of Mind": require("../../Images/Legendaries/ClarityofMind.jpg"),
  "Crystalline Reflection": require("../../Images/Legendaries/CrystallineReflection.jpg"),
  "Kiss of Death": require("../../Images/Legendaries/KissofDeath.jpg"),
  "The Penitent One": require("../../Images/Legendaries/ThePenitentOne.jpg"),
  "Cauterizing Shadows": require("../../Images/Legendaries/CauterizingShadows.jpg"),
  "Measured Contemplation": require("../../Images/Legendaries/MeasuredContemplation.jpg"),
  "Twins of the Sun Priestess": require("../../Images/Legendaries/TwinsoftheSunPriestess.jpg"),
  "Divine Image": require("../../Images/Legendaries/DivineImage.jpg"),
  "Flash Concentration": require("../../Images/Legendaries/FlashConcentration.jpg"),
  "Harmonious Apparatus": require("../../Images/Legendaries/HarmoniousApparatus.jpg"),
  "X'anshi, Return of Archbishop Benedictus": require("../../Images/Legendaries/XanshiReturnofArchbishopBenedictus.jpg"),
  "Vault of Heavens": require("../../Images/Legendaries/VaultofHeavens.jpg"),

  // Shaman
  "Earthen Harmony": require("../../Images/Legendaries/EarthenHarmony.jpg"),
  "Jonat's Natural Focus": require("../../Images/Legendaries/JonatsNaturalFocus.jpg"),
  "Primal Tide Core": require("../../Images/Legendaries/PrimalTideCore.jpg"),
  "Ancestral Reminder": require("../../Images/Legendaries/AncestralReminder.jpg"),
  "Chains of Devastation": require("../../Images/Legendaries/ChainsofDevastation.jpg"),
  "Deeply Rooted Elements": require("../../Images/Legendaries/DeeplyRootedElements.jpg"),
  "Spiritwalker's Tidal Totem": require("../../Images/Legendaries/SpiritwalkersTidalTotem.jpg"),
};

export default function LegendaryObject(props) {
  const { t } = useTranslation();
  const item = props.item;
  const player = props.player;
  const hpsString = item.effectiveHPS > 5 ? Math.round(item.effectiveHPS) : "Coming Soon";
  const paddedDPS = Math.round(item.effectiveDPS).toString().padStart(3);
  const dpsString = item.effectiveDPS > 5 ? "DPS: " + paddedDPS : "";

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;


  return (
    
    <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
      <Card className={classes.root} variant="outlined">
        <CardContent className={classes.content}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ alignSelf: "center" }}>
              <Typography
                color="primary"
                variant="h6"
                component="h2"
                style={{
                  fontSize: "0.9rem",
                  alignSelf: "center",
                  lineHeight: 1,
                }}
              >
                {t(item.name + ".name")}
              </Typography>
              <Typography variant="caption">{t(item.name + ".slot")}</Typography>
            </div>
            <img
              height={40}
              width={40}
              src={legendaryImages[item.name].default}
              alt=""
              style={{
                borderRadius: 4,
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: "#ff8000",
              }}
            />
          </div>
          <Divider style={{ marginTop: 4 }} />
          <Grid container direction="row" justify="space-between" alignItems="center" style={{ height: 110 }}>
            <Grid item xs={12}>
              <CardContent style={{ padding: 0 }}>
                <Typography align="left" variant="caption" style={{ fontSize: "0.75rem", lineHeight: 1.1 }} component="p">
                  {t(item.name + ".desc")}
                </Typography>
              </CardContent>
            </Grid>
            <Grid item xs={12}>
              <CardContent style={{ padding: 0, height: 20 }}>
                <Typography align="center" variant="caption" component="p" style={{ lineHeight: 1.1, fontSize: "16px" }}>
                  {t("HPS")}: {hpsString}
                  <br />
                  {dpsString !== "" ? dpsString : ""}
                  <br />
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Typography variant="caption" component="p" style={{ padding: "0px 8px" }}>
            {t("Source")}: {t(item.name + ".droploc")}
          </Typography>
        </CardActions>
      </Card>
    </Grid>
  );
}
