

interface StatLocale {
  en: string;
  fr: string;
  de: string;
  ru: string;
  ch: string;
}


const statTranslations: Record<string, StatLocale> = {
  avoidance: { en: "Avoidance", fr: "", de: "", ru: "", ch: "" },
  crit: { en: "Crit", fr: "Score de crit", de: "Kritische Trefferwertung", ru: "Критический удар", ch: "" },
  haste: { en: "Haste", fr: "Hâte", de: "Tempo", ru: "Скорость", ch: "" },
  intellect: { en: "Intellect", fr: "Intelligence", de: "Intelligenz", ru: "Интеллект", ch: "" },
  leech: { en: "Leech", fr: "Leech", de: "Lebensraub", ru: "Самоисцеление", ch: "" },
  mana: { en: "Mana", fr: "", de: "", ru: "", ch: "" },
  mastery: { en: "Mastery", fr: "Maîtrise", de: "Meisterschaft", ru: "Искусность", ch: "" },
  versatility: { en: "Versatility", fr: "Versatilité", de: "Vielseitigkeit", ru: "универсальность", ch: "" },
  stamina: { en: "Stamina", fr: "Endurance", de: "Ausdauer", ru: "Выносливость", ch: "" },
  armor: { en: "Armor", fr: "Armure", de: "Rüstung", ru: "Броня", ch: "" },
  absorb: { en: "Absorb", fr: "Absorber", de: "Absorbieren", ru: "Поглощение", ch: "" },
};

/**
 * Returns a translated stat name.
 * * @param stat - The stat string (e.g., 'Haste' or 'haste')
 * @param currentLanguage - The language code (e.g., 'de')
 */
export const getTranslatedStats = (stat: string, currentLanguage: SupportedLanguages = "en"): string => {
  if (!stat) return "";

  const key = stat.toLowerCase();
  const entry = statTranslations[key];

  if (!entry) return stat; // Return original string if stat isn't in DB

  return entry[currentLanguage] || entry.en || stat;
};