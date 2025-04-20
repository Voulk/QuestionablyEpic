
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

export default function raceIcons(props) {
  let sourceMale = "";
  let sourceFemale = "";
  let source = "";
  let alt = "";

  if (props === "Races.Blood Elf") {
    sourceMale = BloodElfMale;
    sourceFemale = BloodElfFemale;
    alt = "Blood Elf";
  }
  if (props === "Races.Dark Iron Dwarf") {
    sourceMale = DarkIronMale;
    sourceFemale = DarkIronFemale;
    alt = "Dark Iron";
  }
  if (props === "Races.Draenei") {
    sourceMale = DraeneiMale;
    sourceFemale = DraeneiFemale;
    alt = "Draenei";
  }
  if (props === "Races.Dwarf") {
    sourceMale = DwarfMale;
    sourceFemale = DwarfFemale;
    alt = "Dwarf";
  }
  if (props === "Races.Gnome") {
    sourceMale = GnomeMale;
    sourceFemale = GnomeFemale;
    alt = "Gnome";
  }
  if (props === "Races.Goblin") {
    sourceMale = GoblinMale;
    sourceFemale = GoblinFemale;
    alt = "Goblin";
  }
  if (props === "Races.Highmountain Tauren") {
    sourceMale = HighmountainMale;
    sourceFemale = HighmountainFemale;
    alt = "Highmountain";
  }
  if (props === "Races.Human") {
    sourceMale = HumanMale;
    sourceFemale = HumanFemale;
    alt = "Human";
  }
  if (props === "Races.Kul Tiran") {
    sourceMale = KultiranMale;
    sourceFemale = KultiranFemale;
    alt = "Kul Tiran";
  }
  if (props === "Races.Lightforged Draenei") {
    sourceMale = LightforgedMale;
    sourceFemale = LightforgedFemale;
    alt = "Lightforged";
  }
  if (props === "Races.Mag'har Orc") {
    sourceMale = MagharMale;
    sourceFemale = MagharFemale;
    alt = "Mag'har";
  }
  if (props === "Races.Mechagnome") {
    sourceMale = MechagnomeMale;
    sourceFemale = MechagnomeFemale;
    alt = "Mechagnome";
  }
  if (props === "Races.Nightborne") {
    sourceMale = NightborneMale;
    sourceFemale = NightborneFemale;
    alt = "Nightborne";
  }
  if (props === "Races.Night Elf") {
    sourceMale = NightElfMale;
    sourceFemale = NightElfFemale;
    alt = "Night elf";
  }
  if (props === "Races.Orc") {
    sourceMale = OrcMale;
    sourceFemale = OrcFemale;
    alt = "Orc";
  }
  if (props === "Races.Pandaren") {
    sourceMale = PandarenMale;
    sourceFemale = PandarenFemale;
    alt = "Pandaren";
  }
  if (props === "Races.Tauren") {
    sourceMale = TaurenMale;
    sourceFemale = TaurenFemale;
    alt = "Tauren";
  }
  if (props === "Races.Troll") {
    sourceMale = TrollMale;
    sourceFemale = TrollFemale;
    alt = "Troll";
  }
  if (props === "Races.Undead") {
    sourceMale = UndeadMale;
    sourceFemale = UndeadFemale;
    alt = "Undead";
  }
  if (props === "Races.Void Elf") {
    sourceMale = VoidElfMale;
    sourceFemale = VoidElfFemale;
    alt = "Void elf";
  }
  if (props === "Races.Vulpera") {
    sourceMale = VulperaMale;
    sourceFemale = VulperaFemale;
    alt = "Vulpera";
  }
  if (props === "Races.Worgen") {
    sourceMale = WorgenMale;
    sourceFemale = WorgenFemale;
    alt = "Worgen";
  }
  if (props === "Races.Zandalari Troll") {
    sourceMale = ZandalariMale;
    sourceFemale = ZandalariFemale;
    alt = "Zandalari";
  }
  if (props === "Races.Zandalari Troll") {
    sourceMale = ZandalariMale;
    sourceFemale = ZandalariFemale;
    alt = "Zandalari";
  }
  if (props === "Races.Earthen") {
    sourceMale = DwarfMale;
    sourceFemale = DwarfFemale;
    alt = "Earthen";
  }
  if (props === "Races.Dracthyr") {
    source = Dracthyr;
    alt = "Dracthyr";
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
          src={source}
          alt={alt}
        />
      </div>
    );
  }

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
        src={sourceMale}
        alt={alt}
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
        src={sourceFemale}
        alt={alt}
      />
    </div>
  );
}
