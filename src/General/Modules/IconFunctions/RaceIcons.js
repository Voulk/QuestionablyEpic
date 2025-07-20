
import BloodElfMale from "Images/Races/BloodElf/BloodElfMale.jpg";
import BloodElfFemale from "Images/Races/BloodElf/BloodElfFemale.jpg";
import DarkIronMale from "Images/Races/DarkIron/DarkIronMale.jpg";
import DarkIronFemale from "Images/Races/DarkIron/DarkIronFemale.jpg";
import DraeneiMale from "Images/Races/Draenei/DraeneiMale.jpg";
import DraeneiFemale from "Images/Races/Draenei/DraeneiFemale.jpg";
import DwarfMale from "Images/Races/Dwarf/DwarfMale.jpg";
import DwarfFemale from "Images/Races/Dwarf/DwarfFemale.jpg";
import GnomeMale from "Images/Races/Gnome/GnomeMale.jpg";
import GnomeFemale from "Images/Races/Gnome/GnomeFemale.jpg";
import GoblinMale from "Images/Races/Goblin/GoblinMale.jpg";
import GoblinFemale from "Images/Races/Goblin/GoblinFemale.jpg";
import HighmountainMale from "Images/Races/Highmountain/HighmountainMale.jpg";
import HighmountainFemale from "Images/Races/Highmountain/HighmountainFemale.jpg";
import HumanMale from "Images/Races/Human/HumanMale.jpg";
import HumanFemale from "Images/Races/Human/HumanFemale.jpg";
import KultiranMale from "Images/Races/Kultiran/KultiranMale.jpg";
import KultiranFemale from "Images/Races/Kultiran/KultiranFemale.jpg";
import LightforgedMale from "Images/Races/Lightforged/LightforgedMale.jpg";
import LightforgedFemale from "Images/Races/Lightforged/LightforgedFemale.jpg";
import MagharMale from "Images/Races/Maghar/MagharMale.jpg";
import MagharFemale from "Images/Races/Maghar/MagharFemale.jpg";
import MechagnomeMale from "Images/Races/Mechagnome/MechagnomeMale.jpg";
import MechagnomeFemale from "Images/Races/Mechagnome/MechagnomeFemale.jpg";
import NightborneMale from "Images/Races/Nightborne/NightborneMale.jpg";
import NightborneFemale from "Images/Races/Nightborne/NightborneFemale.jpg";
import NightElfMale from "Images/Races/NightElf/NightElfMale.jpg";
import NightElfFemale from "Images/Races/NightElf/NightElfFemale.jpg";
import OrcMale from "Images/Races/Orc/OrcMale.jpg";
import OrcFemale from "Images/Races/Orc/OrcFemale.jpg";
import PandarenMale from "Images/Races/Pandaren/PandarenMale.jpg";
import PandarenFemale from "Images/Races/Pandaren/PandarenFemale.jpg";
import TaurenMale from "Images/Races/Tauren/TaurenMale.jpg";
import TaurenFemale from "Images/Races/Tauren/TaurenFemale.jpg";
import TrollMale from "Images/Races/Troll/TrollMale.jpg";
import TrollFemale from "Images/Races/Troll/TrollFemale.jpg";
import UndeadMale from "Images/Races/Undead/UndeadMale.jpg";
import UndeadFemale from "Images/Races/Undead/UndeadFemale.jpg";
import VoidElfMale from "Images/Races/VoidElf/VoidElfMale.jpg";
import VoidElfFemale from "Images/Races/VoidElf/VoidElfFemale.jpg";
import VulperaMale from "Images/Races/Vulpera/VulperaMale.jpg";
import VulperaFemale from "Images/Races/Vulpera/VulperaFemale.jpg";
import WorgenMale from "Images/Races/Worgen/WorgenMale.jpg";
import WorgenFemale from "Images/Races/Worgen/WorgenFemale.jpg";
import ZandalariMale from "Images/Races/Zandalari/ZandalariMale.jpg";
import ZandalariFemale from "Images/Races/Zandalari/ZandalariFemale.jpg";
import Dracthyr from "Images/Races/Dracthyr/ui_dracthyr.jpg";


