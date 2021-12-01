export const legendaryNameTranslator = (legendaryEffectName) => {
  let legendaryDetails = {};

  switch (legendaryEffectName) {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                              Druid                                             */
    /* ---------------------------------------------------------------------------------------------- */
    case "Vision of Unending Growth":
      legendaryDetails = {
        en: {
          name: "Vision of Unending Growth",
          slot: "Head, Feet, Legs (recommended)",
          desc: "Rejuvenation has a 2.5% chance to create a new Rejuvenation on a nearby target on tick.",
          droploc: "Torghast, Fracture Chambers, Layer 3+",
        },
        de: {
          name: "Vision des unendlichen Wachstums",
          slot: "Kopf, Füße",
          desc: "Heilung von 'Verjüngung' hat eine Chance von 2.5%, dass ein weiteres Ziel in der Nähe mit 'Verjüngung' belegt wird.",
          droploc: "Frakturkammern, Ebene 3+",
        },
        fr: {
          name: "Vision de croissance sans fin",
          slot: "Tête, Pieds",
          desc: "Les soins de Récupération ont 2.5% de chances de créer une nouvelle Récupération sur une cible proche.",
          droploc: "Chambres aux Fractures, échelon 3 ou plus",
        },
        ru: {
          name: "Видение бесконечного роста",
          slot: "Голова, Ступни",
          desc: "Исцеляющий эффект 'Омоложения' с вероятностью 2.5% применяет к находящейся рядом цели новый эффект 'Омоложения'.",
          droploc: "Костоломни, этаж 3+",
        },
        ch: {
          name: "无尽春天的愿景",
          slot: "头部、脚",
          desc: "回春术有2.5%的几率在一个附近目标身上生成一个新的回春术。",
          droploc: "断骨密室，难度3+",
        },
      };
      break;

    case "The Dark Titans Lesson":
      legendaryDetails = {
        en: {
          name: "The Dark Titans Lesson",
          slot: "Neck or Back",
          desc: "You may apply Lifebloom to two targets at once, but your Lifebloom healing is reduced by 10%.",
          droploc: "Lord Chamberlain, Halls of Atonement",
        },
        de: {
          name: "Die Lektion des Dunklen Titanen",
          slot: "Hals, Rücken",
          desc: "'Blühendes Leben' kann auf zwei Zielen gleichzeitig aktiv sein, aber die Heilung von 'Blühendes Leben' ist um 10% verringert.",
          droploc: "Der Oberste Kämmerer",
        },
        fr: {
          name: "Leçon du Titan noir",
          slot: "Cou, Dos",
          desc: "Vous pouvez utiliser Fleur de vie sur 2 cibles à la fois, mais les soins du sort sont réduits de 10%.",
          droploc: "Butin de donjon : grand chambellan",
        },
        ru: {
          name: "Урок Темного титана",
          slot: "Шея, Спина",
          desc: "Вы можете применять 'Жизнецвет' к двум целям единовременно, но исцеление от него ослабляется на 10%.",
          droploc: "Добыча из подземелья: Лорд-камергер",
        },
        ch: {
          name: "黑暗泰坦之训",
          slot: "颈部、背部",
          desc: "你的生命绽放可以同时在两个目标身上生效，但生命绽放的治疗效果降低10%。",
          droploc: "地下城掉落：宫务大臣",
        },
      };
      break;

    case "Verdant Infusion":
      legendaryDetails = {
        en: {
          name: "Verdant Infusion",
          slot: "Shoulders, Hands, Cape (recommended)",
          desc: "Swiftmend no longer consumes a heal over time effect, and extends the duration of HoTs on the target by 10s.",
          droploc: "Oranomonos, World Boss",
        },
        de: {
          name: "Üppige Infusion",
          slot: "Schulter, Hände",
          desc: "'Rasche Heilung' verbraucht keinen regelmäßigen Heilungseffekt mehr und verlängert die Dauer Eurer aktiven regelmäßigen Heilungseffekte auf dem Ziel um 8 Sek.",
          droploc: "Oranomonos die Immersprießende",
        },
        fr: {
          name: "Infusion verdoyante",
          slot: "Épaule, Mains",
          desc: "Prompte guérison ne consomme plus d’effet de soins sur la durée, et prolonge de 8 s ceux qui affectent la cible.",
          droploc: "Oranomonos la Mille-Rameaux",
        },
        ru: {
          name: "Живительное насыщение",
          slot: "Плечо, Кисти рук",
          desc: "'Быстрое восстановление' больше не поглощает эффект периодического исцеления и продлевает время действия ваших периодических эффектов исцеления на цели на 8 сек.",
          droploc: "Ораномонос Вечноветвящаяся",
        },
        ch: {
          name: "翡翠灌注",
          slot: "肩部、手",
          desc: "迅捷治愈不再消耗一个持续治疗效果，并使你在目标身上的持续治疗效果的持续时间延长8秒。",
          droploc: "“长青之枝”奥拉诺莫诺斯",
        },
      };
      break;

    case "Lycaras Fleeting Glimpse":
      legendaryDetails = {
        en: {
          name: "Lycara's Fleeting Glimpse",
          slot: "Waist or Feet",
          desc: "Every 45s while in combat, cast a spell based on your form (Wild Growth, Primal Wrath, Starfall, Stampeding Roar).",
          droploc: "Mordretha, Theater of Pain",
        },
        de: {
          name: "Lycaras flüchtiger Blick",
          slot: "Taille, Füße",
          desc: "Setzt im Kampf alle 45 Sek. einen Zauber ein, der von Eurer Gestalt abhängt: Wildwuchs, Urzorn, Baumrinde, Sternenregen, Anstachelndes Gebrüll",
          droploc: "Mordretha, die Unendliche Kaiserin",
        },
        fr: {
          name: "Aperçu éphémère de Lycara",
          slot: "Taille, Pieds",
          desc: "Toutes les 45 s en combat, vous lancez un sort en fonction de votre forme: Croissance sauvage, Colère primitive, Ecorce, Météores, Ruée rugissante",
          droploc: "Mordretha, l’impératrice immortelle",
        },
        ru: {
          name: "Мимолетное видение Ликары",
          slot: "Пояс, Ступни",
          desc: "Каждые 45 сек. во время боя вы применяете заклинание в зависимости от вашего текущего облика. (Буйный рост, Первобытный гнев, Дубовая кожа, Звездопад, Тревожный рев",
          droploc: "Мордрета, Вечная императрица",
        },
        ch: {
          name: "莱卡拉的惊鸿一瞥",
          slot: "腰部、脚",
          desc: "在战斗中，每45秒基于你的形态施放一个法术：野性成长, 原始之怒, 树皮术, 星辰坠落, 狂奔怒吼",
          droploc: "无尽女皇莫德蕾莎",
        },
      };
      break;

    case "Memory of the Mother Tree":
      legendaryDetails = {
        en: {
          name: "Memory of the Mother Tree",
          slot: "Legs (recommended), Wrist",
          desc: "Wild Growth has a 40% chance to cause your next Rejuv or Regrowth to apply to 3 additional allies.",
          droploc: "Lady Invera Darkvein, Castle Nathria",
        },
        de: {
          name: "Erinnerung an den Mutterbaum",
          slot: "Beine, Handgelenk",
          desc: "'Wildwuchs' hat eine Chance von 40%, dass Euer nächster Einsatz von 'Verjüngung' oder 'Nachwachsen' sich auf 3 zusätzliche Verbündete innerhalb von 20 Metern um das Ziel auswirkt.",
          droploc: "Lady Inerva Dunkelader",
        },
        fr: {
          name: "Souvenir de l’Arbre-Mère",
          slot: "Jambes, Poignets",
          desc: "Croissance sauvage a 40% de chances de permettre à votre prochain sort Récupération ou Rétablissement de s’appliquer à 3 alliés supplémentaires à moins de 20 mètres de la cible.",
          droploc: "dame Inverva Sombreveine",
        },
        ru: {
          name: "Память об Изначальном Древе",
          slot: "Ноги, Запястья",
          desc: "При применении 'Буйного роста' с вероятностью 40% ваше следующее 'Омоложение' или 'Восстановление' будет применено еще к 3 союзникам:союзникам в радиусе 20 м от основной цели.",
          droploc: "леди Инверва Дарквейн",
        },
        ch: {
          name: "母亲之树的回忆",
          slot: "腿部、腕部",
          desc: "野性成长有40%几率使你的下一个回春术或愈合能够施加给目标20码范围内额外3名盟友。",
          droploc: "伊涅瓦·暗脉女勋爵",
        },
      };
      break;

    case "Oath of the Elder Druid":
      legendaryDetails = {
        en: {
          name: "Oath of the Elder Druid",
          slot: "Shoulder or Wrist",
          desc: "Effects of Thick Hide, Astral Influence, Feline Swiftness and Ysera's Gift increased by 75%. Free Heart of the Wild per minute.",
          droploc: "PVP Honor Vendor",
        },
        de: {
          name: "Eid des Druidenältesten",
          slot: "Schulter, Handgelenk",
          desc:
            "Erhöht die Effekte von 'Dickes Fell', 'Astraler Einfluss', 'Schnelligkeit der Wildnis' und 'Yseras Gabe' um 75%. Wenn Ihr in die zu Eurer Affinität gehörende Gestalt wechselt, erhaltet Ihr für 10 Sek. 'Herz der Wildnis'. Kann einmal alle 1 min auftreten.",
          droploc: "Gegen Ehre von Lieferant Zo'kuul erhältlich",
        },
        fr: {
          name: "Serment de l’ancien druide",
          slot: "Épaule, Poignets",
          desc:
            "Effets de Peau épaisse, Influence astrale, Rapidité féline et Don d’Ysera augmentés de 75%. Lorsque vous prenez la forme correspondant à votre affinité, vous bénéficiez de Cœur de fauve pendant 10 s, une fois toutes les 1 min.",
          droploc: "À acheter contre des points d’honneur auprès du pourvoyeur Zo’kuul.",
        },
        ru: {
          name: "Клятва старейшего друида",
          slot: "Плечо, Запястья",
          desc:
            "Эффективность 'Плотной шкуры', 'Родства с астралом', 'Стремительности кошки' и 'Дара Изеры' увеличена на 75%. Когда вы принимаете родственный облик, вы раз в 1 min. на 10 сек. получаете эффект 'Сердце дикой природы'.",
          droploc: "Покупается за очки чести у поставщика Зо'куула",
        },
        ch: {
          name: "德鲁伊长者之誓",
          slot: "肩部、腕部",
          desc: "厚皮、星界支配、豹之迅捷和伊瑟拉之赐的效果提高75%。 当你变形成亲和的形态时，你每1 min会获得一次持续10秒的野性之心效果。",
          droploc: "用荣誉点数从承销商佐·库尔处购买。",
        },
      };
      break;

    case "Circle of Life and Death":
      legendaryDetails = {
        en: {
          name: "Circle of Life and Death",
          slot: "Head or Finger",
          desc: "DoT's deal damage in 25% less time, HoTs in 15% less time.",
          droploc: "Stone Legion Generals, Castle Nathria",
        },
        de: {
          name: "Kreislauf aus Leben und Tod",
          slot: "Kopf, Finger",
          desc: "Eure regelmäßigen Schadenseffekte verursachen ihren Schaden in 25% kürzerer Zeit und Eure regelmäßigen Heileffekte ihre Heilung in 15% kürzerer Zeit.",
          droploc: "Generäle der Steinlegion",
        },
        fr: {
          name: "Cycle de la vie et la mort",
          slot: "Tête, Doigt",
          desc: "Vos effets de dégâts sur la durée infligent leurs dégâts 25% plus vite. Vos effets de soins sur la durée soignent 15% plus vite.",
          droploc: "généraux de la Légion de pierre",
        },
        ru: {
          name: "Круг жизни и смерти",
          slot: "Голова, Палец",
          desc: "Ваши эффекты периодического урона наносят полный урон на 25% быстрее, а эффекты периодического исцеления восполняют здоровье на 15% быстрее.",
          droploc: "генералы Каменного легиона",
        },

        ch: {
          name: "生死循环",
          slot: "头部、手指",
          desc: "你的持续伤害效果造成全部伤害所需时间减少25%，你的持续治疗效果造成全部治疗所需时间减少15%。",
          droploc: "顽石军团干将",
        },
      };
      break;

    /* ---------------------------------------------------------------------------------------------- */
    /*                                      9.1 Druid Legendaries                                     */
    /* ---------------------------------------------------------------------------------------------- */

    /* ------------------------------------------- Kyrian ------------------------------------------- */
    case "Kindred Affinity":
      // https://ptr.wowhead.com/spell=354115/kindred-affinity
      legendaryDetails = {
        en: {
          name: "Kindred Affinity",
          slot: "Neck, Shoulders (recommended)",
          desc: "You and your Kindred Spirit each gain an 8% secondary stat buff based on their Covenant. This bonus is doubled while the bond is Empowered.",
          droploc: "Kyrian Renown 48",
          covenant: "Kyrian",
        },
        de: {
          name: "",
          slot: "",
          desc: "",
          droploc: "",
          covenant: "Kyrian",
        },
        fr: {
          name: "",
          slot: "",
          desc: "",
          droploc: "",
          covenant: "Kyrian",
        },
        ru: {
          name: "",
          slot: "",
          desc: "",
          droploc: "",
          covenant: "Kyrian",
        },

        ch: {
          name: "",
          slot: "",
          desc: "",
          droploc: "",
          covenant: "Kyrian",
        },
      };
      break;

    /* ------------------------------------------- Venthyr ------------------------------------------ */
    case "Sinful Hysteria":
      // https://ptr.wowhead.com/spell=354109/sinful-hysteria
      legendaryDetails = {
        en: {
          name: "Sinful Hysteria",
          slot: "Waist or Hands",
          desc: "Every time Ravenous Frenzy stacks, its duration is increased by 0.2 sec. Additionally, the buff lingers for 5 seconds after Ravenous Frenzy ends.",
          droploc: "Venthyr Renown 48",
          covenant: "Venthyr",
        },
        de: {
          name: "",
          slot: "",
          desc: "",
          droploc: "",
          covenant: "Venthyr",
        },
        fr: {
          name: "",
          slot: "",
          desc: "",
          droploc: "",
          covenant: "Venthyr",
        },
        ru: {
          name: "",
          slot: "",
          desc: "",
          droploc: "",
          covenant: "Venthyr",
        },

        ch: {
          name: "",
          slot: "",
          desc: "",
          droploc: "",
          covenant: "Venthyr",
        },
      };
      break;

    /* ------------------------------------------ Necrolord ----------------------------------------- */
    case "Unbridled Swarm":
      // https://ptr.wowhead.com/spell=354123/unbridled-swarm
      legendaryDetails = {
        en: {
          name: "Unbridled Swarm",
          slot: "Chest, Wrist (recommended)",
          desc: "Adaptive Swarm has a 60% chance to split into two Swarms each time it jumps.",
          droploc: "Necrolord Renown 48",
          covenant: "Necrolord",
        },
        de: {
          name: "",
          slot: "",
          desc: "",
          droploc: "",
          covenant: "Necrolord",
        },
        fr: {
          name: "",
          slot: "",
          desc: "",
          droploc: "",
          covenant: "Necrolord",
        },
        ru: {
          name: "",
          slot: "",
          desc: "",
          droploc: "",
          covenant: "Necrolord",
        },

        ch: {
          name: "",
          slot: "",
          desc: "",
          droploc: "",
          covenant: "Necrolord",
        },
      };
      break;

    /* ------------------------------------------ Night Fae ----------------------------------------- */
    case "Celestial Spirits":
      // https://ptr.wowhead.com/spell=354118/celestial-spirits
      legendaryDetails = {
        en: {
          name: "Celestial Spirits",
          slot: "Feet, Legs (recommended)",
          desc: "The cooldown of Convoke the Spirits is halved to one minute, but the number of spells only reduced by 25% (to 9 from 12).  Convoke the Spirits has an increased chance to cast Flourish.",
          droploc: "Night Fae Renown 48",
          covenant: "Night Fae",
        },
        de: {
          name: "Himmlische Geister",
          slot: "Legs, Feet",
          desc: "Verringert die Abklingzeit von 'Konvokation der Geister' um 50% und die Dauer um 25%. 'Konvokation der Geister' hat eine erhöhte Chance, einen außergewöhnlichen Zauber oder eine außergewöhnliche Fähigkeit einzusetzen.",
          droploc: "",
          covenant: "Night Fae",
        },
        fr: {
          name: "",
          slot: "",
          desc: "",
          droploc: "",
          covenant: "Night Fae",
        },
        ru: {
          name: "Небесные духи",
          slot: "Legs, Feet",
          desc: "Сокращает время восстановления Созыва духов на 50%, а время действия этой способности – 25%.",
          droploc: "",
          covenant: "Night Fae",
        },

        ch: {
          name: "",
          slot: "",
          desc: "",
          droploc: "",
          covenant: "Night Fae",
        },
      };
      break;

    /* ---------------------------------------------------------------------------------------------- */
    /*                                             Paladin                                            */
    /* ---------------------------------------------------------------------------------------------- */
    case "Of Dusk and Dawn":
      legendaryDetails = {
        en: {
          name: "Of Dusk and Dawn",
          slot: "Head, Shoulders, Neck (recommended)",
          desc: "When you reach 5 Holy Power, gain 6% damage and healing for 12 seconds. When you reach 0 Holy Power, gain 4% DR for 12 seconds.",
          droploc: "Stone Legion Generals, Castle Nathria",
        },
        de: {
          name: "Abendrot und Morgenrot",
          slot: "Kopf, Schulter",
          desc:
            "Wenn Ihr 5 Heilige Kraft erreicht, erhaltet Ihr 'Segen des Morgens'. Wenn Ihr 0 Heilige Kraft erreicht, erhaltet Ihr 'Segen des Abends'. Segen des Morgens: Erhöht Schaden und Heilung 8 sec lang um 6%. Segen des Abends: Erlittener Schaden wird 8 sec lang um 3% verringert.",
          droploc: "Generäle der Steinlegion",
        },
        fr: {
          name: "Aube et crépuscule",
          slot: "Tête, Épaule",
          desc:
            "À 5 point de puissance sacrée, vous bénéficiez de Bénédiction de l’aube. À 0 point de puissance sacrée, vous bénéficiez de Bénédiction du crépuscule. Bénédiction de l’aube: Dégâts et soins augmentés de 6% pendant 8 sec. Bénédiction du crépuscule: Dégâts subis réduits de 3% pendant 8 sec.",
          droploc: "généraux de la Légion de pierre",
        },
        ru: {
          name: "Закат и рассвет",
          slot: "Голова, Плечо",
          desc:
            "Накопив 5 ед. энергии Света, вы получаете 'Благословение рассвета'. Накопив 0 ед. энергии Света, вы получаете 'Благословение заката'. Благословение рассвета: Увеличивает урон и объем исцеления на 6% на 8 sec. Благословение заката: Уменьшает получаемый урон на 3% на 8 sec.",
          droploc: "генералы Каменного легиона",
        },
        ch: {
          name: "黄昏与黎明",
          slot: "头部、肩部",
          desc: "当你拥有5层神圣能量时，你将获得黎明祝福。 当你拥有0层神圣能量时，你将获得黄昏祝福。 黎明祝福: 伤害和治疗效果提高6%，持续8 sec。 黄昏祝福: 受到的伤害降低3%，持续8 sec。",
          droploc: "顽石军团干将",
        },
      };
      break;

    case "Vanguards Momentum":
      legendaryDetails = {
        en: {
          name: "Vanguard's Momentum",
          slot: "Head or Hands",
          desc: "Hammer of Wrath has an extra charge and increases Holy Damage done by 3% for 8s. Stacks 3 times.",
          droploc: "Sire Denathrius, Castle Nathria",
        },
        de: {
          name: "Schwung des Frontkämpfers",
          slot: "Kopf, Hände",
          desc: "'Hammer des Zorns' hat 1 zusätzliche Aufladung und erhöht den verursachten Heiligschaden für 8 sec um 3%. Bis zu 3-mal stapelbar.",
          droploc: "Graf Denathrius",
        },
        fr: {
          name: "Impulsion de l’avant-garde",
          slot: "Tête, Mains",
          desc: "Marteau de courroux a 1 charge supplémentaire et augmente de 3% les dégâts du Sacré pendant 8 sec. Cumulable jusqu’à 3 fois.",
          droploc: "sire Denathrius",
        },
        ru: {
          name: "Напор авангарда",
          slot: "Голова, Кисти рук",
          desc: "'Молот гнева' получает еще 1 заряд и увеличивает наносимый урон от светлой магии на 3% на 8 sec. Суммируется до 3 раз.",
          droploc: "сир Денатрий",
        },
        ch: {
          name: "先锋之势",
          slot: "头部、手",
          desc: "愤怒之锤额外拥有1层充能，并使你造成的神圣伤害提高3%，持续8 sec，可以叠加3层。",
          droploc: "德纳修斯大帝",
        },
      };
      break;

    case "The Magistrates Judgment":
      legendaryDetails = {
        en: {
          name: "The Magistrate's Judgment",
          slot: "Wrist or Finger",
          desc: "Judgment has a 60% chance to reduce the cost of your next Holy Power spender by 1.",
          droploc: "Xav the Unfallen, Theater of Pain",
        },
        de: {
          name: "Das Richturteil des Magistrats",
          slot: "Handgelenk, Finger",
          desc: "'Richturteil' hat eine Chance von 75%, die Kosten Eures nächsten Einsatzes einer Fähigkeit, die Heilige Kraft verbraucht, um 1 zu verringern.",
          droploc: "Xav der Unbesiegte",
        },
        fr: {
          name: "Jugement du magistrat",
          slot: "Poignets, Doigt",
          desc: "Jugement a 75% de chances de réduire de 1 le coût de votre prochaine technique consommant de la puissance sacrée.",
          droploc: "Xav l’Invaincu",
        },
        ru: {
          name: "Правосудие мирового судьи",
          slot: "Запястья, Палец",
          desc: "'Правосудие' с вероятностью 75% снижает стоимость следующей способности, расходующей энергию Света, на 1 ед.",
          droploc: "Ксав Несломленный",
        },
        ch: {
          name: "法官的审判",
          slot: "腕部、手指",
          desc: "审判有75%的几率使你下一个消耗神圣能量的技能的消耗减少1点。",
          droploc: "无堕者哈夫",
        },
      };
      break;

    case "Inflorescence of the Sunwell":
      legendaryDetails = {
        en: {
          name: "Inflorescence of the Sunwell",
          slot: "Feet or Back",
          desc: "Infusion of Light has 1 additional charge and its effects are increased by 30%.",
          droploc: "Torghast, The Soulforges, Layer 3+",
        },
        de: {
          name: "Infloreszenz des Sonnenbrunnens",
          slot: "Füße, Rücken",
          desc: "'Lichtinfusion' verfügt über 1 zusätzliche Aufladung und die Effekte sind um 20% erhöht.",
          droploc: "Torghast, Die Seelenschmieden, Ebene 3+",
        },
        fr: {
          name: "Inflorescence du Puits de soleil",
          slot: "Pieds, Dos",
          desc: "Imprégnation de lumière a 1 charge supplémentaire et ses effets sont augmentés de 20%.",
          droploc: "Forges des Âmes, échelon 3 ou plus",
        },
        ru: {
          name: "Цветение Солнечного Колодца",
          slot: "Ступни, Спина",
          desc: "'Прилив Света' получает еще 1 $lзаряд:заряда:зарядов, а его эффективность повышается на 20%.",
          droploc: "Кузни душ, этаж 3+",
        },
        ch: {
          name: "太阳井之花",
          slot: "脚、背部",
          desc: "圣光灌注获得1次额外使用次数，且效果提高20%。",
          droploc: "罪魂之塔。灵魂熔炉，难度3+",
        },
      };
      break;

    case "Maraads Dying Breath":
      legendaryDetails = {
        en: {
          name: "Maraad's Dying Breath",
          slot: "Chest, Finger (recommended)",
          desc: "Light of Dawn causes your next Light of the Martyr to also heal your Beacon of Light. Each ally hit by LoD increases Light of the Martyr healing by 10%.",
          droploc: "Grand Proctor Beryllia, Sanguine Depths",
        },
        de: {
          name: "Maraads letzter Atemzug",
          slot: "Brust, Finger",
          desc:
            "Die Heilung von 'Licht der Morgendämmerung' bewirkt, dass Euer nächster Einsatz von 'Licht des Märtyrers' zusätzlich Eure 'Flamme des Glaubens' heilt. Jeder von 'Licht der Morgendämmerung' geheilte Verbündete erhöht die Heilung von 'Licht des Märtyrers' um 10%.",
          droploc: "Großaufseherin Beryllia",
        },
        fr: {
          name: "Dernier souffle de Maraad",
          slot: "Torse, Doigt",
          desc:
            "Les soins de Lumière de l’aube permettent à votre prochaine Lumière du martyr de soigner également votre Guide de lumière. Chaque allié soigné par Lumière de l’aube augmente de 10% les soins de Lumière du martyr.",
          droploc: "grande déléguée Beryllia",
        },
        ru: {
          name: "Предсмертный вздох Мараада",
          slot: "Грудь, Палец",
          desc:
            "Если 'Свет зари' восполнил здоровье, следующий 'Свет мученика' также восполнит здоровье цели вашей 'Частицы Света'. За каждого союзника, которому 'Свет зари' восполнит здоровье, 'Свет мученика' будет восполнять на 10% больше здоровья.",
          droploc: "верховная надзирательница Бериллия",
        },
        ch: {
          name: "玛尔拉德的临终之息",
          slot: "胸部、手指",
          desc: "使用黎明之光治疗之后，你的下一次殉道者之光还会同时治疗你的圣光道标的目标。黎明之光每治疗一个盟友，就会使殉道者之光的治疗量提高10%。",
          droploc: "大学监贝律莉娅",
        },
      };
      break;

    case "Shadowbreaker, Dawn of the Sun":
      legendaryDetails = {
        en: {
          name: "Shadowbreaker, Dawn of the Sun",
          slot: "Shoulder or Hands",
          desc: "Light of Dawn's range is increased to 40 yards, and all allies healed receive full effect from your Mastery for 8s.",
          droploc: "Sun King's Salvation, Castle Nathria",
        },
        de: {
          name: "Schattenbrecher, der Sonnenaufgang",
          slot: "Schulter, Hände",
          desc:
            "Erhöht die Reichweite von 'Licht der Morgendämmerung' auf 40 Meter. Alle Verbündeten innerhalb des Effekts profitieren 6 sec lang so von Eurer 'Meisterschaft: Lichtbringer', als ob sie sich innerhalb von 10 Metern befinden würden. 'Wort der Herrlichkeit' profitiert 50% mehr von Eurer Meisterschaft.",
          droploc: "Rettung des Sonnenkönigs",
        },
        fr: {
          name: "Brisombre, le lever de soleil",
          slot: "Épaule, Mains",
          desc:
            "La portée de Lumière de l’aube est augmentée de 40 mètres. Les alliés dans sa zone d’effet bénéficient de Maîtrise : Porteur de Lumière comme s’ils se trouvaient à moins de 10 mètres pendant 6 sec. L’effet de votre Maîtrise sur Mot de gloire est augmenté de 50%.",
          droploc: "salut du roi-soleil",
        },
        ru: {
          name: "Разрубатель Тьмы, Вестник Рассвета",
          slot: "Плечо, Кисти рук",
          desc:
            "Увеличивает радиус действия 'Света зари' до 40 м. Союзники под его действием на 6 sec. получают бонус от 'Искусности: Светоносный', словно они находятся в радиусе 10 м от вас. Увеличивает бонус к 'Торжеству' от искусности на 50%.",
          droploc: "спасение Солнечного короля",
        },
        ch: {
          name: "破影者，日之破晓",
          slot: "肩部、手",
          desc: "黎明之光的射程提高到40码。黎明之光中所有盟友从你的精通：光明使者中受到的加成将与在10码时受到的加成相同，持续6 sec。 荣耀圣言从你的精通中受到的加成提高50%。",
          droploc: "太阳之王的救赎",
        },
      };
      break;

    case "Shock Barrier":
      legendaryDetails = {
        en: {
          name: "Shock Barrier",
          slot: "Legs (recommended), Feet",
          desc: "Holy Shock protects the target for 18 seconds, absorbing 20% of it's healing every 6s. Maximum of 5 targets protected at a time.",
          droploc: "Torghast, Coldheart Interstitia, Layer 3+",
        },
        de: {
          name: "Schockbarriere",
          slot: "Beine, Füße",
          desc:
            "'Heiliger Schock' schützt das Ziel für 18 sec mit einem Schild aus heiligem Licht. Der Schild absorbiert alle 6 Sek. Schaden in Höhe von 20% des Heiligen Schocks. Kann bis zu 5 Ziele schützen.",
          droploc: "Kaltherzinterstitia, Ebene 3+",
        },
        fr: {
          name: "Barrière de choc",
          slot: "Jambes, Pieds",
          desc:
            "Horion sacré confère à la cible un bouclier de Lumière sacrée qui dure 18 sec et absorbe un montant de dégâts égal à 20% des dégâts d’Horion sacré toutes les 6 s. Peut protéger jusqu’à 5 cibles.",
          droploc: "Interstice Cœur-Algide, échelon 3 ou plus",
        },
        ru: {
          name: "Шоковая преграда",
          slot: "Ноги, Ступни",
          desc: "'Шок небес' на 18 sec. дает цели щит Света небес, который раз в 6 сек. поглощает урон в объеме 20% исцеления от 'Шока небес'. Действует максимум на 5 цели:целей.",
          droploc: "Междумирье Бессердечных, этаж 3+",
        },
        ch: {
          name: "震击屏障",
          slot: "腿部、脚",
          desc: "神圣震击使用圣光护盾保护目标，持续18 sec，每6秒最多可吸收神圣震击治疗量20%的伤害。只能保护5个目标。",
          droploc: "罪魂之塔。凇心间隙，难度3+",
        },
      };
      break;

    case "The Mad Paragon":
      legendaryDetails = {
        en: {
          name: "The Mad Paragon",
          slot: "Waist (recommended), Feet",
          desc: "Hammer of Wrath deals 30% additional damage and extends the duration of Wings by 1s.",
          droploc: "The Great Vault",
        },
        de: {
          name: "Das Wahnsinnige Paragon",
          slot: "Taille, Füße",
          desc: "'Hammer des Zorns' verursacht 30% mehr Schaden und verlängert die Dauer von 'Zornige Vergeltung' um 1 Sek.",
          droploc: "Quest: Die Große Schatzkammer",
        },
        fr: {
          name: "Parangon fou",
          slot: "Taille, Pieds",
          desc: "Marteau de courroux inflige 30% de dégâts supplémentaires et augmente la durée de Courroux vengeur de 1 s.",
          droploc: "Quête : La grande chambre forte",
        },
        ru: {
          name: "Безумный идеал",
          slot: "Пояс, Ступни",
          desc: "'Молот гнева' наносит на 30% больше урона и продлевает действие 'Гнева карателя' на 1 сек.",
          droploc: "Задание 'Великое хранилище'",
        },
        ch: {
          name: "疯狂圣贤",
          slot: "腰部、脚",
          desc: "愤怒之锤造成的伤害提高30%，并会使复仇之怒的持续时间延长1秒。",
          droploc: "任务：宏伟宝库",
        },
      };
      break;

    case "Relentless Inquisitor":
      legendaryDetails = {
        en: {
          name: "Relentless Inquisitor (Retribution)",
          slot: "Legs or Back",
          desc: "Spending Holy Power grants you 1% haste per finisher for 12 sec, stacking up to 5 times.",
          droploc: "Torghast, The Upper Reaches, Layer 3+",
        },
        de: {
          name: "Unnachgiebiger Inquisitor",
          slot: "Beine, Rücken",
          desc: "Beim Verbrauch von Heiliger Kraft wird Euer Tempo pro Finishing-Move für 12 sec um 1% erhöht. Bis zu 5-mal stapelbar.",
          droploc: "Die Oberen Ebenen, Ebene 3+",
        },
        fr: {
          name: "Inquisiteur implacable",
          slot: "Jambes, Dos",
          desc: "Dépenser de la puissance sacrée augmente la Hâte de 1% par coup de grâce asséné pendant 12 sec. Cumulable jusqu’à 5 fois.",
          droploc: "Étages supérieurs, échelon 3 ou plus",
        },
        ru: {
          name: "Непреклонный инквизитор",
          slot: "Ноги, Спина",
          desc: "Когда вы расходуете энергию Света, ваша скорость повышается на 1% за каждый смертельный удар. Время действия – 12 sec. Эффект суммируется до 5 раз.",
          droploc: "Верхний ярус, этаж 3+",
        },
        ch: {
          name: "无情审讯",
          slot: "腿部、背部",
          desc: "使用终结技时每消耗一点神圣能量，就会使你的急速提高1%，持续12 sec，最多可叠加5次。",
          droploc: "上层区域，难度3+",
        },
      };
      break;

    case "Relentless Inquisitor":
      legendaryDetails = {
        en: {
          name: "Relentless Inquisitor (Retribution)",
          slot: "Legs or Back",
          desc: "Spending Holy Power grants you 1% haste per finisher for 12 sec, stacking up to 5 times.",
          droploc: "Torghast, The Upper Reaches, Layer 3+",
        },
        de: {
          name: "Unnachgiebiger Inquisitor",
          slot: "Beine, Rücken",
          desc: "Beim Verbrauch von Heiliger Kraft wird Euer Tempo pro Finishing-Move für 12 sec um 1% erhöht. Bis zu 5-mal stapelbar.",
          droploc: "Die Oberen Ebenen, Ebene 3+",
        },
        fr: {
          name: "Inquisiteur implacable",
          slot: "Jambes, Dos",
          desc: "Dépenser de la puissance sacrée augmente la Hâte de 1% par coup de grâce asséné pendant 12 sec. Cumulable jusqu’à 5 fois.",
          droploc: "Étages supérieurs, échelon 3 ou plus",
        },
        ru: {
          name: "Непреклонный инквизитор",
          slot: "Ноги, Спина",
          desc: "Когда вы расходуете энергию Света, ваша скорость повышается на 1% за каждый смертельный удар. Время действия – 12 sec. Эффект суммируется до 5 раз.",
          droploc: "Верхний ярус, этаж 3+",
        },
        ch: {
          name: "无情审讯",
          slot: "腿部、背部",
          desc: "使用终结技时每消耗一点神圣能量，就会使你的急速提高1%，持续12 sec，最多可叠加5次。",
          droploc: "上层区域，难度3+",
        },
      };
      break;

    /* ---------------------------------------------------------------------------------------------- */
    /*                                     9.1 Paladin Legendaries                                    */
    /* ---------------------------------------------------------------------------------------------- */

    /* ------------------------------------------- Kyrian ------------------------------------------- */
    case "Divine Resonance":
      legendaryDetails = {
        en: {
          name: "Divine Resonance",
          slot: "Cape, Legs (recommended)",
          desc: "After casting Divine Toll, you instantly cast Holy Shock every 5 sec. This effect lasts 30 sec.",
          droploc: "Kyrian",
          covenant: "Kyrian",
        },
        de: {
          name: "",
          slot: "",
          desc: "",
          droploc: "",
          covenant: "Kyrian",
        },
        fr: {
          name: "",
          slot: "",
          desc: "",
          droploc: "",
          covenant: "Kyrian",
        },
        ru: {
          name: "",
          slot: "",
          desc: "",
          droploc: "",
          covenant: "Kyrian",
        },
        ch: {
          name: "",
          slot: "",
          desc: "",
          droploc: "",
          covenant: "Kyrian",
        },
      };
      break;

    /* ------------------------------------------ Necrolord ----------------------------------------- */
    case "Duty-Bound Gavel":
      legendaryDetails = {
        en: {
          name: "Duty-Bound Gavel",
          slot: "Head, Shoulder, Finger (recommended)",
          desc: "Vanquisher's Hammer gains 1 additional charge. An additional cast of Word of Glory will automatically trigger Light of Dawn",
          droploc: "Necrolord",
          covenant: "Necrolord",
        },
        de: {
          name: "",
          slot: "",
          desc: "",
          droploc: "",
          covenant: "Necrolord",
        },
        fr: {
          name: "",
          slot: "",
          desc: "",
          droploc: "",
          covenant: "Necrolord",
        },
        ru: {
          name: "",
          slot: "",
          desc: "",
          droploc: "",
          covenant: "Necrolord",
        },
        ch: {
          name: "",
          slot: "",
          desc: "",
          droploc: "",
          covenant: "Necrolord",
        },
      };
      break;

    /* ------------------------------------------ Night Fae ----------------------------------------- */
    case "Seasons of Plenty":
      legendaryDetails = {
        en: {
          name: "Seasons of Plenty",
          slot: "Legs, Feet",
          desc: "Casting Blessing of Summer grants Equinox after 10 sec. Equinox: The effectiveness of Blessing of Summer is increased by 100% for 10 sec.",
          droploc: "Night Fae",
          covenant: "Night Fae",
        },
        de: {
          name: "",
          slot: "",
          desc: "",
          droploc: "",
          covenant: "Night Fae",
        },
        fr: {
          name: "",
          slot: "",
          desc: "",
          droploc: "",
          covenant: "Night Fae",
        },
        ru: {
          name: "",
          slot: "",
          desc: "",
          droploc: "",
          covenant: "Night Fae",
        },
        ch: {
          name: "",
          slot: "",
          desc: "",
          droploc: "",
          covenant: "Night Fae",
        },
      };
      break;

    /* ------------------------------------------- Venthyr ------------------------------------------ */
    case "Radiant Embers":
      legendaryDetails = {
        en: {
          name: "Radiant Embers",
          slot: "Wrist, Hands, Back",
          desc: "Ashen Hallow's duration is increased by 50%. Leaving the hallowed area will end the effect and its cooldown will be reduced by up to 50%, proportional to its remaining duration.",
          droploc: "Venthyr",
          covenant: "Venthyr",
        },
        de: {
          name: "",
          slot: "",
          desc: "",
          droploc: "",
          covenant: "Venthyr",
        },
        fr: {
          name: "",
          slot: "",
          desc: "",
          droploc: "",
          covenant: "Venthyr",
        },
        ru: {
          name: "",
          slot: "",
          desc: "",
          droploc: "",
          covenant: "Venthyr",
        },
        ch: {
          name: "",
          slot: "",
          desc: "",
          droploc: "",
          covenant: "Venthyr",
        },
      };
      break;

    /* ---------------------------------------------------------------------------------------------- */
    /*                                             Priest                                             */
    /* ---------------------------------------------------------------------------------------------- */

    case "Clarity of Mind":
      legendaryDetails = {
        en: {
          name: "Clarity of Mind",
          slot: "Chest, Finger (recommended)",
          desc: "Spirit Shell increases the duration of active atonements by 3s and reduces mana costs by 30%. During Rapture, PW:S costs 20% less mana and applies 6s longer atonements.",
          droploc: "Sludgefist, Castle Nathria",
        },
        de: {
          name: "Klarheit der Gedanken",
          slot: "Brust, Finger",
          desc: "Während 'Euphorie' aktiv ist, kostet 'Machtwort: Schild' 20% weniger Mana und der damit angewendete Effekt 'Abbitte' hält 6 Sek. länger an.",
          droploc: "Schlickfaust",
        },
        fr: {
          name: "Clarté d’esprit",
          slot: "Torse, Doigt",
          desc: "Pendant Extase, le coût en mana de Mot de pouvoir : Bouclier est réduit de 20% et la durée des Expiations qu’il applique est augmentée de 6 s.",
          droploc: "Fangepoing",
        },
        ru: {
          name: "Ясность разума",
          slot: "Грудь, Палец",
          desc: "Пока действует 'Вознесение', стоимость 'Слова силы: Щит' снижается на 20%, а 'Искупление вины' от него длится на 6 сек. дольше.",
          droploc: "Грязешмяк",
        },
        ch: {
          name: "坚定意志",
          slot: "胸部、手指",
          desc: "全神贯注期间，真言术：盾消耗的法力值降低20%，施加的救赎效果延长6秒。",
          droploc: "泥拳",
        },
      };
      break;

    case "Crystalline Reflection":
      legendaryDetails = {
        en: {
          name: "Crystalline Reflection",
          slot: "Shoulder, Hands",
          desc: "Power Word Shield instantly heals the target for 42% SP, and reflects 20% of damage absorbed.",
          droploc: "Margrave Stradama, Plaguefall",
        },
        de: {
          name: "Kristalline Reflexion",
          slot: "Schulter, Hände",
          desc: "'Machtwort: Schild' heilt das Ziel sofort um (42% of Spell power) Gesundheit und reflektiert 20% des absorbierten Schadens.",
          droploc: "Markgräfin Stradama",
        },
        fr: {
          name: "Reflet cristallin",
          slot: "Épaule, Mains",
          desc: "Mot de pouvoir : Bouclier rend instantanément (42% of Spell power) points de vie à la cible et renvoie 20% des dégâts absorbés.",
          droploc: "margrave Stradama",
        },
        ru: {
          name: "Кристальное отражение",
          slot: "Плечо, Кисти рук",
          desc: "'Слово силы: Щит' мгновенно восполняет цели (42% of Spell power) здоровья и отражает 20% поглощенного урона в атакующего противника.",
          droploc: "маркграфиня Страдама",
        },
        ch: {
          name: "晶化反射",
          slot: "肩部、手",
          desc: "真言术：盾立即为目标恢复(42% of Spell power)点生命值，并反射吸收伤害的20%。",
          droploc: "斯特拉达玛侯爵",
        },
      };
      break;

    case "Kiss of Death":
      legendaryDetails = {
        en: {
          name: "Kiss of Death",
          slot: "Legs, Feet",
          desc: "Reduces Shadow Word: Death's cooldown by 8s and causes it's damage to trigger atonement when used on targets below 20% health.",
          droploc: "Torghast, Mort'regar, Layer 3+",
        },
        de: {
          name: "Kuss des Todes",
          slot: "Beine, Füße",
          desc:
            "Verringert die Abklingzeit von 'Schattenwort: Tod' um 8 Sek. und lässt den Schaden dieser Fähigkeit 'Abbitte' auslösen, wenn sie gegen Ziele mit weniger als 20% Gesundheit eingesetzt wird.",
          droploc: "Torghast, Mort'regar, Ebene 3+",
        },
        fr: {
          name: "Baiser de la mort",
          slot: "Jambes, Pieds",
          desc: "Réduit de 8 s le temps de recharge de Mot de l’ombre : Mort et permet à ses dégâts de déclencher Expiation sur les cibles disposant de moins de 20% de leurs points de vie.",
          droploc: "Mort’regar, échelon 3 ou plus",
        },
        ru: {
          name: "Поцелуй смерти",
          slot: "Ноги, Ступни",
          desc: "Сокращает время восстановления 'Слова Тьмы: Смерть' на 8 сек. Урон от этой способности активирует эффект 'Искупление вины' при применении к цели с запасом здоровья менее 20%.",
          droploc: "Морт'регар, этаж 3+",
        },

        ch: {
          name: "死神之吻",
          slot: "腿部、脚",
          desc: "使暗言术：灭的冷却时间缩短8秒，且暗言术：灭对生命值低于20%的目标造成伤害时可以触发救赎。",
          droploc: "莫尔特雷加，难度3+",
        },
      };
      break;

    case "The Penitent One":
      legendaryDetails = {
        en: {
          name: "The Penitent One",
          slot: "Feet, Back",
          desc: "Power Word: Radiance has a 60% chance to cause your next Penance to be free and fire 3 extra bolts.",
          droploc: "Torghast, The Soulforges, Layer 3+",
        },
        de: {
          name: "Der Bußfertige",
          slot: "Füße, Rücken",
          desc: "'Machtwort: Glanz' hat eine Chance von 60%, Euren nächsten Einsatz von 'Sühne' kostenlos zu machen und ihn 3 zusätzliches Geschoss verschießen zu lassen.",
          droploc: "Die Seelenschmieden, Ebene 3+",
        },
        fr: {
          name: "Le pénitent",
          slot: "Pieds, Dos",
          desc: "Mot de pouvoir : Radiance a 60% de chances de permettre à la prochaine Pénitence de tirer 3 salves supplémentaires.",
          droploc: "Forges des Âmes, échelon 3 ou plus",
        },
        ru: {
          name: "Кающийся грешник",
          slot: "Ступни, Спина",
          desc: "'Слово силы: Сияние' с вероятностью 60% позволяет применить следующую 'Исповедь' без затрат ресурса и увеличивает количество снарядов на 3.",
          droploc: "Кузни душ, этаж 3+",
        },
        ch: {
          name: "悔罪者",
          slot: "脚、背部",
          desc: "真言术：耀有60%的几率使你下一次苦修不消耗法力值，且额外发射3支圣光之矢。",
          droploc: "灵魂熔炉，难度3+",
        },
      };
      break;

    case "Cauterizing Shadows":
      legendaryDetails = {
        en: {
          name: "Cauterizing Shadows",
          slot: "Waist, Feet",
          desc: "When Shadow Word: Pain expires on a target, 3 allies within 30 yards of the target are healed.",
          droploc: "Mordretha, Theater of Pain",
        },
        de: {
          name: "Kauterisierende Schatten",
          slot: "Taille, Füße",
          desc: "Wenn 'Schattenwort: Schmerz' bei einem Ziel abläuft, werden 3 Verbündete innerhalb von 30 Metern um das betroffene Ziel um (55% of Spell power) Gesundheit geheilt.",
          droploc: "Mordretha, die Unendliche Kaiserin",
        },
        fr: {
          name: "Ombres cautérisantes",
          slot: "Taille, Pieds",
          desc: "Lorsque Mot de l’ombre : Douleur prend fin sur une cible, 3 alliés à moins de 30 mètres de la cible récupèrent (55% of Spell power) points de vie.",
          droploc: "Mordretha, l’impératrice immortelle",
        },
        ru: {
          name: "Прижигающие тени",
          slot: "Пояс, Ступни",
          desc: "По истечении времени действия 'Слова Тьмы: Боль' 3 союзник в радиусе 30 м от цели восполняют (55% of Spell power) ед. здоровья.",
          droploc: "Мордрета, Вечная императрица",
        },
        ch: {
          name: "烧灼暗影",
          slot: "腰部、脚",
          desc: "当暗言术：痛在一名目标身上消失时，该目标30码范围内的3名盟友将恢复(55% of Spell power)点生命值。",
          droploc: "无尽女皇莫德蕾莎",
        },
      };
      break;

    case "Measured Contemplation":
      legendaryDetails = {
        en: {
          name: "Measured Contemplation",
          slot: "Neck, Chest",
          desc: "Every 15s that you do not cast Flash Heal / Shadow Mend, the healing of your next Flash Heal / Shadow Mend is increased by 50%. Stacks four times.",
          droploc: "The Great Vault",
        },
        de: {
          name: "Bedächtiges Nachsinnen",
          slot: "Hals, Brust",
          desc: "Pro 15 Sek., in denen Ihr 'Schattenheilung' nicht einsetzt, wird die Heilung Eures nächsten Einsatzes von 'Schattenheilung' um 50% erhöht. Dieser Effekt ist bis zu 4-mal stapelbar.",
          droploc: "Quest: Die Große Schatzkammer",
        },
        fr: {
          name: "Contemplation mesurée",
          slot: "Cou, Torse",
          desc:
            "Pour chaque période de 15 s écoulées sans lancer Guérison de l’ombre, les soins prodigués par votre prochaine incantation de ce sort sont augmentés de 50%. Cet effet est cumulable jusqu’à 4 fois.",
          droploc: "Quête : La grande chambre forte",
        },
        ru: {
          name: "Спокойное созерцание",
          slot: "Шея, Грудь",
          desc: "За каждые 15 сек., что вы не применяете 'Темное восстановление', объем исцеления от следующего 'Темного восстановления' увеличивается на 50%. Суммируется до 4 раз.",
          droploc: "Задание 'Великое хранилище'",
        },
        ch: {
          name: "审慎沉思",
          slot: "颈部、胸部",
          desc: "当你不施放暗影愈合时，会使你的下一次暗影愈合的效果提高50%。该效果每15秒生效一次，最多叠加4次。",
          droploc: "宏伟宝库",
        },
      };
      break;

    case "Twins of the Sun Priestess":
      legendaryDetails = {
        en: {
          name: "Twins of the Sun Priestess",
          slot: "Head, Shoulder, Neck (recommended)",
          desc: "Power Infusion also grants you 100% of its effects when used on an ally.",
          droploc: "Stone Legion Generals, Castle Nathria",
        },
        de: {
          name: "Zwillinge der Sonnenpriesterin",
          slot: "Kopf, Schulter",
          desc: "'Seele der Macht' gewährt auch bei Anwendung auf Verbündete 100% seines Effekts.",
          droploc: "Generäle der Steinlegion",
        },
        fr: {
          name: "Prêtresse des Jumeaux du soleil",
          slot: "Tête, Épaule",
          desc: "Infusion de puissance vous confère également 100% de ses effets lorsque vous l’utilisez sur un allié.",
          droploc: "généraux de la Légion de pierre",
        },

        ru: {
          name: "Близнецы жрицы Солнца",
          slot: "Голова, Плечо",
          desc: "Когда вы применяете 'Придание сил' к союзнику, то тоже получаете 100% его эффекта.",
          droploc: "генералы Каменного легиона",
        },
        ch: {
          name: "双子太阳女祭司",
          slot: "头部、肩部",
          desc: "对盟友使用能量灌注时，也会使你获得其100%的效果。",
          droploc: "顽石军团干将",
        },
      };
      break;

    case "Divine Image":
      legendaryDetails = {
        en: {
          name: "Divine Image",
          slot: "Head or Waist",
          desc: "When you use a Holy Word spell, you have a chance to summon a Naaru to your side. For 15s, the Naaru will cast similar spells to you.",
          droploc: "Torghast, Coldheart Interstitia, Layer 3+",
        },
        de: {
          name: "Göttliches Abbild",
          slot: "Kopf, Taille",
          desc:
            "Beim Einsatz eines Segensworts besteht eine Chance, dass ein Abbild eines Naaru an Eure Seite beschworen wird. Für die nächsten 15 sec imitiert der Naaru alle von Euch gewirkten Zauber.",
          droploc: "Kaltherzinterstitia, Ebene 3+",
        },
        fr: {
          name: "Image divine",
          slot: "Tête, Taille",
          desc:
            "Lorsque vous lancez un sort Mot sacré, vous avez une chance d’invoquer une image d’un Naaru à vos côtés. Pendant 15 sec, chaque fois que vous lancez un sort, le Naaru le lance également.",
          droploc: "Interstice Cœur-Algide, échelon 3 ou plus",
        },
        ru: {
          name: "Божественный обра",
          slot: "Голова, Пояс",
          desc: "Применяя 'Слово Света', вы можете призвать образ наару. В течение 15 sec. при каждом применении вами заклинания призванный наару будет применять аналогичное заклинание.",
          droploc: "Междумирье Бессердечных, этаж 3+",
        },
        ch: {
          name: "神圣镜像",
          slot: "头部、腰部",
          desc: "当你使用圣言法术时，有几率在你身边召唤一个纳鲁镜像。在15 sec内，你每施放一个法术，纳鲁也将施放一个类似的法术。",
          droploc: "凇心间隙，难度3+",
        },
      };
      break;

    case "Flash Concentration":
      legendaryDetails = {
        en: {
          name: "Flash Concentration",
          slot: "Neck or Wrist",
          desc: "Each time you cast Flash Heal, Heal has it's casting time reduced by 0.1s and healing increased by 3%, stacking 5 times.",
          droploc: "Grand Proctor Beryllia, Sanguine Depths",
        },
        de: {
          name: "Blitzkonzentration",
          slot: "Hals, Handgelenk",
          desc: "Jedes Mal, wenn Ihr 'Blitzheilung' wirkt, wird die Zauberzeit von 'Heilung' um 0.2 Sek. verringert und seine Heilung um 3% erhöht. Bis zu 5-mal stapelbar.",
          droploc: "Großaufseherin Beryllia",
        },
        fr: {
          name: "Concentration éclair",
          slot: "Cou, Poignets",
          desc: "Chaque fois que vous lancez Soins rapides, votre sort Soins voit son temps d’incantation réduit de 0.2 s et ses soins augmentés de 3%. Cumulable jusqu’à 5 fois.",
          droploc: "grande déléguée Beryllia",
        },
        ru: {
          name: "Быстрая концентрация",
          slot: "Шея, Запястьяt",
          desc: "'Исцеление', примененное после 'Быстрого исцеления', требует на 0.2 сек. меньше времени на применение и восполняет на 3% больше здоровья. Суммируется до 5 раз.",
          droploc: "верховная надзирательница Бериллия",
        },
        ch: {
          name: "快速专注",
          slot: "颈部、腕部",
          desc: "每当你施放快速治疗时，治疗术的施法时间缩短0.2秒，治疗效果提高3%，该效果最多可叠加5次。",
          droploc: "大学监贝律莉娅",
        },
      };
      break;

    case "Harmonious Apparatus":
      legendaryDetails = {
        en: {
          name: "Harmonious Apparatus",
          slot: "Shoulder or Finger",
          desc: "Circle of healing reduces the cooldown on HW: Sanctify, Prayer of Mending reduces the cooldown on HW: Serenity, and Holy Fire reduces the cooldown on HW: Chastise by 4s.",
          droploc: "Sire Denathrius, Castle Nathria",
        },
        de: {
          name: "Harmonischer Apparat",
          slot: "Schulter, Finger",
          desc:
            "'Kreis der Heilung' verringert die Abklingzeit von 'Segenswort: Heiligung', 'Gebet der Besserung' verringert die Abklingzeit von 'Segenswort: Epiphanie' und 'Heiliges Feuer' verringert die Abklingzeit von 'Segenswort: Züchtigung' um 4 Sek.",
          droploc: "Graf Denathrius",
        },
        fr: {
          name: "Appareil harmonieux",
          slot: "Épaule, Doigt",
          desc:
            "Cercle de soins réduit le temps de recharge de Mot sacré : Sanctification, Prière de guérison réduit le temps de recharge de Mot sacré : Sérénité, et Flammes sacrées réduit le temps de recharge de Mot sacré : Châtier de 4 s.",
          droploc: "sire Denathrius",
        },

        ru: {
          name: "Аппарат гармонии",
          slot: "Плечо, Палец",
          desc:
            "'Круг исцеления' сокращает время восстановления 'Слова Света: Освящение', 'Молитва восстановления' сокращает время восстановления 'Слова Света: Безмятежность', а 'Священный огонь' сокращает время восстановления 'Слова Света: Наказание' на 4 сек.",
          droploc: "сир Денатрий",
        },
        ch: {
          name: "谐律装置",
          slot: "肩部、手指",
          desc: "治疗之环会使圣言术：灵的冷却时间缩短，愈合祷言会使圣言术：静的冷却时间缩短，神圣之火会使圣言术：罚的冷却时间缩短，缩短的数值均为4秒。",
          droploc: "德纳修斯大帝",
        },
      };
      break;

    case "X'anshi, Return of Archbishop Benedictus":
      legendaryDetails = {
        en: {
          name: "X'anshi, Return of Archbishop Benedictus",
          slot: "Legs or Back",
          desc: "After Spirit of Redemption expires, you will revive at up to 100% health, based on your effectiveness during Spirit of Redemption. 10 minute cooldown after reviving.",
          droploc: "Valinor, World Boss",
        },
        de: {
          name: "X'anshi, Rückkehr von Erzbischof Benedictus",
          slot: "Beine, Rücken",
          desc:
            "Wenn Euer Geist der Erlösung abläuft, werdet Ihr mit bis zu 100% Gesundheit wiederbelebt, abhängig davon, wie effektiv Ihr als Geist der Erlösung wart. Nach Eurer Wiederbelebung kann der Geist der Erlösung 10 min lang nicht erneut ausgelöst werden.",
          droploc: "Valinor, das Licht der Äonen",
        },

        fr: {
          name: "X’anshi, retour de l’archevêque Benedictus",
          slot: "Jambes, Dos",
          desc:
            "Après la dissipation d’Esprit de rédemption, vous revenez à la vie avec un maximum de 100% de vos points de vie, en fonction de l’efficacité dont vous avez fait preuve sous votre forme d’Esprit de rédemption. Après être revenu à la vie, vous ne pouvez pas bénéficier de cet effet pendant 10 min.",
          droploc: "Valinor, la Lumière des éons",
        },
        ru: {
          name: "Кс'анши, Возвращение архиепископа Бенедикта",
          slot: "Ноги, Спина",
          desc:
            "По истечении времени действия 'Духа воздаяния' вы возрождаетесь с запасом здоровья до 100% максимального в зависимости от эффективности действий в облике духа воздаяния. После возрождения этот эффект не срабатывает в течение 10 min.",
          droploc: "'Валинор', Светоч Эпох",
        },
        ch: {
          name: "萨什，大主教本尼迪塔斯的归来",
          slot: "腿部、背部",
          desc: "在救赎之魂消失后，你将会复活，恢复最多100%的生命值，恢复的生命值由你在救赎之魂下产生的有效治疗决定。每10 min只能触发一次。",
          droploc: "瓦里诺，万古之光",
        },
      };
      break;

    case "Vault of Heavens":
      legendaryDetails = {
        en: {
          name: "Vault of Heavens",
          slot: "Wrist or Finger",
          desc: "Leap of Faith instead causes you to leap to the target, and has two charges.",
          droploc: "PvP Honor Vendor",
        },
        de: {
          name: "Sprung der Himmel",
          slot: "Handgelenk, Finger",
          desc: "'Glaubenssprung' lässt Euch zu Eurem Ziel springen und hat 2 Aufladungen.",
          droploc: "Gegen Ehre von Lieferant Zo'kuul erhältlich.",
        },
        fr: {
          name: "Voûte céleste",
          slot: "Poignets, Doigt",
          desc: "Saut de foi vous permet de bondir jusqu’à votre cible et possède 2 charges.",
          droploc: " À acheter contre des points d’honneur auprès du pourvoyeur Zo’kuul.",
        },
        ru: {
          name: "Небесный прыжок",
          slot: "Запястья, Палец",
          desc: "'Духовное рвение' имеет 2 заряда и переносит вас к цели.",
          droploc: "Покупается за очки чести у поставщика Зо'куула.",
        },
        ch: {
          name: "天堂之跃",
          slot: "腕部、手指",
          desc: "信仰飞跃现在会使你向目标跳去，并且可以使用2次。",
          droploc: "用荣誉点数从承销商佐·库尔处购买。",
        },
      };
      break;

    /* ---------------------------------------------------------------------------------------------- */
    /*                                     9.1 Priest Legendaries                                     */
    /* ---------------------------------------------------------------------------------------------- */

    /* ------------------------------------------- Kyrian ------------------------------------------- */

    case "Spheres' Harmony":
      legendaryDetails = {
        en: {
          name: "Spheres' Harmony",
          slot: "Shoulder, Legs (recommended)",
          desc: "Boon of the Ascended's cooldown is reduced by 3 seconds, up to 60 sec, for each stack of Boon of the Ascended consumed by Ascended Eruption.",
          droploc: "Kyrian",
          covenant: "Kyrian",
        },
        de: {
          name: "",
          slot: "",
          desc: "",
          droploc: "",
          covenant: "Kyrian",
        },
        fr: {
          name: "",
          slot: "",
          desc: "",
          droploc: "",
          covenant: "Kyrian",
        },
        ru: {
          name: "",
          slot: "",
          desc: "",
          droploc: "",
          covenant: "Kyrian",
        },
        ch: {
          name: "",
          slot: "",
          desc: "",
          droploc: "",
          covenant: "Kyrian",
        },
      };
      break;

      /* ------------------------------------------ Necrolord ----------------------------------------- */
      case "Pallid Command":
        legendaryDetails = {
          en: {
            name: "Pallid Command",
            slot: "Feet, Finger",
            desc: "Casting Unholy Nova summons a Brooding Cleric that gains 2% additional healing each time an enemy affected by Unholy Transfusion is damaged by an ally, up to 100%. The Brooding Cleric heals allies for 20 seconds.",
            droploc: "Necrolord",
            covenant: "Necrolord",
          },
          de: {
            name: "",
            slot: "",
            desc: "",
            droploc: "",
            covenant: "Necrolord",
          },
          fr: {
            name: "",
            slot: "",
            desc: "",
            droploc: "",
            covenant: "Necrolord",
          },
          ru: {
            name: "",
            slot: "",
            desc: "",
            droploc: "",
            covenant: "Necrolord",
          },
          ch: {
            name: "",
            slot: "",
            desc: "",
            droploc: "",
            covenant: "Necrolord",
          },
        };
        break;

        /* ------------------------------------------ Night Fae ----------------------------------------- */
        case "Bwonsamdi's Pact":
          legendaryDetails = {
            en: {
              name: "Bwonsamdi's Pact",
              slot: "Head, Waist, Hands",
              desc: "Enter a pact with the Death Loa, calling forth a haunted mask that lingers on a target until Fae Guardians ends. Haunted Mask: Copies the benefit of the current faerie on its target. Follows your Direct Mask.",
              droploc: "Night Fae",
              covenant: "Night Fae",
            },
            de: {
              name: "",
              slot: "",
              desc: "",
              droploc: "",
              covenant: "Night Fae",
            },
            fr: {
              name: "",
              slot: "",
              desc: "",
              droploc: "",
              covenant: "Night Fae",
            },
            ru: {
              name: "",
              slot: "",
              desc: "",
              droploc: "",
              covenant: "Night Fae",
            },
            ch: {
              name: "",
              slot: "",
              desc: "",
              droploc: "",
              covenant: "Night Fae",
            },
          };
          break;

          /* ------------------------------------------- Venthyr ------------------------------------------ */
          case "Shadow Word: Manipulation":
            legendaryDetails = {
              en: {
                name: "Shadow Word: Manipulation",
                slot: "Neck, Wrist",
                desc: "Mindgames lasts an additional 3 sec and reverses an additional 10% damage or healing. When Mindgames can no longer reverse healing or damage, gain 5% Critical Strike for each second remaining for 10 sec.",
                droploc: "Venthyr",
                covenant: "Venthyr",
              },
              de: {
                name: "",
                slot: "",
                desc: "",
                droploc: "",
                covenant: "Venthyr",
              },
              fr: {
                name: "",
                slot: "",
                desc: "",
                droploc: "",
                covenant: "Venthyr",
              },
              ru: {
                name: "",
                slot: "",
                desc: "",
                droploc: "",
                covenant: "Venthyr",
              },
              ch: {
                name: "",
                slot: "",
                desc: "",
                droploc: "",
                covenant: "Venthyr",
              },
            };
            break;

    /* ---------------------------------------------------------------------------------------------- */
    /*                                             Shaman                                             */
    /* ---------------------------------------------------------------------------------------------- */

    case "Earthen Harmony":
      legendaryDetails = {
        en: {
          name: "Earthen Harmony",
          slot: "Chest, Back (recommended)",
          desc: "Earth Shield healing is increased by 150% if your earth shield target is below 75% health, and healing wave adds a stack of Earth Shield to your target.",
          droploc: "General Kaal, Sanguine Depths",
        },
        de: {
          name: "Irdene Harmonie",
          slot: "Brust, Rücken",
          desc:
            "Die Heilung von 'Erdschild' wird um 150% erhöht, wenn das Ziel Eures Erdschilds weniger als 75% Gesundheit hat. Zusätzlich gewährt 'Welle der Heilung' dem Ziel einen Stapel von 'Erdschild', bis zu maximal 9 Stapeln.",
          droploc: "General Kaal",
        },
        fr: {
          name: "Harmonie terrestre",
          slot: "Torse, Dos",
          desc:
            "Les soins de Bouclier de terre sont augmentés de 150% si sa cible a moins de 75% de ses points de vie. Vague de soins ajoute une charge de Bouclier de terre sur la cible, à concurrence de 9 charges maximum.",
          droploc: "général Kaal",
        },
        ru: {
          name: "Земная гармония",
          slot: "Грудь, Спина",
          desc:
            "Если запас здоровья цели, на которую наложен ваш 'Щит земли', составляет менее 75%, сила исцеления от 'Щита земли' увеличивается на 150%, а 'Волна исцеления' увеличивает количество эффектов 'Щита земли' на 1. Максимальное количество эффектов – 9.",
          droploc: "Кровавые катакомбы",
        },
        ch: {
          name: "大地祥和",
          slot: "胸部、背部",
          desc: "治疗波可以添加一层大地之盾效果，至多9层最大层数。如果你的大地之盾的目标低于75%生命值，大地之盾的治疗效果提高150%。",
          droploc: "卡尔将军",
        },
      };
      break;

    case "Jonat's Natural Focus":
      legendaryDetails = {
        en: {
          name: "Jonat's Natural Focus",
          slot: "Waist or Legs",
          desc: "Healing Wave and Healing Surge increase the healing done by your next chain heal by 10%, stacking up to 5 times.",
          droploc: "Torghast, Skoldus Hall, Layer 3+",
        },
        de: {
          name: "Jonats Naturfokus",
          slot: "Taille, Beine",
          desc: "'Welle der Heilung' und 'Heilende Woge' erhöhen die Heilung Eures nächsten Einsatzes von 'Kettenheilung' um 10%. Dieser Effekt ist bis zu 5-mal stapelbar.",
          droploc: "Skoldushalle, Ebene 3+",
        },
        fr: {
          name: "Focalisation naturelle de Jonat",
          slot: "Taille, Jambes",
          desc: "Vague de soins et Afflux de soins augmentent de 10% les soins de la prochaine Salve de guérison. Cumulable jusqu’à 5 fois.",
          droploc: "Salle de Skoldus, échelon 3 ou plus",
        },
        ru: {
          name: "Природное средоточие Джоната",
          slot: "Пояс, Ноги",
          desc: "'Волна исцеления' и 'Исцеляющий всплеск' усиливают исцеление от следующего 'Цепного исцеления' на 10%. Суммируется до 5 раз.",
          droploc: "Чертоги Скольда, этаж 3+",
        },
        ch: {
          name: "约纳特的自然专注",
          slot: "腰部、腿部",
          desc: "施放治疗波或治疗之涌后，你下一个治疗链的治疗效果提高10%，最多叠加5次。",
          droploc: "斯科杜斯之厅，难度3+",
        },
      };
      break;

    case "Primal Tide Core":
      legendaryDetails = {
        en: {
          name: "Primal Tide Core",
          slot: "Head, Hands (recommended)",
          desc: "Every 4 casts of Riptide also applies Riptide to another friendly target near your Riptide target.",
          droploc: "Torghast, The Soulforges, Layer 3+",
        },
        de: {
          name: "Urzeitlicher Flutenkern",
          slot: "Kopf, Hände",
          desc: "Alle 4 Einsätze von 'Springflut' wird 'Springflut' einem zusätzlichen verbündeten Ziel in der Nähe des Ziels der Fähigkeit gewährt.",
          droploc: "Die Seelenschmieden, Ebene 3+",
        },
        fr: {
          name: "Noyau de marée primordiale",
          slot: "Tête, Mains",
          desc: "Toutes les 4 incantations de Remous, applique cette technique à un allié supplémentaire proche de la cible initiale.",
          droploc: "Forges des Âmes, échelon 3 ou plus",
        },
        ru: {
          name: "Изначальное сердце волн",
          slot: "Голова, Кисти рук",
          desc: "Каждое 4-е применение 'Быстрины' также применяет 'Быстрину' к другому союзнику рядом с целью.",
          droploc: "Кузни душ, этаж 3+",
        },
        ch: {
          name: "始源之潮核心",
          slot: "头部、手",
          desc: "每施放4次激流，你的激流就会施加给初始激流目标附近的另一个友方目标。",
          droploc: "灵魂熔炉，难度3+",
        },
      };
      break;

    case "Ancestral Reminder":
      legendaryDetails = {
        en: {
          name: "Ancestral Reminder",
          slot: "Wrist or Finger",
          desc: "Heroism / Bloodlust lasts an extra 20s on you, and you gain an extra 10% haste from it's effect.",
          droploc: "Stone Legion Generals, Castle Nathria",
        },
        de: {
          name: "Erinnerung der Ahnen",
          slot: "Handgelenk, Finger",
          desc: "'Kampfrausch' und ähnliche Effekte halten bei Euch 20.0 Sek. länger an und Effekte wie 'Kampfrausch' erhöhen Euer Tempo um zusätzlich 10%.",
          droploc: "Generäle der Steinlegion",
        },
        fr: {
          name: "Réminiscence ancestrale",
          slot: "Poignets, Doigt",
          desc: "La durée",
          droploc: "généraux de la Légion de pierre",
        },
        ru: {
          name: "Напоминание предков",
          slot: "Запястья, Палец",
          desc: "'Жажда крови' и другие аналогичные эффекты воздействуют на вас на 20.0 сек. дольше. Кроме того, эффекты типа 'Жажды крови' повышают вашу скорость еще на 10%.",
          droploc: "генералы Каменного легиона",
        },
        ch: {
          name: "先祖之忆",
          slot: "腕部、手指",
          desc: "嗜血以及其他相似效果在你身上的持续时间延长20.0秒，嗜血以及其他相似效果还会使你额外获得10%的急速。",
          droploc: "顽石军团干将",
        },
      };
      break;

    case "Chains of Devastation":
      legendaryDetails = {
        en: {
          name: "Chains of Devastation",
          slot: "Neck or Chest",
          desc: "Casting Chain Heal makes your next Chain Lightning instant cast. Casting Chain Lightning makes your next Chain Heal instant cast.",
          droploc: "PvP Honor Vendor",
        },
        de: {
          name: "Ketten der Verheerung",
          slot: "Hals, Brust",
          desc:
            "'Kettenheilung' macht Euren nächsten Einsatz von 'Kettenblitzschlag' zum Spontanzauber[und lässt ihn 50% mehr Schaden verursachen]. 'Kettenblitzschlag' macht Euren nächsten Einsatz von 'Kettenheilung' zum Spontanzauber[und lässt ihn kein Mana verbrauchen].",
          droploc: "Gegen Ehre von Lieferant Zo'kuul erhältlich.",
        },
        fr: {
          name: "Chaînes de dévastation",
          slot: "Cou, Torse",
          desc:
            "Salve de guérison rend votre prochaine incantation de Chaîne d’éclairs instantanée[et augmente ses dégâts de 50%]. Chaîne d’éclairs rend votre prochaine incantation de Salve de guérison instantanée[et annule son coût en mana].",
          droploc: "À acheter contre des points d’honneur auprès du pourvoyeur Zo’kuul.",
        },
        ru: {
          name: "Разрушительные цепи",
          slot: "Шея, Грудь",
          desc:
            "Применение 'Цепного исцеления' позволяет применить следующую 'Цепную молнию' мгновенно[. Эта 'Цепная молния' наносит на 50% больше урона]. Применение 'Цепной молнии' позволяет применить следующее 'Цепное исцеление' мгновенно[. Это 'Цепное исцеление' не требует маны].",
          droploc: "Покупается за очки чести у поставщика Зо'куула.",
        },
        ch: {
          name: "毁灭之链",
          slot: "颈部、胸部",
          desc: "施放治疗链会使你的下一个闪电链变为瞬发[，并且造成的伤害提高50%]。施放闪电链会使你的下一个治疗链变为瞬发[，且不消耗法力值]。",
          droploc: "用荣誉点数从承销商佐·库尔处购买。",
        },
      };
      break;

    case "Deeply Rooted Elements":
      legendaryDetails = {
        en: {
          name: "Deeply Rooted Elements",
          slot: "Head or Shoulder",
          desc: "Casting Riptide has a 7% chance to activate Ascendance for 6 seconds.",
          droploc: "The Great Vault",
        },
        de: {
          name: "Tief verwurzelte Elemente",
          slot: "Kopf, Schulter",
          desc: "Der Einsatz von 'Sturmschlag' hat eine Chance von 8%, für 6.0 Sek. 'Aszendenz' zu aktivieren.",
          droploc: "Quest: Die Große Schatzkammer",
        },
        fr: {
          name: "Éléments profondément enracinés",
          slot: "Tête, Épaule",
          desc: "Lancer Frappe-tempête a 8% de chances d’activer Ascendance pendant 6.0 s.",
          droploc: "Quête : La grande chambre forte",
        },
        ru: {
          name: "Укоренившиеся стихии",
          slot: "Голова, Плечо",
          desc: "Применение 'Удара бури' с вероятностью 8% на 6.0 сек. активирует 'Перерождение'.",
          droploc: "Задание 'Великое хранилище'",
        },
        ch: {
          name: "根深蒂固的元素",
          slot: "头部、肩部",
          desc: "施放 风暴打击有8%的几率激活升腾，持续6.0秒。",
          droploc: "任务：宏伟宝库",
        },
      };
      break;

    case "Spiritwalker's Tidal Totem":
      legendaryDetails = {
        en: {
          name: "Spiritwalker's Tidal Totem",
          slot: "Legs (recommended), Back",
          desc: "After using Mana Tide Totem, the cast time of Healing Wave and Chain Heal is reduced by 50% and the mana cost by 25% for 10s.",
          droploc: "Huntsman Altimor, Castle Nathria",
        },
        de: {
          name: "Gezeitentotem des Geistwandlers",
          slot: "Beine, Rücken",
          desc:
            "Nach dem Aufstellen Eures Totems der Manaflut wird die Zauberzeit von 'Welle der Heilung' und 'Kettenheilung' um 50% verringert und die Manakosten von 'Kettenheilung' und 'Welle der Heilung' werden um 25% verringert. Hält 10 sec lang an.",
          droploc: "Jäger Altimor",
        },
        fr: {
          name: "Totem des marées du marcheur des esprits",
          slot: "Jambes, Dos",
          desc: "Après utilisation de Totem de vague de mana, le temps d’incantation de Vague de soins et Salve de guérison est réduit de 50%, et leur coût en mana est réduit de 25% pendant 10 sec.",
          droploc: "Altimor le Veneur",
        },
        ru: {
          name: "Тотем волн духостранника",
          slot: "Ноги, Спина",
          desc:
            "Когда вы призываете тотем прилива маны, время применения 'Волны исцеления' и 'Цепного исцеления' сокращается на 50%, а затраты маны на применение 'Цепного исцеления' и 'Волны исцеления' снижаются на 25%. Время действия – 10 sec.",
          droploc: "ловчий Альтимор",
        },
        ch: {
          name: "灵魂行者的潮汐图腾",
          slot: "腿部、背部",
          desc: "使用法力之潮图腾后，治疗波和治疗链的施法时间缩短50%，法力值消耗减少25%，持续10 sec。",
          droploc: "猎手阿尔迪莫",
        },
      };
      break;

      /* ---------------------------------------------------------------------------------------------- */
      /*                                     9.1 Shaman Legendaries                                     */
      /* ---------------------------------------------------------------------------------------------- */

      /* ------------------------------------------- Kyrian ------------------------------------------- */

      case "Raging Vesper Vortex":
        legendaryDetails = {
          en: {
            name: "Raging Vesper Vortex",
            slot: "Feet, Legs (recommended)",
            desc: "When 3 charges of Vesper Totem are consumed, Vesper Totem will radiate a 15 yd burst of (200% of Spell power) Arcane damage and (220% of Spell power) healing.",
            droploc: "Kyrian Renown 48",
            covenant: "Kyrian",
          },
          de: {
            name: "",
            slot: "",
            desc: "",
            droploc: "",
            covenant: "Kyrian",
          },
          fr: {
            name: "",
            slot: "",
            desc: "",
            droploc: "",
            covenant: "Kyrian",
          },
          ru: {
            name: "",
            slot: "",
            desc: "",
            droploc: "",
            covenant: "Kyrian",
          },
          ch: {
            name: "",
            slot: "",
            desc: "",
            droploc: "",
            covenant: "Kyrian",
          },
        };
        break;

        /* ------------------------------------------ Night Fae ----------------------------------------- */
        case "Seeds of Rampant Growth":
          legendaryDetails = {
            en: {
              name: "Seeds of Rampant Growth",
              slot: "Head, Hands",
              desc: "Each pulse of Fae Transfusion's damage effect reduces the cooldown of Feral Spirit by 7.0 sec and increases your critical strike chance by 3% for 15 sec.",
              droploc: "Night Fae Renown 48",
              covenant: "Night Fae",
            },
            de: {
              name: "",
              slot: "",
              desc: "",
              droploc: "",
              covenant: "Night Fae",
            },
            fr: {
              name: "",
              slot: "",
              desc: "",
              droploc: "",
              covenant: "Night Fae",
            },
            ru: {
              name: "",
              slot: "",
              desc: "",
              droploc: "",
              covenant: "Night Fae",
            },
            ch: {
              name: "",
              slot: "",
              desc: "",
              droploc: "",
              covenant: "Night Fae",
            },
          };
          break;

          /* ------------------------------------------ Necrolord ----------------------------------------- */
          case "Splintered Elements":
            legendaryDetails = {
              en: {
                name: "Splintered Elements",
                slot: "Neck, Waist",
                desc: "Each additional Lightning Bolt generated by Primordial Wave increases your Haste by 5% for 10 sec.",
                droploc: "Necrolord Renown 48",
                covenant: "Necrolord",
              },
              de: {
                name: "",
                slot: "",
                desc: "",
                droploc: "",
                covenant: "Necrolord",
              },
              fr: {
                name: "",
                slot: "",
                desc: "",
                droploc: "",
                covenant: "Necrolord",
              },
              ru: {
                name: "",
                slot: "",
                desc: "",
                droploc: "",
                covenant: "Necrolord",
              },
              ch: {
                name: "",
                slot: "",
                desc: "",
                droploc: "",
                covenant: "Necrolord",
              },
            };
            break;

            /* ------------------------------------------- Venthyr ------------------------------------------ */
            case "Elemental Conduit":
              legendaryDetails = {
                en: {
                  name: "Elemental Conduit",
                  slot: "Chest, Wrist",
                  desc: "Up to 5 friendly targets healed by Chain Harvest have Riptide applied to them. Up to 5 enemy targets damaged by Chain Harvest have Flame Shock applied to them.",
                  droploc: "Venthyr Renown 48",
                  covenant: "Venthyr",
                },
                de: {
                  name: "",
                  slot: "",
                  desc: "",
                  droploc: "",
                  covenant: "Venthyr",
                },
                fr: {
                  name: "",
                  slot: "",
                  desc: "",
                  droploc: "",
                  covenant: "Venthyr",
                },
                ru: {
                  name: "",
                  slot: "",
                  desc: "",
                  droploc: "",
                  covenant: "Venthyr",
                },
                ch: {
                  name: "",
                  slot: "",
                  desc: "",
                  droploc: "",
                  covenant: "Venthyr",
                },
              };
              break;
    /* ---------------------------------------------------------------------------------------------- */
    /*                                              Monk                                              */
    /* ---------------------------------------------------------------------------------------------- */

    case "Escape from Reality":
      legendaryDetails = {
        en: {
          name: "Escape from Reality",
          slot: "Neck or Chest",
          desc:
            "After you use Transcendence: Transfer, you can use Transcendence: Transfer again within 10 sec, ignoring its cooldown. During this time, if you cast Vivify on yourself, its healing is increased by 70% and 50% of its cost is refunded.",
          droploc: "The Great Vault",
        },
        de: {
          name: "Flucht aus der Realität",
          slot: "Hals, Brust",
          desc:
            "Nach dem Einsatz von 'Transzendenz: Transfer' könnt Ihr 'Transzendenz: Transfer' innerhalb von 10 sec ungeachtet der Abklingzeit erneut einsetzen. Wenn Ihr während dieser Zeit 'Beleben' bei Euch selbst einsetzt, ist die Heilung um 70% erhöht und 50% der Kosten werden erstattet.",
          droploc: "Quest: Die Große Schatzkammer",
        },
        fr: {
          name: "Fuir la réalité",
          slot: "Cou, Torse",
          desc:
            "Vous pouvez réutiliser Transcendance : Transfert dans les 10 sec qui suivent son utilisation en ignorant son temps de recharge. Pendant cette durée, lorsque vous lancez Vivifier sur vous-même, les soins prodigués sont augmentés de 50% et son coût est réduit de 70%.",
          droploc: "Quête : La grande chambre forte",
        },
        ru: {
          name: "Бегство от реальности",
          slot: "Шея, Грудь",
          desc:
            "После применения 'Трансцендентности: перенос' вы можете снова применить 'Трансцендентность: перенос' в течение 10 sec., несмотря на время восстановления. Если в это время вы применяете 'Оживить' к себе, исцеление от него усиливается на 70%%, а вы восполняете 50% затраченного ресурса.",
          droploc: "Задание 'Великое хранилище'",
        },
        ch: {
          name: "魂游天外",
          slot: "颈部、胸部",
          desc: "在你使用魂体双分：转移后，你可以无视冷却时间在10 sec内再次使用魂体双分：转移。 在此期间，如果你对自己施放活血术，治疗效果会提高70%，并会返还消耗法力值的50%。",
          droploc: "任务：宏伟宝库",
        },
      };
      break;

    case "Invoker's Delight":
      legendaryDetails = {
        en: {
          name: "Invoker's Delight",
          slot: "Head, Shoulder, Cape (recommended)",
          desc: "You gain 33% haste for 20 sec after summoning your Celestial.",
          droploc: "Stone Legion Generals, Castle Nathria",
        },
        de: {
          name: "Freude des Beschwörers",
          slot: "Kopf, Schulter",
          desc: "Nachdem Ihr Euren Erhabenen beschworen habt, erhaltet Ihr für 20 sec 33% Tempo.",
          droploc: "Generäle der Steinlegion",
        },
        fr: {
          name: "Délice de l’invocateur",
          slot: "Tête, Épaule",
          desc: "Vous gagnez un bonus à la Hâte de 33% pendant 20 sec après avoir invoqué votre astre vénérable.",
          droploc: "généraux de la Légion de pierre",
        },
        ru: {
          name: "Радость заклинателя",
          slot: "Голова, Плечо",
          desc: "Повышает скорость на 33% на 20 sec. после призыва небожителя.",
          droploc: "генералы Каменного легиона",
        },
        ch: {
          name: "祈求者之愉",
          slot: "头部、肩部",
          desc: "在召唤天神后，你将在20 sec内获得33%的急速。",
          droploc: "顽石军团干将",
        },
      };
      break;

    case "Ancient Teachings of the Monastery":
      legendaryDetails = {
        en: {
          name: "Ancient Teachings of the Monastery",
          slot: "Wrist (recommended), Hands",
          desc: "After casting Essence Font, your Tiger Palm, Blackout Kick, and Rising Sun Kick heal an injured ally within 20 yards for 250% of the damage done. Lasts 15 sec.",
          droploc: "Devos, Spires of Ascension",
        },
        de: {
          name: "Uralte Lehren des Klosters",
          slot: "Handgelenk, Hände",
          desc:
            "Nach dem Einsatz von 'Essenzborn' heilen Eure Fähigkeiten 'Tigerklaue', 'Blackout-Tritt' und 'Tritt der aufgehenden Sonne' einen verletzten Verbündeten innerhalb von 20 Metern um 250% des verursachten Schadens. Hält 15 sec lang an.",
          droploc: "Devos, Paragon des Zweifels",
        },
        fr: {
          name: "Enseignements ancestraux du monastère",
          slot: "Poignets, Mains",
          desc:
            "Après avoir lancé Réceptacle d’essence, Paume du tigre, Frappe du voile noir et Coup de pied du soleil levant rendent à un allié blessé à moins de 20 mètres un montant de points de vie égal à 250% des dégâts infligés. Dure 15 sec.",
          droploc: "Déva, le parangon de doute",
        },
        ru: {
          name: "Древние монастырские учения",
          slot: "Запястья, Кисти рук",
          desc:
            "После применения 'Купели сущности' следующие 'Лапа тигра', 'Нокаутирующий удар' и 'Удар восходящего солнца' исцеляют раненого союзника в радиусе 20 м, восполняя ему здоровье в объеме 250% нанесенного урона. Время действия – 15 sec.",
          droploc: "Девия, идеал Сомнения",
        },
        ch: {
          name: "禅院古训",
          slot: "腕部、手",
          desc: "施放精华之拳后，猛虎掌、幻灭踢和旭日东升踢将治疗20码范围内一位受伤的盟友，造成的治疗量相当于伤害量的250%。持续15 sec",
          droploc: "疑虑圣杰德沃丝",
        },
      };
      break;

    case "Yu'lon's Whisper":
      legendaryDetails = {
        en: {
          name: "Yu'lon's Whisper",
          slot: "Shoulder, Finger (recommended)",
          desc: "Activating Thunder Focus Tea causes you to exhale the breath of Yu'lon, healing up to 6 allies within 15 yards over 2 sec.",
          droploc: "Torghast, Fracture Chambers, Layer 3+",
        },
        de: {
          name: "Yu'lons Flüstern",
          slot: "Schulter, Finger",
          desc:
            "Wenn Ihr 'Donnerfokustee' aktiviert, atmet Ihr den Atem von Yu'lon aus, der bis zu 6 Verbündete innerhalb von 15 Metern im Verlauf von 2 sec um [(60% of Spell power) * (3)] Gesundheit heilt.",
          droploc: "Frakturkammern, Ebene 3+",
        },
        fr: {
          name: "Murmure de Yu’lon",
          slot: "Épaule, Doigt",
          desc: "Activer Thé de concentration foudroyante vous fait expirer le souffle de Yu’lon, qui rend à 6 alliés à moins de 15 mètres [(60% of Spell power) * (3)] points de vie en 2 sec.",
          droploc: "Chambres aux Fractures, échelon 3 ou plus",
        },
        ru: {
          name: "Шепот Юй-лун",
          slot: "Плечо, Палец",
          desc: "После активации 'Громового чая' от вас исходит дыхание Юй-лун, восполняющее максимум 6 союзникам в радиусе 15 м [(60% of Spell power) * (3)] ед. здоровья за 2 sec.",
          droploc: "Костоломни, этаж 3+",
        },
        ch: {
          name: "玉珑的低语",
          slot: "肩部、手指",
          desc: "激活雷光聚神茶使你能够呼出玉珑之息，在2 sec内为15码范围内至多6名盟友恢复[(60% of Spell power) * (3)]点生命值。",
          droploc: "断骨密室，难度3+",
        },
      };
      break;

    case "Clouded Focus":
      legendaryDetails = {
        en: {
          name: "Clouded Focus",
          slot: "Neck or Wrist",
          desc:
            "Healing with Enveloping Mists or Vivify while channeling Soothing Mists increases their healing done by 15% and reduces their mana cost by 15%. Stacks up to 3 times. When your Soothing Mists channel ends, this effect is cancelled.",
          droploc: "Torghast, Fracture Chambers, Layer 3+",
        },
        de: {
          name: "Umwölkter Fokus",
          slot: "Hals, Handgelenk",
          desc:
            "Heilungen mit 'Einhüllender Nebel' oder 'Beleben', während Ihr 'Beruhigender Nebel' kanalisiert, erhöhen die verursachte Heilung der beiden Fähigkeiten um 15% und verringern ihre Manakosten um 15%. Bis zu 3-mal stapelbar. Wenn das Kanalisieren von 'Beruhigender Nebel' endet, wird dieser Effekt aufgehoben.",
          droploc: "Skoldushalle, Ebene 3+",
        },
        fr: {
          name: "Focalisateur nébuleux",
          slot: "Cou, Poignets",
          desc:
            "Lancer Brumes enveloppantes ou Vivifier tout en canalisant Brumes apaisantes augmente les soins prodigués par ces techniques de 15% et réduit leur coût en mana de 15%. Cumulable jusqu’à 3 fois. Quand la canalisation de Brumes apaisantes prend fin, l’effet est annulé.",
          droploc: "Salle de Skoldus, échelon 3 ou plus",
        },
        ru: {
          name: "Затуманенная концентрация",
          slot: "Шея, Запястья",
          desc:
            "Когда вы применяете 'Окутывающий туман' или 'Оживить' во время поддержания 'Успокаивающего тумана', исцеление от них усиливается на 15%, а их стоимость снижается на 15%. Суммируется до 3 раз. Действие заканчивается по окончании поддержания 'Успокаивающего тумана'.",
          droploc: "Чертоги Скольда, этаж 3+",
        },
        ch: {
          name: "雾云专注",
          slot: "颈部、腕部",
          desc: "在引导抚慰之雾时使用氤氲之雾或活血术进行治疗，会使这两个技能的治疗效果提高15%、法力消耗降低15%。至多叠加3次。 当你的抚慰之雾引导结束时，该效果取消。",
          droploc: "斯科杜斯之厅，难度3+",
        },
      };
      break;

    case "Tear of Morning":
      legendaryDetails = {
        en: {
          name: "Tear of Morning",
          slot: "Head, Waist (recommended)",
          desc:
            "Casting Vivify or Enveloping Mist on a target with Renewing Mist has a 10% chance to spread the Renewing Mist to another target. Your Vivify healing through Renewing Mist is increased by 20% and your Enveloping Mist also heals allies with Renewing Mist for 20% of its healing.",
          droploc: "Sludgefist, Castle Nathria",
        },
        de: {
          name: "Träne des Morgens",
          slot: "Kopf, Taille",
          desc:
            "Wenn ihr 'Beleben' oder 'Einhüllender Nebel' bei einem mit 'Erneuernder Nebel' belegten Ziel einsetzt, besteht eine Chance von 10%, 'Erneuernder Nebel' auf ein weiteres Ziel anzuwenden. Eure bei mit 'Erneuernder Nebel' belegten Zielen durch 'Beleben' hervorgerufene Heilung ist um 20% erhöht und Euer 'Einhüllender Nebel' heilt diese Ziele zusätzlich um 20% seiner hervorgerufenen Heilung.",
          droploc: "Schlickfaust",
        },
        fr: {
          name: "Larme matinale",
          slot: "Tête, Taille",
          desc:
            "Lancer Vivifier ou Brume enveloppante sur une cible affectée par Brume de rénovation a 10% de chances de propager Brume de rénovation à une autre cible. Les soins prodigués par Vivifier au travers de Brume de rénovation sont augmentés de 20% et votre Brume enveloppante prodigue également 20% de ses soins aux alliés.",
          droploc: "Fangepoing",
        },
        ru: {
          name: "Утренняя слеза",
          slot: "Голова, Пояс",
          desc:
            "'Оживить' и 'Окутывающий туман', примененные к цели 'Заживляющего тумана', с вероятностью 10% распространяют 'Заживляющий туман' на другую цель. Исцеление от 'Оживить', примененное через 'Заживляющий туман', усиливается на 20%, а 'Окутывающий туман' также исцеляет союзников с 'Заживляющим туманом' с эффективностью 20%.",
          droploc: "Грязешмяк",
        },
        ch: {
          name: "晨晖之露",
          slot: "头部、腰部",
          desc:
            "对一个已经具有复苏之雾的目标施放活血术或氤氲之雾时有10的几率将复苏之雾扩散到另一个目标身上。 通过复苏之雾造成的活血术的治疗量提高20%，氤氲之雾同时会为复苏之雾的盟友恢复其治疗量20%的生命值。",
          droploc: "泥拳",
        },
      };
      break;

      /* ---------------------------------------------------------------------------------------------- */
      /*                                      9.1 Monk Legendaries                                      */
      /* ---------------------------------------------------------------------------------------------- */

      /* ------------------------------------------- Kyrian ------------------------------------------- */

      case "Call to Arms":
        legendaryDetails = {
          en: {
            name: "Call to Arms",
            slot: "Feet, Legs (recommended)",
            desc: "Weapons of Order calls forth Chi-Ji, the Red Crane / Yu'lon, the Jade Serpent to assist you for 12 sec.",
            droploc: "Kyrian Renown 48",
            covenant: "Kyrian",
          },
          de: {
            name: "",
            slot: "",
            desc: "",
            droploc: "",
            covenant: "Kyrian",
          },
          fr: {
            name: "",
            slot: "",
            desc: "",
            droploc: "",
            covenant: "Kyrian",
          },
          ru: {
            name: "",
            slot: "",
            desc: "",
            droploc: "",
            covenant: "Kyrian",
          },
          ch: {
            name: "",
            slot: "",
            desc: "",
            droploc: "",
            covenant: "Kyrian",
          },
        };
        break;

        case "Bountiful Brew":
          legendaryDetails = {
            en: {
              name: "Bountiful Brew",
              slot: "Neck, Shoulder, Chest",
              desc: "Your abilities have a low chance to cast Bonedust Brew at your target's location (1.25 procs / min).",
              droploc: "Necrolord Renown 48",
              covenant: "Necrolord",
            },
            de: {
              name: "",
              slot: "",
              desc: "",
              droploc: "",
              covenant: "Necrolord",
            },
            fr: {
              name: "",
              slot: "",
              desc: "",
              droploc: "",
              covenant: "Necrolord",
            },
            ru: {
              name: "",
              slot: "",
              desc: "",
              droploc: "",
              covenant: "Necrolord",
            },
            ch: {
              name: "",
              slot: "",
              desc: "",
              droploc: "",
              covenant: "Necrolord",
            },
          };
          break;

          case "Faeline Harmony":
            legendaryDetails = {
              en: {
                name: "Faeline Harmony",
                slot: "Waist, Hands",
                desc: "Your abilities reset Faeline Stomp 100% more often. Enemies and allies hit by Faeline Stomp are affected by Fae Exposure, increasing your damage and healing against them by 8% for 10 sec.",
                droploc: "Night Fae Renown 48",
                covenant: "Night Fae",
              },
              de: {
                name: "",
                slot: "",
                desc: "",
                droploc: "",
                covenant: "Night Fae",
              },
              fr: {
                name: "",
                slot: "",
                desc: "",
                droploc: "",
                covenant: "Night Fae",
              },
              ru: {
                name: "",
                slot: "",
                desc: "",
                droploc: "",
                covenant: "Night Fae",
              },
              ch: {
                name: "",
                slot: "",
                desc: "",
                droploc: "",
                covenant: "Night Fae",
              },
            };
            break;

            case "Sinister Teachings":
              legendaryDetails = {
                en: {
                  name: "Sinister Teachings",
                  slot: "Wrist, Finger (recommended)",
                  desc: "Fallen Order summons 1 additional adept for 24 sec. While you have an active adept, your abilities that critically hit reduce the cooldown of Fallen Order by 5 sec.",
                  droploc: "Venthyr Renown 48",
                  covenant: "Venthyr",
                },
                de: {
                  name: "",
                  slot: "",
                  desc: "",
                  droploc: "",
                  covenant: "Venthyr",
                },
                fr: {
                  name: "",
                  slot: "",
                  desc: "",
                  droploc: "",
                  covenant: "Venthyr",
                },
                ru: {
                  name: "",
                  slot: "",
                  desc: "",
                  droploc: "",
                  covenant: "Venthyr",
                },
                ch: {
                  name: "",
                  slot: "",
                  desc: "",
                  droploc: "",
                  covenant: "Venthyr",
                },
              };
              break;
  



    case "Vitality Sacrifice":
      legendaryDetails = {
        en: {
          name: "Vitality Sacrifice",
          slot: "Head, Shoulder, or Chest",
          desc:
            "Taking significant damage from a player or Elite enemy increases your damage and healing by 3% of the damage taken, up to a maximum of 9% for 20 sec. This effect can only occur every 30 sec.",
          droploc: "The Great Vault",
        },
        de: {
          name: "Vitalitätsopfer",
          slot: "Kopf, Schulter, Brust",
          desc:
            "Beträchtlichen Schaden durch einen Spielercharakter oder Elitegegner zu erleiden, erhöht Euren Schaden und Eure Heilung für 20 sec um 3% des erlittenen Schadens, bis zu maximal 9%. Dieser Effekt kann nur einmal alle 30 Sek. ausgelöst werden.",
          droploc: "Gegen Anima vom Ruhmrüstmeister erhältlich.",
        },
        fr: {
          name: "Sacrifice de vitalité",
          slot: "Tête, Épaule, Torse",
          desc:
            "Quand un personnage-joueur ou un ennemi d’élite vous inflige des dégâts importants, vos dégâts et vos soins sont augmentés à raison de 3% des dégâts subis, jusqu’à un maximum de 9% pendant 20 sec. Cet effet ne peut se produire plus d’une fois toutes les 30 s.",
          droploc: "À acheter contre de l’anima auprès de l’intendant de renom.",
        },
        ru: {
          name: "Жертвование здоровьем",
          slot: "Голова, Плечо, Грудь",
          desc:
            "При получении существенного урона от игрока или элитного противника ваш урон и объем исцеления на 20 sec. увеличиваются на 3% объема полученного урона (вплоть до 9%). Срабатывает не чаще раза в 30 сек.",
          droploc: "Покупается у торговца товарами за известность.",
        },
        ch: {
          name: "活力献祭",
          slot: "头部、肩部、胸部",
          desc: "从一名玩家或精英敌人处受到大量伤害时会使你的伤害和治疗提高，效果相当于受到伤害的3%，最高可达9%，持续20 sec。 此效果每30秒只能触发一次。",
          droploc: "从名望军需官处用心能购买。",
        },
      };
      break;

    case "Sephuz's Proclamation":
      legendaryDetails = {
        en: {
          name: "Sephuz's Proclamation",
          slot: "Neck, Shoulder, or Chest",
          desc:
            "Reduce the effectiveness of crowd controlling effects by 10%. Successfully applying a loss of control effect to an enemy, interrupting an enemy, or dispelling any target will increase all your secondary stats by 80 for 15 sec. This effect cannot occur more than once every 30 seconds.",
          droploc: "PvP Honor Vendor",
        },
        de: {
          name: "Sephuz' Proklamation",
          slot: "Hals, Schulter, Brust",
          desc:
            "Verringert die Effektivität von Kontrollverlusteffekten um 10%. Wenn Ihr einen Gegner erfolgreich mit einem Kontrollverlusteffekt belegt, ihn unterbrecht oder einen Effekt von einem Ziel bannt, werden alle Eure Sekundärwerte für 15 sec um 80 erhöht. Dieser Effekt kann nur einmal alle 30 Sek. auftreten.",
          droploc: "Gegen Ehre von Lieferant Zo'kuul erhältlich.",
        },
        fr: {
          name: "Proclamation de Sephuz",
          slot: "Cou, Épaule, Torse",
          desc:
            "Réduit l’efficacité des effets de contrôle de 10%. Appliquer un effet de perte de contrôle ou d’interruption sur un ennemi, ou bien de dissipation sur une cible, augmente toutes vos caractéristiques secondaires de 80 pendant 15 sec. Cet effet ne peut se produire plus d’une fois toutes les 30 secondes.",
          droploc: "À acheter contre des points d’honneur auprès du pourvoyeur Zo’kuul.",
        },
        ru: {
          name: "Декларация Сефуза",
          slot: "Шея, Плечо, Грудь",
          desc:
            "Ослабляет эффекты контроля на 10%. Когда вы успешно применяете к противнику эффекты контроля, прерываете способности или рассеиваете эффекты, ваши второстепенные характеристики повышаются на 80 на 15 sec. Срабатывает не чаще раза в 30 сек.",
          droploc: "Покупается за очки чести у поставщика Зо'куула.",
        },
        ch: {
          name: "塞弗斯的宣言",
          slot: "颈部、肩部、胸部",
          desc: "受到的群体控制效果降低10%。成功对一名敌人施加失控效果、打断一名敌人或驱散任意目标后，你的次要属性提高80，持续15 sec。这个效果每30秒最多触发一次。",
          droploc: "用荣誉点数从承销商佐·库尔处购买。",
        },
      };
      break;

    case "Echo of Eonar":
      legendaryDetails = {
        en: {
          name: "Echo of Eonar",
          slot: "Waist, Wrist, or Finger",
          desc:
            "Your spells and abilities have a low chance to summon a familiar to your side, increasing your healing by 10% for 10s. This effect is duplicated on up to 3 allies at 50% effectiveness, preferring allies with the same role.",
          droploc: "Wild Hunt Reputation, Revered",
        },
        de: {
          name: "Echo von Eonar",
          slot: "Taille, Handgelenk, Finger",
          desc:
            "Eure Zauber und Fähigkeiten haben eine geringe Chance, einen Geisterfamiliar an Eure Seite zu beschwören, der für 10 sec abhängig von Eurer Rolle Euren Schaden um 10%, Eure Heilung um 10% oder Eure Schadensreduktion um 10% erhöht. 50% dieses Effekts werden auf bis zu 0 Verbündete dupliziert. Dabei werden Verbündete mit derselben Rolle bevorzugt.",
          droploc: "Ihr benötigt einen respektvollen Ruf bei der Wilden Jagd und müsst Runenschnitzen freigeschaltet haben, um diese Erinnerung kaufen zu können.",
        },

        fr: {
          name: "Écho d’Eonar",
          slot: "Taille, Poignets, Doigt",
          desc:
            "Vos sorts et techniques ont une faible chance d’invoquer à vos côtés un familier spirituel qui augmente vos dégâts de 10%, vos soins de 10% ou votre réduction de dégâts de 10% pendant 10 sec selon votre rôle. Cet effet affecte également un maximum de 0 alliés, ayant de préférence le même rôle, à 50% de son efficacité.",
          droploc: "Vous devez être révéré auprès de l’Hallali et avoir débloqué la gravure runique pour acheter ce souvenir.",
        },
        ru: {
          name: "Эхо Эонар",
          slot: "Пояс, Запястья, Палец",
          desc:
            "Ваши заклинания и способности могут с небольшой вероятностью призвать духовного фамилиара-помощника, увеличивающего на 10 sec. урон на 10%, объем исцеления на 10% или защиту от урона на 10% в зависимости от роли. Бонус копируется на максимум 0 союзников с 50% эффективностью. Предпочтение отдается союзникам с такой же ролью, как у вас.",
          droploc: "Добейтесь почтения Дикой Охоты и откройте вырезание рун, чтобы приобрести это воспоминание.",
        },
        ch: {
          name: "艾欧娜尔的回响",
          slot: "腰部、腕部、手指",
          desc:
            "你的法术和技能有几率召唤一个心灵魔仆为你而战，根据你的职责而使你造成的伤害提高10%，或者治疗提高10%，或者受到的伤害降低10%，持续10 sec。此效果可以复制到最多0名盟友身上，效果为原来的50%，优先复制到具有同样职责的盟友身上。",
          droploc: "你必须在荒猎团阵营达到崇敬声望而且解锁了符文铭刻才能购买此回忆。",
        },
      };
      break;

    default:
      break;
  }

  return legendaryDetails;
};
