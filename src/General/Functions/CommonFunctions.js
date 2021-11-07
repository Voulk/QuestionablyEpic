/* ----- Check the Spec and return the appropriate translation reference ---- */
export const classTranslator = (spec) => {
  switch (spec) {
    case "Restoration Druid":
      return "Classes.RestorationDruid";
    case "Mistweaver Monk":
      return "Classes.MistweaverMonk";
    case "Holy Paladin":
      return "Classes.HolyPaladin";
    case "Restoration Shaman":
      return "Classes.RestorationShaman";
    case "Holy Priest":
      return "Classes.HolyPriest";
    case "Discipline Priest":
      return "Classes.DisciplinePriest";
    case "Holy Paladin BC":
      return "Classes.Holy Paladin BC";
    case "Restoration Druid BC":
      return "Classes.Restoration Druid";
    case "Holy Priest BC":
      return "Classes.Holy Priest";
    case "Restoration Shaman BC":
      return "Classes.Restoration Shaman";
    default:
      return "Error";
  }
};