export const getRacePath = (race) => {
  let sources = {male: "", female: ""};

  if (race === "Blood Elf") {
    sources.male = BloodElfMale;
    sources.female = BloodElfFemale;

  }
  if (race === "Dark Iron Dwarf") {
    sources.male = DarkIronMale;
    sources.female = DarkIronFemale;

  }
  if (race === "Draenei") {
    sources.male = DraeneiMale;
    sources.female = DraeneiFemale;

  }
  if (race === "Dwarf") {
    sources.male = DwarfMale;
    sources.female = DwarfFemale;

  }
  if (race === "Gnome") {
    sources.male = GnomeMale;
    sources.female = GnomeFemale;

  }
  if (race === "Goblin") {
    sources.male = GoblinMale;
    sources.female = GoblinFemale;

  }
  if (race === "Highmountain Tauren") {
    sources.male = HighmountainMale;
    sources.female = HighmountainFemale;

  }
  if (race === "Human") {
    sources.male = HumanMale;
    sources.female = HumanFemale;

  }
  if (race === "Kul Tiran") {
    sources.male = KultiranMale;
    sources.female = KultiranFemale;

  }
  if (race === "Lightforged Draenei") {
    sources.male = LightforgedMale;
    sources.female = LightforgedFemale;

  }
  if (race === "Mag'har Orc") {
    sources.male = MagharMale;
    sources.female = MagharFemale;

  }
  if (race === "Mechagnome") {
    sources.male = MechagnomeMale;
    sources.female = MechagnomeFemale;

  }
  if (race === "Nightborne") {
    sources.male = NightborneMale;
    sources.female = NightborneFemale;

  }
  if (race === "Night Elf") {
    sources.male = NightElfMale;
    sources.female = NightElfFemale;

  }
  if (race === "Orc") {
    sources.male = OrcMale;
    sources.female = OrcFemale;

  }
  if (race === "Pandaren") {
    sources.male = PandarenMale;
    sources.female = PandarenFemale;

  }
  if (race === "Tauren") {
    sources.male = TaurenMale;
    sources.female = TaurenFemale;

  }
  if (race === "Troll") {
    sources.male = TrollMale;
    sources.female = TrollFemale;

  }
  if (race === "Undead") {
    sources.male = UndeadMale;
    sources.female = UndeadFemale;

  }
  if (race === "Void Elf") {
    sources.male = VoidElfMale;
    sources.female = VoidElfFemale;

  }
  if (race === "Vulpera") {
    sources.male = VulperaMale;
    sources.female = VulperaFemale;

  }
  if (race === "Worgen") {
    sources.male = WorgenMale;
    sources.female = WorgenFemale;

  }
  if (race === "Zandalari Troll") {
    sources.male = ZandalariMale;
    sources.female = ZandalariFemale;

  }
  if (race === "Zandalari Troll") {
    sources.male = ZandalariMale;
    sources.female = ZandalariFemale;

  }
  if (race === "Earthen") {
    sources.male = DwarfMale;
    sources.female = DwarfFemale;

  }
  if (race === "Dracthyr") {
    sources.male = Dracthyr;
    sources.female = Dracthyr;
  }

  return sources;
}

export const getRaceIcon = (race, gender) => {
  const icons = getRacePath(race);

  if (gender === "both") {
    return (
      <div>
        <img
          style={{
            height: 20,
            width: 20,
            margin: "0px 5px 0px 5px",
            verticalAlign: "middle",
            borderRadius: "4px",
            border: "1px solid rgba(255, 255, 255, 0.12)",
          }}
          src={icons.male}
          alt={""}
        />
        <img
          style={{
            height: 20,
            width: 20,
            margin: "0px 5px 0px 5px",
            verticalAlign: "middle",
            borderRadius: "4px",
            border: "1px solid rgba(255, 255, 255, 0.12)",
          }}
          src={icons.female}
          alt={""}
        /> 
      </div>
    )
  }
  else {
    return (
        <img
          style={{
            height: 20,
            width: 20,
            margin: "0px 5px 0px 5px",
            verticalAlign: "middle",
            borderRadius: "4px",
            border: "1px solid rgba(255, 255, 255, 0.12)",
          }}
          src={icons[gender]}
          alt={""}
        />
  )}
}

