export const tierSets = [
  /* ---------------------------------------------------------------------------------------------- */
  /*                                 Shaman Tier 4 [Cyclone Raiment]                                */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: { en: "Cyclone Raiment", de: "Gewandung des Orkans", fr: "Grande tenue du cyclone", ru: "Одеяния Смерча", ch: "飓风圣装" },
    spec: "Restoration Shaman",
    slots: {
      head: { id: 29028, icon: require("Images/BurningCrusade/TierSetIcons/inv_helmet_15.jpg") },
      shoulder: { id: 29031, icon: require("Images/BurningCrusade/TierSetIcons/inv_shoulder_14.jpg") },
      chest: { id: 29029, icon: require("Images/BurningCrusade/TierSetIcons/inv_chest_chain_15.jpg") },
      wrist: { id: -1, icon: -1 },
      hands: { id: 29032, icon: require("Images/BurningCrusade/TierSetIcons/inv_gauntlets_25.jpg") },
      waist: { id: -1, icon: -1 },
      legs: { id: 29030, icon: require("Images/BurningCrusade/TierSetIcons/inv_pants_mail_15.jpg") },
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
      head: { id: 30166, icon: require("Images/BurningCrusade/TierSetIcons/inv_helmet_54.jpg") },
      shoulder: { id: 30168, icon: require("Images/BurningCrusade/TierSetIcons/inv_shoulder_14.jpg") },
      chest: { id: 30164, icon: require("Images/BurningCrusade/TierSetIcons/inv_chest_plate08.jpg") },
      wrist: { id: -1, icon: -1 },
      hands: { id: 30165, icon: require("Images/BurningCrusade/TierSetIcons/inv_gauntlets_25.jpg") },
      waist: { id: -1, icon: -1 },
      legs: { id: 30167, icon: require("Images/BurningCrusade/TierSetIcons/inv_pants_mail_15.jpg") },
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
      head: { id: 31012, icon: require("Images/BurningCrusade/TierSetIcons/inv_helmet_97.jpg") },
      shoulder: { id: 31022, icon: require("Images/BurningCrusade/TierSetIcons/inv_shoulder_61.jpg") },
      chest: { id: 31016, icon: require("Images/BurningCrusade/TierSetIcons/inv_chest_mail_04.jpg") },
      wrist: { id: 34438, icon: require("Images/BurningCrusade/TierSetIcons/inv_bracer_02.jpg") },
      hands: { id: 31007, icon: require("Images/BurningCrusade/TierSetIcons/inv_gauntlets_61.jpg") },
      waist: { id: 34543, icon: require("Images/BurningCrusade/TierSetIcons/inv_belt_13.jpg") },
      legs: { id: 31019, icon: require("Images/BurningCrusade/TierSetIcons/inv_pants_mail_25.jpg") },
      boots: { id: 34565, icon: require("Images/BurningCrusade/TierSetIcons/inv_boots_chain_08.jpg") },
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
      head: { id: 29049, icon: require("Images/BurningCrusade/TierSetIcons/inv_helmet_91.jpg") },
      shoulder: { id: 29054, icon: require("Images/BurningCrusade/TierSetIcons/inv_shoulder_55.jpg") },
      chest: { id: 29050, icon: require("Images/BurningCrusade/TierSetIcons/inv_chest_cloth_64.jpg") },
      wrist: { id: -1, icon: -1 },
      hands: { id: 29055, icon: require("Images/BurningCrusade/TierSetIcons/inv_gauntlets_55.jpg") },
      waist: { id: -1, icon: -1 },
      legs: { id: 29053, icon: require("Images/BurningCrusade/TierSetIcons/inv_pants_cloth_25.jpg") },
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
      head: { id: 30152, icon: require("Images/BurningCrusade/TierSetIcons/inv_helmet_93.jpg") },
      shoulder: { id: 30154, icon: require("Images/BurningCrusade/TierSetIcons/inv_shoulder_57.jpg") },
      chest: { id: 30150, icon: require("Images/BurningCrusade/TierSetIcons/inv_chest_cloth_65.jpg") },
      wrist: { id: -1, icon: -1 },
      hands: { id: 30151, icon: require("Images/BurningCrusade/TierSetIcons/inv_gauntlets_57.jpg") },
      waist: { id: -1, icon: -1 },
      legs: { id: 30153, icon: require("Images/BurningCrusade/TierSetIcons/inv_pants_cloth_26.jpg") },
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
      head: { id: 31063, icon: require("Images/BurningCrusade/TierSetIcons/inv_helmet_99.jpg") },
      shoulder: { id: 31069, icon: require("Images/BurningCrusade/TierSetIcons/inv_shoulder_63.jpg") },
      chest: { id: 31066, icon: require("Images/BurningCrusade/TierSetIcons/inv_chest_cloth_66.jpg") },
      wrist: { id: 34435, icon: require("Images/BurningCrusade/TierSetIcons/inv_bracer_10.jpg") },
      hands: { id: 31060, icon: require("Images/BurningCrusade/TierSetIcons/inv_gauntlets_63.jpg") },
      waist: { id: 34527, icon: require("Images/BurningCrusade/TierSetIcons/inv_belt_07.jpg") },
      legs: { id: 31068, icon: require("Images/BurningCrusade/TierSetIcons/inv_pants_cloth_27.jpg") },
      boots: { id: 34562, icon: require("Images/BurningCrusade/TierSetIcons/inv_boots_cloth_08.jpg") },
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
    name: { en: "Malorne Raiment", de: "Malornes Gewandung", fr: "Grande tenue de Malorne", ru: "Одеяния Малорна", ch: "玛洛恩圣装" },
    spec: "Restoration Druid",
    slots: {
      head: { id: 29086, icon: require("Images/BurningCrusade/TierSetIcons/inv_helmet_81.jpg") },
      shoulder: { id: 29089, icon: require("Images/BurningCrusade/TierSetIcons/inv_shoulder_44.jpg") },
      chest: { id: 29087, icon: require("Images/BurningCrusade/TierSetIcons/inv_chest_leather_11.jpg") },
      wrist: { id: -1, icon: -1 },
      hands: { id: 29090, icon: require("Images/BurningCrusade/TierSetIcons/inv_gauntlets_44.jpg") },
      waist: { id: -1, icon: -1 },
      legs: { id: 29088, icon: require("Images/BurningCrusade/TierSetIcons/inv_pants_leather_22.jpg") },
      boots: { id: -1, icon: -1 },
    },
    twoSet: {
      effect: {
        en: "(2) Your helpful spells have a chance to restore up to 120 mana.",
        de: "(2) Gewährt Euren unterstützenden Zaubern die Chance, bis zu 120 Mana wiederherzustellen.",
        fr: "(2) Vos sorts bénéfiques ont une chance de rendre un maximum de 120 points de mana.",
        ru: "(2) Ваши помогающие заклинания могут восполнить до 120 ед. маны.",
        ch: "(2) 你的有益法术有一定几率为你恢复最多120点法力值。",
      },
      hps: 100,
    },
    fourSet: {
      effect: {
        en: "(4) Reduces the cooldown on your Nature's Swiftness ability by 24 sec.",
        de: "(4) Verringert die Abklingzeit Eurer Fähigkeit 'Schnelligkeit der Natur' um 24 Sek.",
        fr: "(4) Réduit le temps de recharge de votre technique Rapidité de la nature de 24 s.",
        ru: "(4) Уменьшает время восстановления 'Природной стремительности' на 24 сек.",
        cn: "(4) 使你的自然迅捷技能的冷却时间缩短24秒。",
      },
      hps: 300,
    },
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                          Restoration Druid Tier 5 [Nordrassil Raiment]                         */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: { en: "Nordrassil Raiment", de: "Gewandung von Nordrassil", fr: "Grande tenue de Nordrassil", ru: "Одеяния Нордрассила", ch: "玛洛恩圣装" },
    spec: "Restoration Druid",
    slots: {
      head: { id: 30219, icon: require("Images/BurningCrusade/TierSetIcons/inv_helmet_85.jpg") },
      shoulder: { id: 30221, icon: require("Images/BurningCrusade/TierSetIcons/inv_shoulder_48.jpg") },
      chest: { id: 30216, icon: require("Images/BurningCrusade/TierSetIcons/inv_chest_leather_12.jpg") },
      wrist: { id: -1, icon: -1 },
      hands: { id: 30217, icon: require("Images/BurningCrusade/TierSetIcons/inv_gauntlets_48.jpg") },
      waist: { id: -1, icon: -1 },
      legs: { id: 30220, icon: require("Images/BurningCrusade/TierSetIcons/inv_pants_leather_23.jpg") },
      boots: { id: -1, icon: -1 },
    },
    twoSet: {
      effect: {
        en: "(2) Increases the duration of your Regrowth spell by 6 sec.",
        de: "(2) Erhöht die Dauer Eures Zaubers 'Nachwachsen' um 6 Sek.",
        fr: "(2) Augmente la durée de votre sort Rétablissement de 6 s.",
        ru: "(2) Увеличивает время действия 'Восстановления' на 6 сек.",
        ch: "(2) 你的有益法术有一定几率为你恢复最多120点法力值。",
      },
      hps: 100,
    },
    fourSet: {
      effect: {
        en: "(4) Increases the final amount healed by your Lifebloom spell by 150.",
        de: "(4) Erhöht die sofortige Heilung Eurer Fähigkeit 'Blühendes Leben' um 150.",
        fr: "(4) Augmente de 150 la quantité finale de points de vie rendus par votre sort Fleur de vie.",
        ru: "(4) Уменьшает время восстановления 'Природной стремительности' на 24 сек.",
        cn: "(4) Увеличивает финальный объем здоровья, восполняемого 'Жизнецветом', на 150 ед.",
      },
      hps: 300,
    },
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                         Restoration Druid Tier 6 [Thunderheart Raiment]                        */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: { en: "Thunderheart Raiment", de: "Gewandung des Donnerherzens", fr: "Grande tenue Cœur-de-tonnerre", ru: "Одеяния Громового сердца", ch: "雷霆之心圣服" },
    spec: "Restoration Druid",
    slots: {
      head: { id: 31037, icon: require("Images/BurningCrusade/TierSetIcons/inv_helmet_94.jpg") },
      shoulder: { id: 31047, icon: require("Images/BurningCrusade/TierSetIcons/inv_shoulder_58.jpg") },
      chest: { id: 31041, icon: require("Images/BurningCrusade/TierSetIcons/inv_chest_leather_15.jpg") },
      wrist: { id: 34445, icon: require("Images/BurningCrusade/TierSetIcons/inv_bracer_08.jpg") },
      hands: { id: 31032, icon: require("Images/BurningCrusade/TierSetIcons/inv_gauntlets_58.jpg") },
      waist: { id: 34554, icon: require("Images/BurningCrusade/TierSetIcons/inv_belt_24.jpg") },
      legs: { id: 31045, icon: require("Images/BurningCrusade/TierSetIcons/inv_pants_leather_26.jpg") },
      boots: { id: 34571, icon: require("Images/BurningCrusade/TierSetIcons/inv_boots_08.jpg") },
    },
    twoSet: {
      effect: {
        en: "(2) Reduces the cooldown of your Swiftmend ability by 2 sec.",
        de: "(2) Verringert die Abklingzeit Eures Zaubers 'Rasche Heilung' um 2 Sek.",
        fr: "(2) Réduit le temps de recharge de votre technique Prompte guérison de 2 s.",
        ru: "(2) Сокращает время восстановления способности 'Быстрое восстановление' на 2 сек.",
        ch: "(2) 你的迅捷治愈技能的冷却时间缩短2秒。",
      },
      hps: 100,
    },
    fourSet: {
      effect: {
        en: "(4) Increases the healing from your Healing Touch ability by 5%.",
        de: "(4) Erhöht die durch Euren Zauber 'Heilende Berührung' hervorgerufene Heilung um 5%.",
        fr: "(4) Augmente de 5% les soins prodigués par votre technique Toucher guérisseur.",
        ru: "(4) Увеличивает эффективность 'Целительного прикосновения' на 5%.",
        cn: "(4) 治疗之触的治疗效果提高5%。",
      },
      hps: 300,
    },
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                             Holy Paladin Tier 4 [Justicar Raiment]                             */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: { en: "Justicar Raiment", de: "Gewandung des Rechtsprechers", fr: "Grande tenue de justicier", ru: "Одеяния вершителя правосудия", ch: "公正圣装" },
    spec: "Holy Paladin",
    slots: {
      head: { id: 29061, icon: require("Images/BurningCrusade/TierSetIcons/inv_helmet_77.jpg") },
      shoulder: { id: 29064, icon: require("Images/BurningCrusade/TierSetIcons/inv_shoulder_40.jpg") },
      chest: { id: 29062, icon: require("Images/BurningCrusade/TierSetIcons/inv_chest_plate18.jpg") },
      wrist: { id: -1, icon: -1 },
      hands: { id: 29065, icon: require("Images/BurningCrusade/TierSetIcons/inv_gauntlets_40.jpg") },
      waist: { id: -1, icon: -1 },
      legs: { id: 29063, icon: require("Images/BurningCrusade/TierSetIcons/inv_pants_plate_22.jpg") },
      boots: { id: -1, icon: -1 },
    },
    twoSet: {
      effect: {
        en: "(2) Increases the amount healed by your Judgment of Light by 20.",
        de: "(2) Increases the amount healed by your Judgment of Light by 20.",
        fr: "(2) Increases the amount healed by your Judgment of Light by 20.",
        ru: "(2) Increases the amount healed by your Judgment of Light by 20.",
        ch: "(2) Increases the amount healed by your Judgment of Light by 20.",
      },
      hps: 100,
    },
    fourSet: {
      effect: {
        en: "(4) Reduces the cooldown on your Divine Favor ability by 15 sec.",
        de: "(4) Reduces the cooldown on your Divine Favor ability by 15 sec.",
        fr: "(4) Reduces the cooldown on your Divine Favor ability by 15 sec.",
        ru: "(4) Reduces the cooldown on your Divine Favor ability by 15 sec",
        cn: "(4) Reduces the cooldown on your Divine Favor ability by 15 sec",
      },
      hps: 300,
    },
  },

  /* ---------------------------------------------------------------------------------------------- */
  /*                           Holy Paladin Tier 5 [Crystalforge Raiment]                           */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: { en: "Crystalforge Raiment", de: "Kristallgeschmiedete Gewandung", fr: "Grande tenue de Cristalforge", ru: "Одеяния Хрустальной Кузницы", ch: "晶铸圣装" },
    spec: "Holy Paladin",
    slots: {
      head: { id: 30136, icon: require("Images/BurningCrusade/TierSetIcons/inv_helmet_78.jpg") },
      shoulder: { id: 30138, icon: require("Images/BurningCrusade/TierSetIcons/inv_shoulder_41.jpg") },
      chest: { id: 30134, icon: require("Images/BurningCrusade/TierSetIcons/inv_chest_plate19.jpg") },
      wrist: { id: -1, icon: -1 },
      hands: { id: 30135, icon: require("Images/BurningCrusade/TierSetIcons/inv_gauntlets_41.jpg") },
      waist: { id: -1, icon: -1 },
      legs: { id: 30137, icon: require("Images/BurningCrusade/TierSetIcons/inv_pants_plate_23.jpg") },
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
        en: "(4) Your critical heals from Flash of Light and Holy Light reduce the cast time of your next Holy Light spell by 0.50 sec for 10 sec. This effect cannot occur more than once per minute.",
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

  /* ---------------------------------------------------------------------------------------------- */
  /*                           Holy Paladin Tier 6 [ Lightbringer Raiment]                          */
  /* ---------------------------------------------------------------------------------------------- */
  {
    name: { en: "Lightbringer Raiment", de: "Gewandung des Lichtbringers", fr: "Grande tenue de porteur de Lumière", ru: "Одеяния Светоносного", ch: "光明使者圣服" },
    spec: "Holy Paladin",
    slots: {
      head: { id: 30988, icon: require("Images/BurningCrusade/TierSetIcons/inv_helmet_96.jpg") },
      shoulder: { id: 30996, icon: require("Images/BurningCrusade/TierSetIcons/inv_shoulder_60.jpg") },
      chest: { id: 30992, icon: require("Images/BurningCrusade/TierSetIcons/inv_chest_plate_22.jpg") },
      wrist: { id: 34432, icon: require("Images/BurningCrusade/TierSetIcons/inv_bracer_02.jpg") },
      hands: { id: 30983, icon: require("Images/BurningCrusade/TierSetIcons/inv_gauntlets_60.jpg") },
      waist: { id: 34487, icon: require("Images/BurningCrusade/TierSetIcons/inv_belt_27.jpg") },
      legs: { id: 30994, icon: require("Images/BurningCrusade/TierSetIcons/inv_pants_plate_26.jpg") },
      boots: { id: 34559, icon: require("Images/BurningCrusade/TierSetIcons/inv_boots_chain_08.jpg") },
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
