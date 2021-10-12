export const characterImageStyle = (race) => {
  let style = {
    backgroundRepeat: "no-repeat",
    textAlign: "center",
    position: "relative",
    border: "1px solid rgb(118, 118, 118)",
    // flex: "1 1 10%",
    height: 82,
    width: 82,
    borderRadius: 4,
  };
  switch (race) {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                             Checked                                            */
    /* ---------------------------------------------------------------------------------------------- */
    case "Races.Draenei":
      Object.assign(style, {
        backgroundPosition: "center 28%",
        backgroundSize: "auto 500%",
      });
      break;

    case "Races.Lightforged Draenei":
      Object.assign(style, {
        // backgroundPosition: "center 28%",
        // backgroundSize: "auto 500%",
      });
      break;

    case "Races.Dwarf":
      Object.assign(style, {
        backgroundPosition: "center 44%",
        backgroundSize: "auto 450%",
      });
      break;

    case "Races.Dark Iron Dwarf":
      Object.assign(style, {
        backgroundPosition: "center 44%",
        backgroundSize: "auto 450%",
      });
      break;

    case "Races.Pandaren":
      Object.assign(style, {
        backgroundPosition: "center 36%",
        backgroundSize: "auto 460%",
      });
      break;

    default:
      Object.assign(style, {
        backgroundPosition: "center 28%",
        backgroundSize: "auto 500%",
      });
      break;

    /* ---------------------------------------------------------------------------------------------- */
    /*                                            UnChecked                                           */
    /* ---------------------------------------------------------------------------------------------- */

    //   "Races.Gnome",
    //   "Races.Human",
    //   "Races.Night Elf",
    //   "Races.Worgen",
    //   "Races.Void Elf",
    //   "Races.Kul Tiran",
    //   "Races.Mechagnome",
    //   "Races.Pandaren",
    //   "Races.Blood Elf",
    //   "Races.Goblin",
    //   "Races.Tauren",
    //   "Races.Troll",
    //   "Races.Undead",
    //   "Races.Nightborne",
    //   "Races.Mag'har Orc",
    //   "Races.Zandalari Troll",
    //   "Races.Vulpera",
  }

  return style;
};
