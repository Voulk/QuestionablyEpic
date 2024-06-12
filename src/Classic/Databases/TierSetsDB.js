export const tierSets = [
  /* ---------------------------------------------------------------------------------------------- */
  /*                                 Shaman Tier 4 [Cyclone Raiment]                                */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: { en: "Cyclone Raiment", de: "Gewandung des Orkans", fr: "Grande tenue du cyclone", ru: "Одеяния Смерча", ch: "飓风圣装" },
    spec: "Restoration Shaman",
    slots: {
      head: { id: 29028, icon: require("Images/Classic/TierSetIcons/inv_helmet_15.jpg").default },
      shoulder: { id: 29031, icon: require("Images/Classic/TierSetIcons/inv_shoulder_14.jpg").default },
      chest: { id: 29029, icon: require("Images/Classic/TierSetIcons/inv_chest_chain_15.jpg").default },
      wrist: { id: -1, icon: -1 },
      hands: { id: 29032, icon: require("Images/Classic/TierSetIcons/inv_gauntlets_25.jpg").default },
      waist: { id: -1, icon: -1 },
      legs: { id: 29030, icon: require("Images/Classic/TierSetIcons/inv_pants_mail_15.jpg").default },
      boots: { id: -1, icon: -1 },
    },
    twoSet: {
      effect: {
        en: "(2) Your Mana Spring Totem ability grants an additional 3 mana every 2 sec.",
        de: "(2) Euer Totem der Manaquelle gewährt alle 2 Sek. zusätzlich 3 Mana.",
        fr: "(2) Votre technique Totem Fontaine de mana donne 3 points de mana supplémentaires toutes les 2 s.",
        ru: "(2) Ваш тотем источника маны восполняет дополнительно 3 ед. маны раз в 2 сек.",
        ch: "(2) 你的法力之泉图腾每2秒恢复的法力值提高3点。",
      },
      hps: 100,
    },
    fourSet: {
      effect: {
        en: "(4) Reduces the cooldown on your Ancestral Swiftness ability by 24 sec.",
        de: "(4) Verringert die Abklingzeit Eurer Fähigkeit 'Schnelligkeit der Ahnen' um 24 Sek.",
        fr: "(4) Réduit le temps de recharge de votre technique Rapidité ancestrale de 24 s.",
        ru: "(4) Уменьшает время восстановления 'Стремительности предков' на 24 сек.",
        cn: "(4) 使你的先祖迅捷技能的冷却时间缩短24秒。",
      },
      hps: 300,
    },
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                Shaman Tier 5 [Cataclysm Raiment]                               */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: { en: "Cataclysm Raiment", de: "Gewandung der Verheerung", fr: "Grande tenue du cataclysme", ru: "Одеяния Катаклизма", ch: "灾难圣装" },
    spec: "Restoration Shaman",
    slots: {
      head: { id: 30166, icon: require("Images/Classic/TierSetIcons/inv_helmet_54.jpg").default },
      shoulder: { id: 30168, icon: require("Images/Classic/TierSetIcons/inv_shoulder_14.jpg").default },
      chest: { id: 30164, icon: require("Images/Classic/TierSetIcons/inv_chest_plate08.jpg").default },
      wrist: { id: -1, icon: -1 },
      hands: { id: 30165, icon: require("Images/Classic/TierSetIcons/inv_gauntlets_25.jpg").default },
      waist: { id: -1, icon: -1 },
      legs: { id: 30167, icon: require("Images/Classic/TierSetIcons/inv_pants_mail_15.jpg").default },
      boots: { id: -1, icon: -1 },
    },
    twoSet: {
      effect: {
        en: "(2) Reduces the cost of your Healing Surge spell by 5%.",
        de: "(2) Verringert die Kosten Eures Zaubers 'Heilende Woge' um 5%.",
        fr: "(2) Réduit le coût de votre sort Afflux de soins de 5%.",
        ru: "(2) Снижает расход маны на заклинание 'Исцеляющий всплеск' на 5%.",
        ch: "(2) 使你的治疗之涌法术消耗的法力值减少5%。",
      },
      hps: 100,
    },
    fourSet: {
      effect: {
        en:
          "(4) Your critical heals from Healing Wave, Healing Surge, and Chain Heal reduce the cast time of your next Healing Wave spell by 0.50 sec for 10 sec. This effect cannot occur more than once per minute.",
        de:
          "(4) Eure kritischen Heilungen mit 'Welle der Heilung', 'Heilende Woge' und 'Kettenheilung' verringern die Zauberzeit Eures nächsten Zaubers 'Welle der Heilung' 10 sec lang um 0.50 Sek. Dieser Effekt kann nicht häufiger als einmal pro Minute auftreten.",
        fr:
          "(4) Vos effets critiques obtenus avec les sorts Vague de soins, Afflux de soins et Salve de guérison réduisent le temps d’incantation de votre prochaine Vague de soins de 0.50 s pendant 10 sec. Cet effet ne peut se produire plus d’une fois par minute.",
        ru:
          "(4) В случае критического эффекта ваших 'Волны исцеления', 'Исцеляющего всплеска' и 'Цепного исцеления' время применения следующей 'Волны исцеления' сокращается на 0.50 сек. на 10 sec. Срабатывает не чаще одного раза в минуту.",
        cn: "(4) 你的治疗波、治疗之涌和治疗链法术的爆击效果会使你的下一次治疗波的施法时间缩短0.50秒，持续10 sec。这个效果每1分钟只能触发一次。",
      },
      hps: 300,
    },
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                 Shaman T6 [Skyshatter Raiment]                                 */
  /* ---------------------------------------------------------------------------------------------- */

  {
    name: { en: "Skyshatter Raiment", de: "Gewandung des Himmelsdonners", fr: "Grande tenue Brise-ciel", ru: "Одеяния Небокрушителя", ch: "破天圣服" },
    spec: "Restoration Shaman",
    slots: {
      head: { id: 31012, icon: require("Images/Classic/TierSetIcons/inv_helmet_97.jpg").default },
      shoulder: { id: 31022, icon: require("Images/Classic/TierSetIcons/inv_shoulder_61.jpg").default },
      chest: { id: 31016, icon: require("Images/Classic/TierSetIcons/inv_chest_mail_04.jpg").default },
      wrist: { id: 34438, icon: require("Images/Classic/TierSetIcons/inv_bracer_02.jpg").default },
      hands: { id: 31007, icon: require("Images/Classic/TierSetIcons/inv_gauntlets_61.jpg").default },
      waist: { id: 34543, icon: require("Images/Classic/TierSetIcons/inv_belt_13.jpg").default },
      legs: { id: 31019, icon: require("Images/Classic/TierSetIcons/inv_pants_mail_25.jpg").default },
      boots: { id: 34565, icon: require("Images/Classic/TierSetIcons/inv_boots_chain_08.jpg").default },
    },
    twoSet: {
      effect: {
        en: "(2) Your Chain Heal ability costs 10% less mana.",
        de: "(2) Euer Zauber 'Kettenheilung' kostet 10% weniger Mana.",
        fr: "(2) Votre technique Salve de guérison coûte 10% de mana en moins.",
        ru: "(2) Снижает расход маны на заклинание 'Цепное исцеление' на 10%.",
        ch: "(2) 你的治疗链所消耗的法力值减少10%。",
      },
      hps: 100,
    },
    fourSet: {
      effect: {
        en: "(4) Increases the amount healed by your Chain Heal ability by 5%.",
        de: "(4) Erhöht den durch Euren Zauber 'Kettenheilung' geheilten Wert um 5%.",
        fr: "(4) Augmente le montant de points de vie rendus par votre technique Salve de guérison de 5%.",
        ru: "(4) Повышает эффективность вашего заклинания 'Цепное исцеление' на 5%.",
        cn: "(4) 使你的治疗链所恢复的生命值提高5%。",
      },
      hps: 300,
    },
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                             Holy Priest Tier 4 [Incarnate Raiment]                             */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: { en: "Incarnate Raiment", de: "Gewandung des Leibhaftigen", fr: "Grande tenue des incarnés", ru: "Одеяния Воплощения", ch: "化身圣装" },
    spec: "Holy Priest",
    slots: {
      head: { id: 29049, icon: require("Images/Classic/TierSetIcons/inv_helmet_91.jpg").default },
      shoulder: { id: 29054, icon: require("Images/Classic/TierSetIcons/inv_shoulder_55.jpg").default },
      chest: { id: 29050, icon: require("Images/Classic/TierSetIcons/inv_chest_cloth_64.jpg").default },
      wrist: { id: -1, icon: -1 },
      hands: { id: 29055, icon: require("Images/Classic/TierSetIcons/inv_gauntlets_55.jpg").default },
      waist: { id: -1, icon: -1 },
      legs: { id: 29053, icon: require("Images/Classic/TierSetIcons/inv_pants_cloth_25.jpg").default },
      boots: { id: -1, icon: -1 },
    },
    twoSet: {
      effect: {
        en: "(2) Your Prayer of Healing spell now also causes an additional 150 healing over 9 sec.",
        de: "(2) Euer Zauber 'Gebet der Heilung' heilt zusätzlich 150 Gesundheit über 9 sec",
        fr: "(2) Votre sort Prière de soins rend aussi 150 points de vie supplémentaires en 9 sec.",
        ru: "(2) Ваше заклинание 'Молитва исцеления' теперь дополнительно восстанавливает 150 ед. здоровья в течение 9 sec.",
        ch: "(2) 你的治疗祷言法术会附加一个9 sec内恢复150点生命值的治疗效果。",
      },
      hps: 100,
    },
    fourSet: {
      effect: {
        en: "(4) Each time you cast Flash Heal, your next Heal cast within 15 sec has its casting time reduced by 0.1, stacking up to 5 times.",
        de: "(4) Jedes Mal, wenn Ihr 'Blitzheilung' wirkt, wird die Zauberzeit Eures nächsten Einsatzes von 'Heilung' innerhalb von 15 sec um 0.1 verringert. Bis zu 5-mal stapelbar.",
        fr: "(4) Chaque fois que vous lancez Soins rapides, votre prochain sort Soins lancé dans les 15 sec voit son temps d’incantation réduit de 0.1. Cumulable jusqu’à 5 fois.",
        ru: "(4) Каждый раз, когда вы используете 'Быстрое исцеление', время применения вашего следующего 'Исцеления', примененного в течение 15 sec., сокращается на 0.1 сек. Суммируется до 5 раз.",
        cn: "(4) 每当你施放快速治疗时，15 sec内你的下一个治疗术的施法时间缩短0.1秒，该效果最多可叠加5次。",
      },
      hps: 300,
    },
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                               Holy Priest Tier 5 [Avatar Raiment]                              */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: { en: "Avatar Raiment", de: "Gewandung des Avatars", fr: "Grande tenue de l'avatar", ru: "Одежды аватары", ch: "神使圣装" },
    spec: "Holy Priest",
    slots: {
      head: { id: 30152, icon: require("Images/Classic/TierSetIcons/inv_helmet_93.jpg").default },
      shoulder: { id: 30154, icon: require("Images/Classic/TierSetIcons/inv_shoulder_57.jpg").default },
      chest: { id: 30150, icon: require("Images/Classic/TierSetIcons/inv_chest_cloth_65.jpg").default },
      wrist: { id: -1, icon: -1 },
      hands: { id: 30151, icon: require("Images/Classic/TierSetIcons/inv_gauntlets_57.jpg").default },
      waist: { id: -1, icon: -1 },
      legs: { id: 30153, icon: require("Images/Classic/TierSetIcons/inv_pants_cloth_26.jpg").default },
      boots: { id: -1, icon: -1 },
    },
    twoSet: {
      effect: {
        en: "(2) If your Heal brings the target to full health, you gain 100 mana.",
        de: "(2) Wenn Euer Zauber 'Heilung' das Ziel vollständig heilt, erhaltet Ihr 100 Mana.",
        fr: "(2) Si la cible remonte à son maximum de points de vie grâce à votre sort Soins, vous recevez 100 points de mana.",
        ru: "(2) Если ваше заклинание 'Исцеление' полностью излечивает цель, вы восполняете 100 ед. маны.",
        ch: "(2) 如果你的治疗术为目标恢复满生命值，则会获得100点法力值。",
      },
      hps: 100,
    },
    fourSet: {
      effect: {
        en: "(4) Increases the healing of Flash Heal by 15%.",
        de: "(4) Erhöht die durch 'Blitzheilung' hervorgerufene Heilung um 15%.",
        fr: "(4) Augmente de 15% les soins prodigués par Soins rapides.",
        ru: "(4) Усиливает исцеляющий эффект заклинания 'Быстрое исцеление' на 15%.",
        cn: "(4) 快速治疗的治疗效果提高15%。",
      },
      hps: 300,
    },
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                          Holy Priest Tier 6 [Vestments of Absolution]                          */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: { en: "Vestments of Absolution", de: "Gewänder der Absolution", fr: "Habits d'absolution", ru: "Облачение Освобождения ", ch: "赦免圣装" },
    spec: "Holy Priest",
    slots: {
      head: { id: 31063, icon: require("Images/Classic/TierSetIcons/inv_helmet_99.jpg").default },
      shoulder: { id: 31069, icon: require("Images/Classic/TierSetIcons/inv_shoulder_63.jpg").default },
      chest: { id: 31066, icon: require("Images/Classic/TierSetIcons/inv_chest_cloth_66.jpg").default },
      wrist: { id: 34435, icon: require("Images/Classic/TierSetIcons/inv_bracer_10.jpg").default },
      hands: { id: 31060, icon: require("Images/Classic/TierSetIcons/inv_gauntlets_63.jpg").default },
      waist: { id: 34527, icon: require("Images/Classic/TierSetIcons/inv_belt_07.jpg").default },
      legs: { id: 31068, icon: require("Images/Classic/TierSetIcons/inv_pants_cloth_27.jpg").default },
      boots: { id: 34562, icon: require("Images/Classic/TierSetIcons/inv_boots_cloth_08.jpg").default },
    },
    twoSet: {
      effect: {
        en: "(2) Reduces the mana cost of your Prayer of Healing ability by 10%.",
        de: "(2) Verringert die Manakosten Eures Zaubers 'Gebet der Heilung' um 10%.",
        fr: "(2) Réduit le coût en mana de votre technique Prière de soins de 10%.",
        ru: "(2) Снижает затраты маны на заклинание 'Молитва исцеления' на 10%.",
        ch: "(2) 使你的治疗祷言法术所消耗的法力值减少10%。",
      },
      hps: 100,
    },
    fourSet: {
      effect: {
        en: "(4) Increases the healing from your Heal ability by 5%.",
        de: "(4) Erhöht die Heilwirkung Eures Zaubers 'Heilung' um 5%.",
        fr: "(4) Augmente de 5% les soins prodigués par votre technique Soins.",
        ru: "(4) Повышает эффективность заклинания 'Исцеление' на 5%.",
        cn: "(4) 使你的治疗术的治疗效果提高5%。",
      },
      hps: 300,
    },
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                           Restoration Druid Tier 4 [Marlorne Raiment]                          */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: { en: "Stormrider's Vestments" },
    spec: "Restoration Druid",
    slots: {
      head: { id: 65195 },
      shoulder: { id: 65198 },
      chest: { id: 65197 },
      hands: { id: 65194 },
      legs: { id: 65196 },
    },
    twoSet: {
      effect: {
        en: "(2) Increases the crit chance of the periodic portion of Lifebloom by 5%.",
      },
      hps: 100,
    },
    fourSet: {
      effect: {
        en: "(4) Grants 540 Spirit for 6s while you have the Harmony buff.",
      },
      hps: 300,
    },
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                              Restoration Druid Tier 5                                */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: { en: "Obsidian Arborweave Vestments" },
    spec: "Restoration Druid",
    slots: {
      head: { id: 71492 },
      shoulder: { id: 71495 },
      chest: { id: 71494 },
      hands: { id: 71491 },
      legs: { id: 71493 },
    },
    twoSet: {
      effect: {
        en: "(2) Lifebloom periodic healing has a 40% chance to restore 1% of base mana.",
      },
      hps: 0,
    },
    fourSet: {
      effect: {
        en: "(4) Your Swiftmend also heals an injured target within 15 yards.",
      },
      hps: 0,
    },
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                     Restoration Druid Tier 13                             */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: { en: "Deep Earth Vestments" },
    spec: "Restoration Druid",
    slots: {
      head: { id: 78690 },
      shoulder: { id: 78740 },
      chest: { id: 78660 },
      hands: { id: 78680 },
      legs: { id: 78710 },
    },
    twoSet: {
      effect: {
        en: "(2) Reduces the mana cost of Healing Touch and Rejuvenation by 5%.",
      },
      hps: 0,
    },
    fourSet: {
      effect: {
        en: "(4) Your Rejuvenation and Regrowth HoTs have a 10% chance to have double the duration.",
      },
      hps: 0,
    },
  },
  /* ---------------------------------------------------------------------------------------------- */
  /*                                       Holy Paladin Tier 11                                      */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: { en: "Reinforced Sapphirium Regalia" },
    spec: "Holy Paladin",
    slots: {
      head: { id: 60359 },
      shoulder: { id: 60362 },
      chest: { id: 60360 },
      hands: { id: 60363 },
      legs: { id: 60361 },
    },
    twoSet: {
      effect: {
        en: "(2) Increases the crit chance of your Holy Light by 5%.",
      },
      hps: 100,
    },
    fourSet: {
      effect: {
        en: "(4) Grants 540 Spirit for 6s after you cast Holy Shock.",
      },
      hps: 300,
    },
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                       Holy Paladin Tier 8                                      */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: { en: "Regalia of Immolation" },
    spec: "Holy Paladin",
    slots: {
      head: { id: 71093 },
      shoulder: { id: 71095 },
      chest: { id: 71091 },
      hands: { id: 71092 },
      legs: { id: 71094 },
    },
    twoSet: {
      effect: {
        en: "(2) Healing with Holy Shock has a 40% chance to grant you 6% of your base mana.",
      },
      hps: 0,
    },
    fourSet: {
      effect: {
        en: "Your Divine Light, Flash of Light, and Holy Light spells also heal an injured target within 15 yards for 10% of the amount healed.",
      },
      hps: 0,
    },
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                      Holy Paladin Tier 13                                       */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: { en: "Regalia of Radiant Glory" },
    spec: "Holy Paladin",
    slots: {
      head: { id: 76767 },
      shoulder: { id: 76769 },
      chest: { id: 76765 },
      hands: { id: 76766 },
      legs: { id: 76768 },

    },
    twoSet: {
      effect: {
        en: "(2) After using Divine Favor, the mana cost of your healing spells is reduced by 25% for 15 sec.",
      },
      hps: 100,
    },
    fourSet: {
      effect: {
        en: "(4) Increases the healing done by your Holy Radiance spell by 5%.",
      },
      hps: 0,
    },
  },
];
