import React from "react";
// import { getSoulbindFormula } from "../../Engine/EffectFormulas/Generic/GenericSoulbindFormulas";
import { Menu, MenuItem, Paper } from "@material-ui/core";
import { getConduitName, filterConduits, getCovenant } from "../CovenantUtilities";
import { useTranslation } from "react-i18next";
import { getEstimatedHPS } from "../CovenantUtilities";
import { getConduitFormula } from "../../../Engine/EffectFormulas/EffectEngine";

/* ---------------------------------------------------------------------------------------------- */
/*                                         Node Positions                                         */
/* ---------------------------------------------------------------------------------------------- */

const columnPos = [
  /* ----------------------------------------- Left Column ---------------------------------------- */
  200,
  /* ---------------------------------------- Middle Column --------------------------------------- */
  290,
  /* ---------------------------------------- Right Column ---------------------------------------- */
  380,
];
const rowPos = [
  /* ----------------------------------------- Left Column ---------------------------------------- */
  [
    20, // Row 0
    100, // Row 1
    180, // Row 2
    260, // Row 3
    340, // Row 4
    420, // Row 5
    500, // Row 6
    580, // Row 7
    660, // Row 8
    740, // Row 9
    820, // Row 10
    900, // Row 11
  ],

  /* ---------------------------------------- Middle Column --------------------------------------- */
  [
    5, // Row 0
    85, // Row 1
    165, // Row 2
    245, // Row 3
    325, // Row 4
    405, // Row 5
    515, // Row 6
    595, // Row 7
    675, // Row 8
    750, // Row 9
    830, // Row 10
    915, // Row 11
  ],

  /* ---------------------------------------- Right Column ---------------------------------------- */
  [
    20, // Row 0
    100, // Row 1
    180, // Row 2
    260, // Row 3
    340, // Row 4
    420, // Row 5
    500, // Row 6
    580, // Row 7
    660, // Row 8
    740, // Row 9
    820, // Row 10
    900, // Row 11
  ],
];

const menuStyle = {
  style: { marginTop: 5 },
  MenuListProps: {
    style: { paddingTop: 0, paddingBottom: 0 },
  },
  PaperProps: {
    style: {
      border: "1px solid rgba(255, 255, 255, 0.23)",
    },
  },
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "left",
  },
  getContentAnchorEl: null,
};

/* ---------------------------- Returns Item Quality colour from prop --------------------------- */
const itemQuality = (quality) => {
  switch (quality) {
    case "Legendary":
      return "#ff8000";
    case "Epic":
      return "#a335ee";
    case "Uncommon":
      return "#328CE3";
    case "Common":
      return "#1eff00";
    default:
      return "#fff";
  }
};

/* --------------- Creates a text based string from a given array of bonus_stats. --------------- */
function getBenefitString(bonus_stats) {
  let benefitString = "";
  Object.entries(bonus_stats).forEach(([key, value]) => {
    if (value !== 0 && typeof value === "number" && value !== undefined && !isNaN(value)) {
      benefitString += key + ": " + Math.round(value);
    }
  });
  return benefitString;
}

/* ---------------------- Returns the Localized Name of the Soulbind Trait ---------------------- */
function getLocalizedName(trait, type, lang) {
  if (type.includes("Conduit") && trait.slotted_id > 0) {
    return getConduitName(trait.slotted_id, lang);
  } else {
    return trait.names[lang]; // Replace with a database lookup based on language.
  }
}

function getRowPos(column, row) {
  return rowPos[column][row];
}

