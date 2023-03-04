export const defensiveDB = [
  /* ---------------------------------------------------------------------------------------------- */
  /*                                              Mage                                              */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: {
      en: "Mirror Image",
      fr: "Image miroir",
      de: "Spiegelbild",
      ru: "Зеркальное изображение",
      ch: "镜像",
    },
    guid: 55342,
    icon: require("Images/Classes/Mage/Icons/spell_magic_lesserinvisibilty.jpg").default,
    duration: 40,
    cooldown: 120,
    class: "Mage",
  },
  {
    name: {
      en: "Blazing Barrier",
      fr: "Barrière flamboyante",
      de: "Lodernde Barriere",
      ru: "Пылающая преграда",
      ch: "烈焰护体",
    },
    guid: 235313,
    icon: require("Images/Classes/Mage/Icons/ability_mage_moltenarmor.jpg").default,
    duration: 60,
    cooldown: 25,
    class: "Mage",
  },
  {
    name: {
      en: "Ice Barrier",
      fr: "Barrière de glace",
      de: "Eisbarriere",
      ru: "Ледяная преграда",
      ch: "寒冰护体",
    },
    guid: 11426,
    icon: require("Images/Classes/Mage/Icons/spell_ice_lament.jpg").default,
    duration: 60,
    cooldown: 25,
    class: "Mage",
  },
  {
    name: {
      en: "Prismatic Barrier",
      fr: "Barrière prismatique",
      de: "Prismatische Barriere",
      ru: "Призматический барьер",
      ch: "棱光护体",
    },
    guid: 235450,
    icon: require("Images/Classes/Mage/Icons/spell_magearmor.jpg").default,
    duration: 60,
    cooldown: 25,
    class: "Mage",
  },
  {
    name: {
      en: "Ice Block",
      fr: "Bloc de glace",
      de: "Eisblock",
      ru: "Ледяная глыба",
      ch: "寒冰屏障",
    },
    guid: 45438,
    icon: require("Images/Classes/Mage/Icons/spell_frost_frost.jpg").default,
    duration: 10,
    cooldown: 240,
    class: "Mage",
  },
  /* ---------------------------------------------------------------------------------------------- */
  /*                                             Warlock                                            */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: {
      en: "Dark Pact",
      fr: "Sombre pacte",
      de: "Dunkler Pakt",
      ru: "Темный пакт",
      ch: "黑暗契约",
    },
    guid: 108416,
    icon: require("Images/Classes/Warlock/Icons/spell_shadow_deathpact.jpg").default,
    duration: 20,
    cooldown: 60,
    class: "Warlock",
  },
  {
    name: {
      en: "Unending Resolve",
      fr: "Résolution interminable",
      de: "Erbarmungslose Entschlossenheit",
      ru: "Твердая решимость",
      ch: "不灭决心",
    },
    guid: 104773,
    icon: require("Images/Classes/Warlock/Icons/spell_shadow_demonictactics.jpg").default,
    duration: 8,
    cooldown: 180,
    class: "Warlock",
  },
  /* ---------------------------------------------------------------------------------------------- */
  /*                                             Priest                                             */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: {
      en: "Desperate Prayer",
      fr: "Prière du désespoir",
      de: "Verzweifeltes Gebet",
      ru: "Молитва отчаяния",
      ch: "绝望祷言",
    },
    guid: 19236,
    icon: require("Images/Classes/Priest/Icons/spell_holy_testoffaith.jpg").default,
    duration: 10,
    cooldown: 90,
    class: "Priest",
  },
  {
    name: {
      en: "Fade",
      fr: "Disparition",
      de: "Verblassen",
      ru: "Уход в тень",
      ch: "渐隐术",
    },
    guid: 586,
    icon: require("Images/Classes/Priest/Icons/spell_magic_lesserinvisibilty.jpg").default,
    duration: 10,
    cooldown: 30,
    class: "Priest",
  },
  /* ---------------------------------------------------------------------------------------------- */
  /*                                              Rogue                                             */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: {
      en: "Cloak of Shadows",
      fr: "Cape d'ombre",
      de: "Mantel der Schatten",
      ru: "Плащ теней",
      ch: "暗影斗篷",
    },
    guid: 31224,
    icon: require("Images/Classes/Rogue/Icons/spell_shadow_nethercloak.jpg").default,
    duration: 5,
    cooldown: 120,
    class: "Rogue",
  },
  {
    name: {
      en: "Evasion",
      fr: "Évasion",
      de: "Entrinnen",
      ru: "Ускользание",
      ch: "闪避",
    },
    guid: 5277,
    icon: require("Images/Classes/Rogue/Icons/spell_shadow_shadowward.jpg").default,
    duration: 10,
    cooldown: 120,
    class: "Rogue",
    type: "dodgeable",
  },
  {
    name: {
      en: "Feint",
      fr: "Feinte",
      de: "Finte",
      ru: "Уловка",
      ch: "佯攻",
    },
    guid: 1966,
    icon: require("Images/Classes/Rogue/Icons/ability_rogue_feint.jpg").default,
    duration: 6,
    cooldown: 15,
    class: "Rogue",
  },
  /* ---------------------------------------------------------------------------------------------- */
  /*                                              Druid                                             */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: {
      en: "Barkskin",
      fr: "Ecorce",
      de: "Baumrinde",
      ru: "Дубовая кожа",
      ch: "树皮术",
    },
    guid: 22812,
    icon: require("Images/Classes/Druid/Icons/spell_nature_stoneclawtotem.jpg").default,
    duration: 8,
    cooldown: 60,
    reduction: 0.2,
    type: "All", // The type of damage the DR applies to.
    class: "Druid",
  },
  {
    name: {
      en: "Survival Instincts",
      fr: "Instincts de survie",
      de: "Überlebensinstinkte",
      ru: "Инстинкты выживания",
      ch: "生存本能",
    },
    guid: 61336,
    icon: require("Images/Classes/Druid/Icons/ability_druid_tigersroar.jpg").default,
    duration: 6,
    cooldown: 180,
    class: "Druid",
  },
  /* ---------------------------------------------------------------------------------------------- */
  /*                                          Demon Hunter                                          */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: {
      en: "Blur",
      fr: "Voile corrompu",
      de: "Verschwimmen",
      ru: "Затуманивание",
      ch: "疾影",
    },
    guid: 198589,
    icon: require("Images/Classes/DemonHunter/ability_demonhunter_blur.jpg").default,
    duration: 10,
    cooldown: 60,
    class: "DemonHunter",
  },
  {
    name: {
      en: "Netherwalk",
      fr: "Marche du Néant",
      de: "Netherwandeln",
      ru: "Путь Пустоты",
      ch: "虚空行走",
    },
    guid: 196555,
    icon: require("Images/Classes/DemonHunter/spell_warlock_demonsoul.jpg").default,
    duration: 6,
    cooldown: 180,
    class: "DemonHunter",
  },
  /* ---------------------------------------------------------------------------------------------- */
  /*                                          Death Knight                                          */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: {
      en: "Icebound Fortitude",
      fr: "Robustesse glaciale",
      de: "Eisige Gegenwehr",
      ru: "Незыблемость льда",
      ch: "冰封之韧",
    },
    guid: 48792,
    icon: require("Images/Classes/DeathKnight/spell_deathknight_iceboundfortitude.jpg").default,
    duration: 8,
    cooldown: 180,
    class: "DeathKnight",
  },
  {
    name: {
      en: "Anti-Magic Shell",
      fr: "Carapace anti-magie",
      de: "Antimagische Hülle",
      ru: "Антимагический панцирь",
      ch: "反魔法护罩",
    },
    guid: 48707,
    icon: require("Images/Classes/DeathKnight/spell_shadow_antimagicshell.jpg").default,
    duration: 5,
    cooldown: 60,
    class: "DeathKnight",
  },
  /* ---------------------------------------------------------------------------------------------- */
  /*                                             Hunter                                             */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: {
      en: "Aspect of the Turtle",
      fr: "Aspect de la tortue",
      de: "Aspekt der Schildkröte",
      ru: "Дух черепахи",
      ch: "灵龟守护",
    },
    guid: 186265,
    icon: require("Images/Classes/Hunter/Icons/ability_hunter_pet_turtle.jpg").default,
    duration: 8,
    cooldown: 180,
    class: "Hunter",
  },
  {
    name: {
      en: "Exhilaration",
      fr: "Enthousiasme",
      de: "Freudentaumel",
      ru: "Живость",
      ch: "意气风发",
    },
    guid: 109304,
    icon: require("Images/Classes/Hunter/Icons/ability_hunter_onewithnature.jpg").default,
    duration: 1,
    cooldown: 120,
    class: "Hunter",
  },
  /* ---------------------------------------------------------------------------------------------- */
  /*                                             Shaman                                             */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: {
      en: "Astral Shift",
      fr: "Transfert astral",
      de: "Astralverschiebung",
      ru: "Астральный сдвиг",
      ch: "星界转移",
    },
    guid: 108271,
    icon: require("Images/Classes/Shaman/Icons/ability_shaman_astralshift.jpg").default,
    duration: 8,
    cooldown: 90,
    class: "Shaman",
  },
  /* ---------------------------------------------------------------------------------------------- */
  /*                                             Paladin                                            */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: {
      en: "Divine Shield",
      fr: "Bouclier divin",
      de: "Gottesschild",
      ru: "Божественный щит",
      ch: "圣盾术",
    },
    guid: 642,
    icon: require("Images/Classes/Paladin/Spells/spell_holy_divineshield.jpg").default,
    duration: 8,
    cooldown: 300,
    class: "Paladin",
  },
  {
    name: {
      en: "Divine Protection",
      fr: "Protection divine",
      de: "Göttlicher Schutz",
      ru: "Божественная защита",
      ch: "圣佑术",
    },
    guid: 498,
    icon: require("Images/Classes/Paladin/Spells/spell_holy_divineprotection.jpg").default,
    duration: 8,
    cooldown: 60,
    class: "Paladin",
  },
  /* ---------------------------------------------------------------------------------------------- */
  /*                                             Warrior                                            */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: {
      en: "Ignore Pain",
      fr: "Dur au mal",
      de: "Zähne zusammenbeißen",
      ru: "Стойкость к боли",
      ch: "无视苦痛",
    },
    guid: 190456,
    icon: require("Images/Classes/Warrior/ability_warrior_renewedvigor.jpg").default,
    duration: 1,
    cooldown: 12,
    class: "Warrior",
  },
  {
    name: {
      en: "Spell Reflection",
      fr: "Renvoi de sort",
      de: "Zauberreflexion",
      ru: "Отражение заклинаний",
      ch: "法术反射",
    },
    guid: 335255,
    icon: require("Images/Classes/Warrior/ability_warrior_shieldreflection.jpg").default,
    duration: 5,
    cooldown: 25,
    class: "Warrior",
  },
  {
    name: {
      en: "Die by the Sword",
      fr: "Par le fil de l’épée",
      de: "Durch das Schwert umkommen",
      ru: "Бой насмерть",
      ch: "剑在人在",
    },
    guid: 118038,
    icon: require("Images/Classes/Warrior/ability_warrior_challange.jpg").default,
    duration: 8,
    cooldown: 180,
    class: "Warrior",
  },
  /* ---------------------------------------------------------------------------------------------- */
  /*                                              Monk                                              */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: {
      en: "Fortifying Brew",
      fr: "Boisson fortifiante",
      de: "Stärkendes Gebräu",
      ru: "Укрепляющий отвар",
      ch: "壮胆酒",
    },
    guid: 243435,
    icon: require("Images/Classes/Monk/Spells/ability_monk_fortifyingale_new.jpg").default,
    duration: 15,
    cooldown: 420,
    class: "Monk",
  },
  {
    name: {
      en: "Diffuse Magic",
      fr: "Diffusion de la magie",
      de: "Magiediffusion",
      ru: "Распыление магии",
      ch: "散魔功",
    },
    guid: 122783,
    icon: require("Images/Classes/Monk/Spells/spell_monk_diffusemagic.jpg").default,
    duration: 6,
    cooldown: 90,
    class: "Monk",
  },
  {
    name: {
      en: "Dampen Harm",
      fr: "Atténuation du mal",
      de: "Schaden dämpfen",
      ru: "Смягчение удара",
      ch: "躯不坏",
    },
    guid: 122278,
    icon: require("Images/Classes/Monk/Spells/ability_monk_dampenharm.jpg").default,
    duration: 10,
    cooldown: 120,
    class: "Monk",
  },

  {
    name: {
      en: "Obsidian Scales",
      fr: "Écailles d’obsidienne",
      de: "Obsidianschuppen",
      ru: "Обсидиановая чешуя",
      ch: "黑曜鳞片",
    },
    guid: 363916,
    icon: require("Images/Classes/Evoker/inv_artifact_dragonscales.jpg").default,
    duration: 12,
    cooldown: 150,
    class: "Evoker",
    reduction: 0.3,
    type: "All", // The type of damage the DR applies to.
  },
];

export const defensiveTalentsDB = [
  {
    name: {
      en: "Inherent Resistance",
    },
    guid: 375544,
    icon: require("Images/Classes/Evoker/inv_misc_rubysanctum1.jpg").default,
    class: "Evoker",
    reduction: 0.04,
    type: "Magic", // The type of damage the DR applies to.
    talent: true,
  },

];
