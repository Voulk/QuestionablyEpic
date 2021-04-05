// This module will be focused on BC mostly, Until Retail reintroduces tier sets

import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../../../General/Modules/SetupAndMenus/QEMainMenu";
import TierObject from "./TierObject";
// import "./Legendaries.css";
import { useTranslation } from "react-i18next";
import ReactGA from "react-ga";
import { Grid, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  header: {
    [theme.breakpoints.down("sm")]: {
      margin: "auto",
      width: "70%",
      justifyContent: "space-between",
      display: "block",
      marginTop: "120px",
    },
    [theme.breakpoints.down("md")]: {
      margin: "auto",
      width: "70%",
      justifyContent: "space-between",
      display: "block",
      marginTop: "120px",
    },
    [theme.breakpoints.down("lg")]: {
      margin: "auto",
      width: "70%",
      justifyContent: "space-between",
      display: "block",
      marginTop: "120px",
    },
    [theme.breakpoints.up("xl")]: {
      margin: "auto",
      width: "70%",
      justifyContent: "space-between",
      display: "block",
    },
  },
}));

export default function LegendaryCompare(props) {
  const classes = useStyles();
  const contentType = useSelector((state) => state.contentType);
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  const { t, i18n } = useTranslation();

  let tierSets = [
    {
      name: { en: "Justicar Raiment", de: "Gewandung des Rechtsprechers", fr: "Grande tenue de justicier", ru: "Одеяния вершителя правосудия", ch: "公正圣装" },
      spec: "Holy Paladin",
      slots: {
        head: { id: 29061, icon: require("Images/BurningCrusade/TierSetIcons/inv_helmet_77.jpg").default },
        shoulder: { id: 29064, icon: require("Images/BurningCrusade/TierSetIcons/inv_shoulder_40.jpg").default },
        chest: { id: 29062, icon: require("Images/BurningCrusade/TierSetIcons/inv_chest_plate18.jpg").default },
        wrist: { id: -1, icon: -1 },
        hands: { id: 29065, icon: require("Images/BurningCrusade/TierSetIcons/inv_gauntlets_40.jpg").default },
        waist: { id: -1, icon: -1 },
        legs: { id: 29063, icon: require("Images/BurningCrusade/TierSetIcons/inv_pants_plate_22.jpg").default },
        boots: { id: -1, icon: -1 },
      },
      twoSet: {
        effect: {
          en: "(2) Increases the amount healed by your Flash of Light by 5%",
          de: "(2) Erhöht den von Eurem Zauber 'Lichtblitz' geheilten Wert um 5%.",
          fr: "(2) Augmente le montant de points de vie rendus par votre Éclair lumineux de 5%.",
          ru: "(2) Увеличивает количество здоровья, восстанавливаемого заклинанием 'Вспышка света', на 5%.",
          ch: "(2) 使你的圣光闪现治疗量提高5%.",
        },
        hps: 100,
      },
      fourSet: {
        effect: {
          en: "(4) Reduces the cooldown on your Avenging Wrath ability by 15 sec",
          de: "(4) Verringert die Abklingzeit Eurer Fähigkeit 'Zornige Vergeltung' um 15 Sek.",
          fr: "(4) Réduit le temps de recharge de votre technique Courroux vengeur de 15 s.",
          ru: "(4) Уменьшает время восстановления 'Гнева карателя' на 15 сек.",
          cn: "(4) 复仇之怒的冷却时间缩短15秒。",
        },
        hps: 300,
      },
    },
    {
      name: { en: "Crystalforge Raiment", de: "Kristallgeschmiedete Gewandung", fr: "Grande tenue de Cristalforge", ru: "Одеяния Хрустальной Кузницы", ch: "晶铸圣装" },
      spec: "Holy Paladin",
      slots: {
        head: { id: 30136, icon: require("Images/BurningCrusade/TierSetIcons/inv_helmet_78.jpg").default },
        shoulder: { id: 30138, icon: require("Images/BurningCrusade/TierSetIcons/inv_shoulder_41.jpg").default },
        chest: { id: 30134, icon: require("Images/BurningCrusade/TierSetIcons/inv_chest_plate19.jpg").default },
        wrist: { id: -1, icon: -1 },
        hands: { id: 30135, icon: require("Images/BurningCrusade/TierSetIcons/inv_gauntlets_41.jpg").default },
        waist: { id: -1, icon: -1 },
        legs: { id: 30137, icon: require("Images/BurningCrusade/TierSetIcons/inv_pants_plate_23.jpg").default },
        boots: { id: -1, icon: -1 },
      },
      twoSet: {
        effect: {
          en: "(2) Each time you cast a Judgment, your party members gain 50 mana.",
          de: "(2) Jedes Mal, wenn Ihr ein Richturteil wirkt, erhalten Eure Gruppenmitglieder 50 Mana.",
          fr: "(2) Chaque fois que vous lancez un Jugement, les membres de votre groupe reçoivent 50 points de mana.",
          ru: "(2) Каждый раз, когда вы свершаете 'Правосудие', участники вашей группы получают 50 ед. маны.",
          ch: "(2) 你每次施放审判法术，你的小队成员都获得50点法力值。",
        },
        hps: 100,
      },
      fourSet: {
        effect: {
          en:
            "(4) Your critical heals from Flash of Light and Holy Light reduce the cast time of your next Holy Light spell by 0.50 sec for 10 sec. This effect cannot occur more than once per minute.",
          de:
            "(4) Eure kritischen Heilungen mit 'Lichtblitz' und 'Heiliges Licht' verringern die Zauberzeit Eures nächsten Einsatzes von 'Heiliges Licht' oder 'Lichtblitz' 10 sec lang um 0.50 Sek. Dieser Effekt kann nicht häufiger als einmal pro Minute auftreten.",
          fr:
            "(4) Les effets critiques obtenus avec les sorts Éclair lumineux et Lumière sacrée réduisent le temps d’incantation de votre prochain sort Lumière sacrée ou Éclair lumineux de 0.50 s pendant 10 sec. Cet effet ne peut se produire plus d’une fois par minute.",
          ru:
            "(4) Если 'Вспышка Света' или 'Свет небес' имеет критический эффект, время применения следующего 'Света небес' или 'Вспышки Света' сокращается на 0.50 сек. Время действия – 10 sec. Срабатывает не чаще чем раз в минуту.",
          ch: "(4) 你的圣光闪现和圣光术的爆击效果可以使你的下一次圣光术或圣光闪现的施法时间减少0.50秒，持续10 sec。这个效果每1分钟只能触发一次。",
        },
        hps: 300,
      },
    },
    {
      name: { en: "Lightbringer Raiment", de: "Gewandung des Lichtbringers", fr: "Grande tenue de porteur de Lumière", ru: "Одеяния Светоносного", ch: "光明使者圣服" },
      spec: "Holy Paladin",
      slots: {
        head: { id: 30988, icon: require("Images/BurningCrusade/TierSetIcons/inv_helmet_96.jpg").default },
        shoulder: { id: 30996, icon: require("Images/BurningCrusade/TierSetIcons/inv_shoulder_60.jpg").default },
        chest: { id: 30992, icon: require("Images/BurningCrusade/TierSetIcons/inv_chest_plate_22.jpg").default },
        wrist: { id: 34432, icon: require("Images/BurningCrusade/TierSetIcons/inv_bracer_02.jpg").default },
        hands: { id: 30983, icon: require("Images/BurningCrusade/TierSetIcons/inv_gauntlets_60.jpg").default },
        waist: { id: 34487, icon: require("Images/BurningCrusade/TierSetIcons/inv_belt_27.jpg").default },
        legs: { id: 30994, icon: require("Images/BurningCrusade/TierSetIcons/inv_pants_plate_26.jpg").default },
        boots: { id: 34559, icon: require("Images/BurningCrusade/TierSetIcons/inv_boots_chain_08.jpg").default },
      },
      twoSet: {
        effect: {
          en: "(2) Increases the spell power of your Flash of Light ability by 5%.",
          de: "(2) Erhöht die Zaubermacht Eures Zaubers 'Lichtblitz' um 5%.",
          fr: "(2) Augmente de 5% la puissance de votre technique Éclair lumineux.",
          ru: "(2) Увеличивает силу заклинания 'Вспышка Света' на 5%.",
          ch: "(2) 使你的圣光闪现的法术强度提高5%。",
        },
        hps: 100,
      },
      fourSet: {
        effect: {
          en: "(4) Increases the critical strike chance of your Holy Light ability by 5%.",
          de: "(4) Erhöht die Chance für einen kritischen Treffer Eures Zaubers 'Heiliges Licht' um 5%.",
          fr: "(4) Augmente de 5% vos chances de réaliser un coup critique avec votre technique Lumière sacrée.",
          ru: "(4) Повышает вероятность критического эффекта заклинания 'Свет небес' на 5%.",
          ch: "(4) 使你的圣光术的爆击几率提高5%。",
        },
        hps: 300,
      },
    },
  ];

  return (
    <div className={classes.header}>
      <Grid item container spacing={1} direction="row">
        {/* ---------------------------------------- Module Title ---------------------------------------- */}
        <Grid item xs={12}>
          <Typography color="primary" variant="h4" align="center" style={{ paddingBottom: 16 }}>
            {t("TierSets.Title")}
          </Typography>
        </Grid>
        {/* ------------------------------ Map the Legendary list into Cards ----------------------------- */}
        <Grid item container spacing={1} direction="row">
          {tierSets
            .filter((filter) => filter.spec === props.player["spec"])
            .map((set, index) => (
              <TierObject key={index} set={set} player={props.player} />
            ))}
        </Grid>
      </Grid>
    </div>
  );
}