export default function SoulbindNode(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const currentRenown = props.player.getRenownLevel();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    if (type === "Soulbind" || trait.slotted_id > 0) {
      props.activateSoulbind(trait.id);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const setConduit = (slottedID) => {
    setAnchorEl(null);
    props.setConduitInSlot(trait.id, slottedID);
  };

  const trait = props.soulbindTrait;
  const type = "type" in trait ? trait.type : "Soulbind"; // Soulbind, Potency Conduit, Endurance Conduit, Finesse Conduit
  const name = getLocalizedName(trait, type, currentLanguage);
  const icon = process.env.PUBLIC_URL + "/Images/Interface/CovenantExploration/Icons/" + trait.icon;

  /* ----- if trait.enhanced > than current renown, normal container, else enhanced container ----- */
  const containerIcon =
    trait.enhanced > currentRenown
      ? "/Images/Interface/CovenantExploration/UI/soulbindcontainer" + (type.includes("Conduit") ? "hex" : "circle") + (trait.active ? "active" : "") + ".png"
      : "/Images/Interface/CovenantExploration/UI/soulbindcontainer" + (type.includes("Conduit") ? "hexenhanced" : "circle") + (trait.active ? "active" : "") + ".png";

  const conduitTag = type.includes("Potency")
    ? "/Images/Interface/CovenantExploration/UI/PotencyConduitImg.png"
    : type.includes("Endurance Conduit")
    ? "/Images/Interface/CovenantExploration/UI/EnduranceConduitImg.png"
    : type.includes("Finesse Conduit")
    ? "/Images/Interface/CovenantExploration/UI/FinesseConduitImg.png"
    : "";

  const covenantName = getCovenant(trait.soulbind);
  const player = props.player;
  //let stat_bonus = trait.bonus_stats;
  const enhanced = props.player.getRenownLevel() >= trait.enhanced;
  let stat_bonus = {}
  if (!trait.slotted_id || trait.slotted_id == -1) stat_bonus = trait.bonus_stats;
  else stat_bonus = getConduitFormula(trait.slotted_id, player, props.contentType, player.getConduitLevel(trait.slotted_id), enhanced);

  let position = {
    row: trait.position[0],
    column: trait.position[1],
  };

  const conduitCollection = type === "Potency Conduit" ? filterConduits(props.potencyConduits, covenantName) : type === "Endurance Conduit" ? props.enduranceConduits : [];

  const benefitString = getBenefitString(stat_bonus);

  const conduitToolTipPEF = (type) => {
    if (type.includes("Potency")) {
      return '<div class="no-wrap">' + t("Soulbinds.PotencyConduit") + "</div>";
    } else if (type.includes("Endurance")) {
      return '<div class="no-wrap">' + t("Soulbinds.EnduranceConduit") + "</div>";
    } else if (type.includes("Finesse")) {
      return '<div class="no-wrap">' + t("Soulbinds.FinesseConduit") + "</div>";
    }
    return "";
  };

  const conduitToolTipSpellID = (type) => {
    if (type.includes("Potency") || type.includes("Endurance") || type.includes("Finesse")) {
      return "";
    }
    return "spell=" + trait.id + "&domain=" + currentLanguage;
  };

  return (
    <div
      id={9}
      style={{
        backgroundColor: "forestgreen",
        width: "100%",
        borderRadius: "50%",
      }}
    >
      <a data-simple-tooltip={conduitToolTipPEF(type)} data-wowhead={conduitToolTipSpellID(type)}>
        {/* --------------------------------------- Container Image -------------------------------------- */}
        <img
          onClick={handleClick}
          width={48}
          height={48}
          src={process.env.PUBLIC_URL + containerIcon}
          style={{
            position: "absolute",
            zIndex: 2,
            left: columnPos[position.column],
            top: getRowPos(position.column, position.row),
          }}
          alt=""
        />
        {/* ----------------------------- Conduit Type Icon - If Conduit Node ---------------------------- */}
        {conduitTag !== "" ? (
          <img
            width={18}
            height={18}
            src={process.env.PUBLIC_URL + conduitTag}
            style={{
              position: "absolute",
              zIndex: 3,
              left: columnPos[position.column] + 15,
              top: getRowPos(position.column, position.row) + 30,
            }}
            alt=""
          />
        ) : (
          ""
        )}
        {/* ----------------------------------------- Trait Icon ----------------------------------------- */}
        <img
          width={38}
          height={38}
          src={icon}
          style={{
            position: "absolute",
            objectFit: "contain",
            borderRadius: "100%",
            zIndex: 1,
            left: columnPos[position.column] + 5,
            top: getRowPos(position.column, position.row) + 5,
          }}
          alt=""
        />
      </a>
      {/* ------------------------------------ Trait Name / Benefits ----------------------------------- */}
      <Paper
        style={{
          fontSize: 10,
          zIndex: 40,
          width: 96,
          color: "Goldenrod",
          textAlign: "center",
          position: "absolute",
          left: columnPos[position.column] - 26,
          top: getRowPos(position.column, position.row) + 46,
          backgroundColor: "rgb(25 28 35 / 65%)",
        }}
      >
        <div>
          <div>{name}</div>
          <div>{benefitString}</div>
        </div>
      </Paper>
      {/* --------------------- Dropdown Menu for conduit selection into containers -------------------- */}
      {type.includes("Conduit") ? (
        <Menu
          MenuListProps={{
            style: { paddingTop: 0, paddingBottom: 0 },
          }}
          PaperProps={{
            style: {
              border: "1px solid rgba(255, 255, 255, 0.23)",
            },
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          style={menuStyle}
          anchorEl={anchorEl}
          keepMounted
          getContentAnchorEl={null}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {/* ------- If conduit in container show "Remove" else Show the list of available conduits ------- */}
          {trait.slotted_id > 0 ? (
            <MenuItem key={-1} dense={true} style={{ padding: "5px 10px" }} onClick={() => setConduit(-1)}>
              {t("Remove")}
            </MenuItem>
          ) : (
            ""
          )}
          {conduitCollection.map((conduit, i) => (
            <MenuItem key={i} style={{ padding: "5px 10px" }} dense={true} onClick={() => setConduit(conduit.id)}>
              <img
                alt=""
                width={24}
                height={24}
                src={conduit.icon}
                style={{
                  borderRadius: 3,
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor: itemQuality("Uncommon"),
                  padding: 0,
                  marginRight: 5,
                }}
              />
              {conduit.name}
            </MenuItem>
          ))}
        </Menu>
      ) : (
        ""
      )}
    </div>
  );
}
