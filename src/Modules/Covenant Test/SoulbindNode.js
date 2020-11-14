import React from "react";
import { getSoulbindFormula } from "../Engine/EffectFormulas/Generic/GenericSoulbindFormulas";
import Select from "@material-ui/core/Select";
import Popover from "@material-ui/core/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { getConduitName } from "./CovenantUtilities";
import Paper from "@material-ui/core/Paper";

const columnPos = [195, 290, 385];
const rowPos = [10, 85, 160, 235, 310, 385, 460, 535, 610];

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

const itemQuality = (quality) => {
  switch (quality) {
    case "Legendary":
      return "#ff8000";
      break;
    case "Epic":
      return "#a335ee";
      break;
    case "Uncommon":
      return "#328CE3";
      break;
    case "Common":
      return "#1eff00";
      break;
    default:
      return "#fff";
  }
};

// Creates a text based string from a given array of bonus_stats.
function getBenefitString(bonus_stats) {
  let benefitString = "";
  Object.entries(bonus_stats).forEach(([key, value]) => {
    if (value !== 0) benefitString += key + ": " + Math.round(value);
  });

  return benefitString;
}

function getLocalizedName(trait, type, lang = "en") {
  if (type.includes("Conduit") && trait.slotted_id > 0) {
    return getConduitName(trait.slotted_id);
  } else {
    return trait.names[lang]; // Replace with a database lookup based on language.
  }
}

export default function SoulbindNode(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log("Event: " + event.currentTarget);

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
  const name = getLocalizedName(trait, type);
  const icon = process.env.PUBLIC_URL + "/Images/Icons/" + trait.icon;
  const containerIcon =
    "/Images/Interface/soulbindcontainer" +
    (name.includes("Conduit") ? "hex" : "circle") +
    (trait.active ? "active" : "") +
    ".png";

  let stat_bonus = trait.bonus_stats;
  let position = {
    row: trait.position[0],
    column: trait.position[1],
  };

  const conduitCollection =
    type === "Potency Conduit"
      ? props.potencyConduits
      : type === "Endurance Conduit"
      ? props.enduranceConduits
      : [];
  const benefitString = getBenefitString(stat_bonus);

  // The CSS here is a bit of a nightmare. TODO.
  return (
    <div
      id={9}
      style={{
        backgroundColor: "forestgreen",
        width: "100%",
        borderRadius: "50%",
      }}
    >
      <img
        onClick={handleClick}
        width={48}
        height={48}
        src={process.env.PUBLIC_URL + containerIcon}
        style={{
          position: "absolute",
          zIndex: 2,
          left: columnPos[position.column],
          top: rowPos[position.row],
        }}
      />
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
          top: rowPos[position.row] + 5,
        }}
      />
      <Paper
        variant="outlined"
        style={{
          fontSize: 10,
          zIndex: 40,
          color: "Goldenrod",
          textAlign: "center",
          position: "absolute",
          left: columnPos[position.column] - 18,
          top: rowPos[position.row] + 34,
          padding: "2px 5px",
        }}
      >
        <div>{name}</div>
        <div>{benefitString}</div>
      </Paper>
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
          {conduitCollection.map((conduit, index) => (
            <MenuItem
              style={{ padding: "5px 10px" }}
              dense={true}
              onClick={() => setConduit(conduit.id)}
            >
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
