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
        },
        de: {
          name: "Vision des unendlichen Wachstums",
          slot: "Kopf, Füße",
        },
        fr: {
          name: "Vision de croissance sans fin",
          slot: "Tête, Pieds",
        },
        ru: {
          name: "Видение бесконечного роста",
          slot: "Голова, Ступни",
        },
        ch: {
          name: "无尽春天的愿景",
          slot: "头部、脚",
        },
      };
      break;

    case "The Dark Titans Lesson":
      legendaryDetails = {
        en: {
          name: "The Dark Titans Lesson",
          slot: "Neck or Back",
        },
        de: {
          name: "Die Lektion des Dunklen Titanen",
          slot: "Hals, Rücken",
        },
        fr: {
          name: "Leçon du Titan noir",
          slot: "Cou, Dos",
        },
        ru: {
          name: "Урок Темного титана",
          slot: "Шея, Спина",
        },
        ch: {
          name: "黑暗泰坦之训",
          slot: "颈部、背部",
        },
      };
      break;

    case "Verdant Infusion":
      legendaryDetails = {
        en: {
          name: "Verdant Infusion",
          slot: "Shoulders, Hands, Cape (recommended)",
        },
        de: {
          name: "Üppige Infusion",
          slot: "Schulter, Hände",
        },
        fr: {
          name: "Infusion verdoyante",
          slot: "Épaule, Mains",
        },
        ru: {
          name: "Живительное насыщение",
          slot: "Плечо, Кисти рук",
        },
        ch: {
          name: "翡翠灌注",
          slot: "肩部、手",
        },
      };
      break;

    case "Lycaras Fleeting Glimpse":
      legendaryDetails = {
        en: {
          name: "Lycara's Fleeting Glimpse",
          slot: "Waist or Feet",
        },
        de: {
          name: "Lycaras flüchtiger Blick",
          slot: "Taille, Füße",
        },
        fr: {
          name: "Aperçu éphémère de Lycara",
          slot: "Taille, Pieds",
        },
        ru: {
          name: "Мимолетное видение Ликары",
          slot: "Пояс, Ступни",
        },
        ch: {
          name: "莱卡拉的惊鸿一瞥",
          slot: "腰部、脚",
        },
      };
      break;

    case "Memory of the Mother Tree":
      legendaryDetails = {
        en: {
          name: "Memory of the Mother Tree",
          slot: "Legs (recommended), Wrist",
        },
        de: {
          name: "Erinnerung an den Mutterbaum",
          slot: "Beine, Handgelenk",
        },
        fr: {
          name: "Souvenir de l’Arbre-Mère",
          slot: "Jambes, Poignets",
        },
        ru: {
          name: "Память об Изначальном Древе",
          slot: "Ноги, Запястья",
        },
        ch: {
          name: "母亲之树的回忆",
          slot: "腿部、腕部",
        },
      };
      break;

    case "Oath of the Elder Druid":
      legendaryDetails = {
        en: {
          name: "Oath of the Elder Druid",
          slot: "Shoulder or Wrist",
        },
        de: {
          name: "Eid des Druidenältesten",
          slot: "Schulter, Handgelenk",
        },
        fr: {
          name: "Serment de l’ancien druide",
          slot: "Épaule, Poignets",
        },
        ru: {
          name: "Клятва старейшего друида",
          slot: "Плечо, Запястья",
        },
        ch: {
          name: "德鲁伊长者之誓",
          slot: "肩部、腕部",
        },
      };
      break;

    case "Circle of Life and Death":
      legendaryDetails = {
        en: {
          name: "Circle of Life and Death",
          slot: "Head or Finger",
        },
        de: {
          name: "Kreislauf aus Leben und Tod",
          slot: "Kopf, Finger",
        },
        fr: {
          name: "Cycle de la vie et la mort",
          slot: "Tête, Doigt",
        },
        ru: {
          name: "Круг жизни и смерти",
          slot: "Голова, Палец",
        },

        ch: {
          name: "生死循环",
          slot: "头部、手指",
        },
      };
      break;

    /* ---------------------------------------------------------------------------------------------- */
    /*                                      9.1 Druid Legendaries                                     */
    /* ---------------------------------------------------------------------------------------------- */

    /* ------------------------------------------- Kyrian ------------------------------------------- */
    case "Kindred Affinity":
      legendaryDetails = {
        en: {
          name: "Kindred Affinity",
          slot: "Neck, Shoulders (recommended)",
          covenant: "Kyrian",
        },
        de: {
          name: "Seelenaffinität",
          slot: "Hals, Schulter",
          covenant: "Kyrian",
        },
        fr: {
          name: "Affinité spirituelle",
          slot: "Cou, Épaule",
          covenant: "Kyrian",
        },
        ru: {
          name: "Связь близких душ",
          slot: "Шея, Плечо",
          covenant: "Kyrian",
        },
        ch: {
          name: "志趣亲和",
          slot: "颈部、肩部",
          covenant: "Kyrian",
        },
      };
      break;

    /* ------------------------------------------- Venthyr ------------------------------------------ */
    case "Sinful Hysteria":
      legendaryDetails = {
        en: {
          name: "Sinful Hysteria",
          slot: "Waist or Hands",
          covenant: "Venthyr",
        },
        de: {
          name: "Sündhafte Hysterie",
          slot: "Taille, Hände",
          covenant: "Venthyr",
        },
        fr: {
          name: "Hystérie coupable",
          slot: "Taille, Mains",
          covenant: "Venthyr",
        },
        ru: {
          name: "Греховная истерия",
          slot: "Пояс, Кисти рук",
          covenant: "Venthyr",
        },

        ch: {
          name: "罪孽癔狂",
          slot: "腰部、手",
          covenant: "Venthyr",
        },
      };
      break;

    /* ------------------------------------------ Necrolord ----------------------------------------- */
    case "Unbridled Swarm":
      legendaryDetails = {
        en: {
          name: "Unbridled Swarm",
          slot: "Chest, Wrist (recommended)",
          covenant: "Necrolord",
        },
        de: {
          name: "Ungezügelter Schwarm",
          slot: "Brust, Handgelenk",
          covenant: "Necrolord",
        },
        fr: {
          name: "Essaim déchaîné",
          slot: "Torse, Poignets",
          covenant: "Necrolord",
        },
        ru: {
          name: "Неудержимый рой",
          slot: "Грудь, Запястья",
          covenant: "Necrolord",
        },
        ch: {
          name: "不羁蜂群",
          slot: "胸部、腕部",
          covenant: "Necrolord",
        },
      };
      break;

    /* ------------------------------------------ Night Fae ----------------------------------------- */
    case "Celestial Spirits":
      legendaryDetails = {
        en: {
          name: "Celestial Spirits",
          slot: "Feet, Legs (recommended)",
          covenant: "Night Fae",
        },
        de: {
          name: "Himmlische Geister",
          slot: "Beine, Füße",
          covenant: "Night Fae",
        },
        fr: {
          name: "Esprits célestes",
          slot: "Jambes, Pieds",
          covenant: "Night Fae",
        },
        ru: {
          name: "Небесные духи",
          slot: "Ноги, Ступни",
          covenant: "Night Fae",
        },
        ch: {
          name: "天界万灵",
          slot: "腿部、脚",
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
        },
        de: {
          name: "Abendrot und Morgenrot",
          slot: "Kopf, Schulter",
        },
        fr: {
          name: "Aube et crépuscule",
          slot: "Tête, Épaule",
        },
        ru: {
          name: "Закат и рассвет",
          slot: "Голова, Плечо",
        },
        ch: {
          name: "黄昏与黎明",
          slot: "头部、肩部",
        },
      };
      break;

    case "Vanguards Momentum":
      legendaryDetails = {
        en: {
          name: "Vanguard's Momentum",
          slot: "Head or Hands",
        },
        de: {
          name: "Schwung des Frontkämpfers",
          slot: "Kopf, Hände",
        },
        fr: {
          name: "Impulsion de l’avant-garde",
          slot: "Tête, Mains",
        },
        ru: {
          name: "Напор авангарда",
          slot: "Голова, Кисти рук",
        },
        ch: {
          name: "先锋之势",
          slot: "头部、手",
        },
      };
      break;

    case "The Magistrates Judgment":
      legendaryDetails = {
        en: {
          name: "The Magistrate's Judgment",
          slot: "Wrist or Finger",
        },
        de: {
          name: "Das Richturteil des Magistrats",
          slot: "Handgelenk, Finger",
        },
        fr: {
          name: "Jugement du magistrat",
          slot: "Poignets, Doigt",
        },
        ru: {
          name: "Правосудие мирового судьи",
          slot: "Запястья, Палец",
        },
        ch: {
          name: "法官的审判",
          slot: "腕部、手指",
        },
      };
      break;

    case "Inflorescence of the Sunwell":
      legendaryDetails = {
        en: {
          name: "Inflorescence of the Sunwell",
          slot: "Feet or Back",
        },
        de: {
          name: "Infloreszenz des Sonnenbrunnens",
          slot: "Füße, Rücken",
        },
        fr: {
          name: "Inflorescence du Puits de soleil",
          slot: "Pieds, Dos",
        },
        ru: {
          name: "Цветение Солнечного Колодца",
          slot: "Ступни, Спина",
        },
        ch: {
          name: "太阳井之花",
          slot: "脚、背部",
        },
      };
      break;

    case "Maraads Dying Breath":
      legendaryDetails = {
        en: {
          name: "Maraad's Dying Breath",
          slot: "Chest, Finger (recommended)",
        },
        de: {
          name: "Maraads letzter Atemzug",
          slot: "Brust, Finger",
        },
        fr: {
          name: "Dernier souffle de Maraad",
          slot: "Torse, Doigt",
        },
        ru: {
          name: "Предсмертный вздох Мараада",
          slot: "Грудь, Палец",
        },
        ch: {
          name: "玛尔拉德的临终之息",
          slot: "胸部、手指",
        },
      };
      break;

    case "Shadowbreaker, Dawn of the Sun":
      legendaryDetails = {
        en: {
          name: "Shadowbreaker, Dawn of the Sun",
          slot: "Shoulder or Hands",
        },
        de: {
          name: "Schattenbrecher, der Sonnenaufgang",
          slot: "Schulter, Hände",
        },
        fr: {
          name: "Brisombre, le lever de soleil",
          slot: "Épaule, Mains",
        },
        ru: {
          name: "Разрубатель Тьмы, Вестник Рассвета",
          slot: "Плечо, Кисти рук",
        },
        ch: {
          name: "破影者，日之破晓",
          slot: "肩部、手",
        },
      };
      break;

    case "Shock Barrier":
      legendaryDetails = {
        en: {
          name: "Shock Barrier",
          slot: "Legs (recommended), Feet",
        },
        de: {
          name: "Schockbarriere",
          slot: "Beine, Füße",
        },
        fr: {
          name: "Barrière de choc",
          slot: "Jambes, Pieds",
        },
        ru: {
          name: "Шоковая преграда",
          slot: "Ноги, Ступни",
        },
        ch: {
          name: "震击屏障",
          slot: "腿部、脚",
        },
      };
      break;

    case "The Mad Paragon":
      legendaryDetails = {
        en: {
          name: "The Mad Paragon",
          slot: "Waist (recommended), Feet",
        },
        de: {
          name: "Das Wahnsinnige Paragon",
          slot: "Taille, Füße",
        },
        fr: {
          name: "Parangon fou",
          slot: "Taille, Pieds",
        },
        ru: {
          name: "Безумный идеал",
          slot: "Пояс, Ступни",
        },
        ch: {
          name: "疯狂圣贤",
          slot: "腰部、脚",
        },
      };
      break;

    case "Relentless Inquisitor":
      legendaryDetails = {
        en: {
          name: "Relentless Inquisitor (Retribution)",
          slot: "Legs or Back",
        },
        de: {
          name: "Unnachgiebiger Inquisitor",
          slot: "Beine, Rücken",
        },
        fr: {
          name: "Inquisiteur implacable",
          slot: "Jambes, Dos",
        },
        ru: {
          name: "Непреклонный инквизитор",
          slot: "Ноги, Спина",
        },
        ch: {
          name: "无情审讯",
          slot: "腿部、背部",
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
          covenant: "Kyrian",
        },
        de: {
          name: "Göttliche Resonanz",
          slot: "Brust, Taille",
          covenant: "Kyrian",
        },
        fr: {
          name: "Résonance divine",
          slot: "Torse, Taille",
          covenant: "Kyrian",
        },
        ru: {
          name: "Божественный резонанс",
          slot: "Грудь, Пояс",
          covenant: "Kyrian",
        },
        ch: {
          name: "圣洁共鸣",
          slot: "胸部、腰部",
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
          covenant: "Necrolord",
        },
        de: {
          name: "Pflichtgebundener Hammer",
          slot: "Kopf, Schulter, Finger",
          covenant: "Necrolord",
        },
        fr: {
          name: "Martelet de dévotion",
          slot: "Tête, Épaule, Doigt",
          covenant: "Necrolord",
        },
        ru: {
          name: "Молот долга и служения",
          slot: "Голова, Плечо, Палец",
          covenant: "Necrolord",
        },
        ch: {
          name: "义缚之槌",
          slot: "头部、肩部、手指",
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
          covenant: "Night Fae",
        },
        de: {
          name: "Jahreszeiten der Fülle",
          slot: "Beine, Füße",
          covenant: "Night Fae",
        },
        fr: {
          name: "Saisons d’abondance",
          slot: "Jambes, Pieds",
          covenant: "Night Fae",
        },
        ru: {
          name: "Сезоны изобилия",
          slot: "Ноги, Ступни",
          covenant: "Night Fae",
        },
        ch: {
          name: "四季丰裕",
          slot: "腿部、脚",
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
          covenant: "Venthyr",
        },
        de: {
          name: "Strahlende Glut",
          slot: "Handgelenk, Hände, Rücken",
          covenant: "Venthyr",
        },
        fr: {
          name: "Braises irradiantes",
          slot: "Poignets, Mains, Dos",
          covenant: "Venthyr",
        },
        ru: {
          name: "Сияющие угли",
          slot: "Запястья, Кисти рук, Спина",
          covenant: "Venthyr",
        },
        ch: {
          name: "耀光余烬",
          slot: "腕部、手、背部",
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
        },
        de: {
          name: "Klarheit der Gedanken",
          slot: "Brust, Finger",
        },
        fr: {
          name: "Clarté d’esprit",
          slot: "Torse, Doigt",
        },
        ru: {
          name: "Ясность разума",
          slot: "Грудь, Палец",
        },
        ch: {
          name: "坚定意志",
          slot: "胸部、手指",
        },
      };
      break;

    case "Crystalline Reflection":
      legendaryDetails = {
        en: {
          name: "Crystalline Reflection",
          slot: "Shoulder, Hands",
        },
        de: {
          name: "Kristalline Reflexion",
          slot: "Schulter, Hände",
        },
        fr: {
          name: "Reflet cristallin",
          slot: "Épaule, Mains",
        },
        ru: {
          name: "Кристальное отражение",
          slot: "Плечо, Кисти рук",
        },
        ch: {
          name: "晶化反射",
          slot: "肩部、手",
        },
      };
      break;

    case "Kiss of Death":
      legendaryDetails = {
        en: {
          name: "Kiss of Death",
          slot: "Legs, Feet",
        },
        de: {
          name: "Kuss des Todes",
          slot: "Beine, Füße",
        },
        fr: {
          name: "Baiser de la mort",
          slot: "Jambes, Pieds",
        },
        ru: {
          name: "Поцелуй смерти",
          slot: "Ноги, Ступни",
        },

        ch: {
          name: "死神之吻",
          slot: "腿部、脚",
        },
      };
      break;

    case "The Penitent One":
      legendaryDetails = {
        en: {
          name: "The Penitent One",
          slot: "Feet, Back",
        },
        de: {
          name: "Der Bußfertige",
          slot: "Füße, Rücken",
        },
        fr: {
          name: "Le pénitent",
          slot: "Pieds, Dos",
        },
        ru: {
          name: "Кающийся грешник",
          slot: "Ступни, Спина",
        },
        ch: {
          name: "悔罪者",
          slot: "脚、背部",
        },
      };
      break;

    case "Cauterizing Shadows":
      legendaryDetails = {
        en: {
          name: "Cauterizing Shadows",
          slot: "Waist, Feet",
        },
        de: {
          name: "Kauterisierende Schatten",
          slot: "Taille, Füße",
        },
        fr: {
          name: "Ombres cautérisantes",
          slot: "Taille, Pieds",
        },
        ru: {
          name: "Прижигающие тени",
          slot: "Пояс, Ступни",
        },
        ch: {
          name: "烧灼暗影",
          slot: "腰部、脚",
        },
      };
      break;

    case "Measured Contemplation":
      legendaryDetails = {
        en: {
          name: "Measured Contemplation",
          slot: "Neck, Chest",
        },
        de: {
          name: "Bedächtiges Nachsinnen",
          slot: "Hals, Brust",
        },
        fr: {
          name: "Contemplation mesurée",
          slot: "Cou, Torse",
        },
        ru: {
          name: "Спокойное созерцание",
          slot: "Шея, Грудь",
        },
        ch: {
          name: "审慎沉思",
          slot: "颈部、胸部",
        },
      };
      break;

    case "Twins of the Sun Priestess":
      legendaryDetails = {
        en: {
          name: "Twins of the Sun Priestess",
          slot: "Head, Shoulder, Neck (recommended)",
        },
        de: {
          name: "Zwillinge der Sonnenpriesterin",
          slot: "Kopf, Schulter",
        },
        fr: {
          name: "Prêtresse des Jumeaux du soleil",
          slot: "Tête, Épaule",
        },

        ru: {
          name: "Близнецы жрицы Солнца",
          slot: "Голова, Плечо",
        },
        ch: {
          name: "双子太阳女祭司",
          slot: "头部、肩部",
        },
      };
      break;

    case "Divine Image":
      legendaryDetails = {
        en: {
          name: "Divine Image",
          slot: "Head or Waist",
        },
        de: {
          name: "Göttliches Abbild",
          slot: "Kopf, Taille",
        },
        fr: {
          name: "Image divine",
          slot: "Tête, Taille",
        },
        ru: {
          name: "Божественный обра",
          slot: "Голова, Пояс",
        },
        ch: {
          name: "神圣镜像",
          slot: "头部、腰部",
        },
      };
      break;

    case "Flash Concentration":
      legendaryDetails = {
        en: {
          name: "Flash Concentration",
          slot: "Neck or Wrist",
        },
        de: {
          name: "Blitzkonzentration",
          slot: "Hals, Handgelenk",
        },
        fr: {
          name: "Concentration éclair",
          slot: "Cou, Poignets",
        },
        ru: {
          name: "Быстрая концентрация",
          slot: "Шея, Запястьяt",
        },
        ch: {
          name: "快速专注",
          slot: "颈部、腕部",
        },
      };
      break;

    case "Harmonious Apparatus":
      legendaryDetails = {
        en: {
          name: "Harmonious Apparatus",
          slot: "Shoulder or Finger",
        },
        de: {
          name: "Harmonischer Apparat",
          slot: "Schulter, Finger",
        },
        fr: {
          name: "Appareil harmonieux",
          slot: "Épaule, Doigt",
        },

        ru: {
          name: "Аппарат гармонии",
          slot: "Плечо, Палец",
        },
        ch: {
          name: "谐律装置",
          slot: "肩部、手指",
        },
      };
      break;

    case "X'anshi, Return of Archbishop Benedictus":
      legendaryDetails = {
        en: {
          name: "X'anshi, Return of Archbishop Benedictus",
          slot: "Legs or Back",
        },
        de: {
          name: "X'anshi, Rückkehr von Erzbischof Benedictus",
          slot: "Beine, Rücken",
        },

        fr: {
          name: "X’anshi, retour de l’archevêque Benedictus",
          slot: "Jambes, Dos",
        },
        ru: {
          name: "Кс'анши, Возвращение архиепископа Бенедикта",
          slot: "Ноги, Спина",
        },
        ch: {
          name: "萨什，大主教本尼迪塔斯的归来",
          slot: "腿部、背部",
        },
      };
      break;

    case "Vault of Heavens":
      legendaryDetails = {
        en: {
          name: "Vault of Heavens",
          slot: "Wrist or Finger",
        },
        de: {
          name: "Sprung der Himmel",
          slot: "Handgelenk, Finger",
        },
        fr: {
          name: "Voûte céleste",
          slot: "Poignets, Doigt",
        },
        ru: {
          name: "Небесный прыжок",
          slot: "Запястья, Палец",
        },
        ch: {
          name: "天堂之跃",
          slot: "腕部、手指",
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
          covenant: "Kyrian",
        },
        de: {
          name: "Harmonie der Sphären",
          slot: "Schulter, Beine",
          covenant: "Kyrian",
        },
        fr: {
          name: "Harmonie des sphères",
          slot: "Épaule, Jambes",
          covenant: "Kyrian",
        },
        ru: {
          name: "Гармония сфер",
          slot: "Плечо, Ноги",
          covenant: "Kyrian",
        },
        ch: {
          name: "天球祥和",
          slot: "肩部、腿部",
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
          covenant: "Necrolord",
        },
        de: {
          name: "Bleicher Befehl",
          slot: "Füße, Finger",
          covenant: "Necrolord",
        },
        fr: {
          name: "Ordre exsangue",
          slot: "Pieds, Doigt",
          covenant: "Necrolord",
        },
        ru: {
          name: "Мертвенный приказ",
          slot: "Ступни, Палец",
          covenant: "Necrolord",
        },
        ch: {
          name: "苍白指令",
          slot: "脚、手指",
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
          covenant: "Night Fae",
        },
        de: {
          name: "Bwonsamdis Pakt",
          slot: "Kopf, Taille, Hände",
          covenant: "Night Fae",
        },
        fr: {
          name: "Pacte de Bwonsamdi",
          slot: "Tête, Taille, Mains",
          covenant: "Night Fae",
        },
        ru: {
          name: "Сделка Бвонсамди",
          slot: "Голова, Пояс, Кисти рук",
          covenant: "Night Fae",
        },
        ch: {
          name: "邦桑迪的契约",
          slot: "头部、腰部、手",
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
          covenant: "Venthyr",
        },
        de: {
          name: "Schattenwort: Manipulation",
          slot: "Hals, Handgelenk",
          covenant: "Venthyr",
        },
        fr: {
          name: "Mot de l’ombre : Manipulation",
          slot: "Cou, Poignets",
          covenant: "Venthyr",
        },
        ru: {
          name: "Слово Тьмы: Манипуляция",
          slot: "Шея, Запястья",
          covenant: "Venthyr",
        },
        ch: {
          name: "暗言术：控",
          slot: "颈部、腕部",
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
        },
        de: {
          name: "Irdene Harmonie",
          slot: "Brust, Rücken",
        },
        fr: {
          name: "Harmonie terrestre",
          slot: "Torse, Dos",
        },
        ru: {
          name: "Земная гармония",
          slot: "Грудь, Спина",
        },
        ch: {
          name: "大地祥和",
          slot: "胸部、背部",
        },
      };
      break;

    case "Jonat's Natural Focus":
      legendaryDetails = {
        en: {
          name: "Jonat's Natural Focus",
          slot: "Waist or Legs",
        },
        de: {
          name: "Jonats Naturfokus",
          slot: "Taille, Beine",
        },
        fr: {
          name: "Focalisation naturelle de Jonat",
          slot: "Taille, Jambes",
        },
        ru: {
          name: "Природное средоточие Джоната",
          slot: "Пояс, Ноги",
        },
        ch: {
          name: "约纳特的自然专注",
          slot: "腰部、腿部",
        },
      };
      break;

    case "Primal Tide Core":
      legendaryDetails = {
        en: {
          name: "Primal Tide Core",
          slot: "Head, Hands (recommended)",
        },
        de: {
          name: "Urzeitlicher Flutenkern",
          slot: "Kopf, Hände",
        },
        fr: {
          name: "Noyau de marée primordiale",
          slot: "Tête, Mains",
        },
        ru: {
          name: "Изначальное сердце волн",
          slot: "Голова, Кисти рук",
        },
        ch: {
          name: "始源之潮核心",
          slot: "头部、手",
        },
      };
      break;

    case "Ancestral Reminder":
      legendaryDetails = {
        en: {
          name: "Ancestral Reminder",
          slot: "Wrist or Finger",
        },
        de: {
          name: "Erinnerung der Ahnen",
          slot: "Handgelenk, Finger",
        },
        fr: {
          name: "Réminiscence ancestrale",
          slot: "Poignets, Doigt",
        },
        ru: {
          name: "Напоминание предков",
          slot: "Запястья, Палец",
        },
        ch: {
          name: "先祖之忆",
          slot: "腕部、手指",
        },
      };
      break;

    case "Chains of Devastation":
      legendaryDetails = {
        en: {
          name: "Chains of Devastation",
          slot: "Neck or Chest",
        },
        de: {
          name: "Ketten der Verheerung",
          slot: "Hals, Brust",
        },
        fr: {
          name: "Chaînes de dévastation",
          slot: "Cou, Torse",
        },
        ru: {
          name: "Разрушительные цепи",
          slot: "Шея, Грудь",
        },
        ch: {
          name: "毁灭之链",
          slot: "颈部、胸部",
        },
      };
      break;

    case "Deeply Rooted Elements":
      legendaryDetails = {
        en: {
          name: "Deeply Rooted Elements",
          slot: "Head or Shoulder",
        },
        de: {
          name: "Tief verwurzelte Elemente",
          slot: "Kopf, Schulter",
        },
        fr: {
          name: "Éléments profondément enracinés",
          slot: "Tête, Épaule",
        },
        ru: {
          name: "Укоренившиеся стихии",
          slot: "Голова, Плечо",
        },
        ch: {
          name: "根深蒂固的元素",
          slot: "头部、肩部",
        },
      };
      break;

    case "Spiritwalker's Tidal Totem":
      legendaryDetails = {
        en: {
          name: "Spiritwalker's Tidal Totem",
          slot: "Legs (recommended), Back",
        },
        de: {
          name: "Gezeitentotem des Geistwandlers",
          slot: "Beine, Rücken",
        },
        fr: {
          name: "Totem des marées du marcheur des esprits",
          slot: "Jambes, Dos",
        },
        ru: {
          name: "Тотем волн духостранника",
          slot: "Ноги, Спина",
        },
        ch: {
          name: "灵魂行者的潮汐图腾",
          slot: "腿部、背部",
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
          covenant: "Kyrian",
        },
        de: {
          name: "Tobender Vortex der Vesperglocke",
          slot: "Beine, Füße",
          covenant: "Kyrian",
        },
        fr: {
          name: "Vortex du bourdon déchaîné",
          slot: "Jambes, Pieds",
          covenant: "Kyrian",
        },
        ru: {
          name: "Яростный перезвон",
          slot: "Ноги, Ступни",
          covenant: "Kyrian",
        },
        ch: {
          name: "狂暴暮钟旋涡",
          slot: "腿部、脚",
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
          covenant: "Night Fae",
        },
        de: {
          name: "Samen des ungezügelten Wachsens",
          slot: "Kopf, Hände",
          covenant: "Night Fae",
        },
        fr: {
          name: "Graines de croissance luxuriante",
          slot: "Tête, Mains",
          covenant: "Night Fae",
        },
        ru: {
          name: "Семена буйной поросли",
          slot: "Голова, Кисти рук",
          covenant: "Night Fae",
        },
        ch: {
          name: "狂乱生长之种",
          slot: "头部、手",
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
          covenant: "Necrolord",
        },
        de: {
          name: "Zersplitterte Elemente",
          slot: "Hals, Taille",
          covenant: "Necrolord",
        },
        fr: {
          name: "Éléments brisés",
          slot: "Cou, Taille",
          covenant: "Necrolord",
        },
        ru: {
          name: "Расколотые стихии",
          slot: "Шея, Пояс",
          covenant: "Necrolord",
        },
        ch: {
          name: "碎裂元素",
          slot: "颈部、腰部",
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
          covenant: "Venthyr",
        },
        de: {
          name: "Elementarverbunden",
          slot: "Brust, Handgelenk",
          covenant: "Venthyr",
        },
        fr: {
          name: "Conduction élémentaire",
          slot: "Torse, Poignets",
          covenant: "Venthyr",
        },
        ru: {
          name: "Проводник стихий",
          slot: "Грудь, Запястья",
          covenant: "Venthyr",
        },
        ch: {
          name: "元素导能",
          slot: "胸部、腕部",
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
        },
        de: {
          name: "Flucht aus der Realität",
          slot: "Hals, Brust",
        },
        fr: {
          name: "Fuir la réalité",
          slot: "Cou, Torse",
        },
        ru: {
          name: "Бегство от реальности",
          slot: "Шея, Грудь",
        },
        ch: {
          name: "魂游天外",
          slot: "颈部、胸部",
        },
      };
      break;

    case "Invoker's Delight":
      legendaryDetails = {
        en: {
          name: "Invoker's Delight",
          slot: "Head, Shoulder, Cape (recommended)",
        },
        de: {
          name: "Freude des Beschwörers",
          slot: "Kopf, Schulter",
        },
        fr: {
          name: "Délice de l’invocateur",
          slot: "Tête, Épaule",
        },
        ru: {
          name: "Радость заклинателя",
          slot: "Голова, Плечо",
        },
        ch: {
          name: "祈求者之愉",
          slot: "头部、肩部",
        },
      };
      break;

    case "Ancient Teachings of the Monastery":
      legendaryDetails = {
        en: {
          name: "Ancient Teachings of the Monastery",
          slot: "Wrist (recommended), Hands",
        },
        de: {
          name: "Uralte Lehren des Klosters",
          slot: "Handgelenk, Hände",
        },
        fr: {
          name: "Enseignements ancestraux du monastère",
          slot: "Poignets, Mains",
        },
        ru: {
          name: "Древние монастырские учения",
          slot: "Запястья, Кисти рук",
        },
        ch: {
          name: "禅院古训",
          slot: "腕部、手",
        },
      };
      break;

    case "Yu'lon's Whisper":
      legendaryDetails = {
        en: {
          name: "Yu'lon's Whisper",
          slot: "Shoulder, Finger (recommended)",
        },
        de: {
          name: "Yu'lons Flüstern",
          slot: "Schulter, Finger",
        },
        fr: {
          name: "Murmure de Yu’lon",
          slot: "Épaule, Doigt",
        },
        ru: {
          name: "Шепот Юй-лун",
          slot: "Плечо, Палец",
        },
        ch: {
          name: "玉珑的低语",
          slot: "肩部、手指",
        },
      };
      break;

    case "Clouded Focus":
      legendaryDetails = {
        en: {
          name: "Clouded Focus",
          slot: "Neck or Wrist",
        },
        de: {
          name: "Umwölkter Fokus",
          slot: "Hals, Handgelenk",
        },
        fr: {
          name: "Focalisateur nébuleux",
          slot: "Cou, Poignets",
        },
        ru: {
          name: "Затуманенная концентрация",
          slot: "Шея, Запястья",
        },
        ch: {
          name: "雾云专注",
          slot: "颈部、腕部",
        },
      };
      break;

    case "Tear of Morning":
      legendaryDetails = {
        en: {
          name: "Tear of Morning",
          slot: "Head, Waist (recommended)",
        },
        de: {
          name: "Träne des Morgens",
          slot: "Kopf, Taille",
        },
        fr: {
          name: "Larme matinale",
          slot: "Tête, Taille",
        },
        ru: {
          name: "Утренняя слеза",
          slot: "Голова, Пояс",
        },
        ch: {
          name: "晨晖之露",
          slot: "头部、腰部",
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
          covenant: "Kyrian",
        },
        de: {
          name: "Ruf zu den Waffen",
          slot: "Beine, Füße",
          covenant: "Kyrian",
        },
        fr: {
          name: "Appel aux armes",
          slot: "Jambes, Pieds",
          covenant: "Kyrian",
        },
        ru: {
          name: "Призыв к оружию",
          slot: "Ноги, Ступни",
          covenant: "Kyrian",
        },
        ch: {
          name: "唤神令",
          slot: "腿部、脚",
          covenant: "Kyrian",
        },
      };
      break;

    /* ------------------------------------------ Necrolord ----------------------------------------- */
    case "Bountiful Brew":
      legendaryDetails = {
        en: {
          name: "Bountiful Brew",
          slot: "Neck, Shoulder, Chest",
          covenant: "Necrolord",
        },
        de: {
          name: "Großzügiges Gebräu",
          slot: "Hals, Schulter, Brust",
          covenant: "Necrolord",
        },
        fr: {
          name: "Breuvage de surabondance",
          slot: "Cou, Épaule, Torse",
          covenant: "Necrolord",
        },
        ru: {
          name: "Благодатный хмель",
          slot: "Шея, Плечо, Грудь",
          covenant: "Necrolord",
        },
        ch: {
          name: "万古酒",
          slot: "颈部、肩部、胸部",
          covenant: "Necrolord",
        },
      };
      break;

    /* ------------------------------------------ Night Fae ----------------------------------------- */
    case "Faeline Harmony":
      legendaryDetails = {
        en: {
          name: "Faeline Harmony",
          slot: "Waist, Hands",
          covenant: "Night Fae",
        },
        de: {
          name: "Faelinienharmonie",
          slot: "Taille, Hände",
          covenant: "Night Fae",
        },
        fr: {
          name: "Harmonie de ligne faë",
          slot: "Taille, Mains",
          covenant: "Night Fae",
        },
        ru: {
          name: "Волшебная гармония",
          slot: "Пояс, Кисти рук",
          covenant: "Night Fae",
        },
        ch: {
          name: "妖魂祥和",
          slot: "腰部、手",
          covenant: "Night Fae",
        },
      };
      break;

    /* ------------------------------------------- Venthyr ------------------------------------------ */
    case "Sinister Teachings":
      legendaryDetails = {
        en: {
          name: "Sinister Teachings",
          slot: "Wrist, Finger (recommended)",
          covenant: "Venthyr",
        },
        de: {
          name: "Finstere Lehren",
          slot: "Handgelenk, Finger",
          covenant: "Venthyr",
        },
        fr: {
          name: "Enseignements sinistres",
          slot: "Poignets, Doigt",
          covenant: "Venthyr",
        },
        ru: {
          name: "Зловещее учение",
          slot: "Запястья, Палец",
          covenant: "Venthyr",
        },
        ch: {
          name: "罪邪古训",
          slot: "腕部、手指",
          covenant: "Venthyr",
        },
      };
      break;

    case "Vitality Sacrifice":
      legendaryDetails = {
        en: {
          name: "Vitality Sacrifice",
          slot: "Head, Shoulder, or Chest",
        },
        de: {
          name: "Vitalitätsopfer",
          slot: "Kopf, Schulter, Brust",
        },
        fr: {
          name: "Sacrifice de vitalité",
          slot: "Tête, Épaule, Torse",
        },
        ru: {
          name: "Жертвование здоровьем",
          slot: "Голова, Плечо, Грудь",
        },
        ch: {
          name: "活力献祭",
          slot: "头部、肩部、胸部",
        },
      };
      break;

    case "Sephuz's Proclamation":
      legendaryDetails = {
        en: {
          name: "Sephuz's Proclamation",
          slot: "Neck, Shoulder, or Chest",
        },
        de: {
          name: "Sephuz' Proklamation",
          slot: "Hals, Schulter, Brust",
        },
        fr: {
          name: "Proclamation de Sephuz",
          slot: "Cou, Épaule, Torse",
        },
        ru: {
          name: "Декларация Сефуза",
          slot: "Шея, Плечо, Грудь",
        },
        ch: {
          name: "塞弗斯的宣言",
          slot: "颈部、肩部、胸部",
        },
      };
      break;

    case "Echo of Eonar":
      legendaryDetails = {
        en: {
          name: "Echo of Eonar",
          slot: "Waist, Wrist, or Finger",
        },
        de: {
          name: "Echo von Eonar",
          slot: "Taille, Handgelenk, Finger",
        },

        fr: {
          name: "Écho d’Eonar",
          slot: "Taille, Poignets, Doigt",
        },
        ru: {
          name: "Эхо Эонар",
          slot: "Пояс, Запястья, Палец",
        },
        ch: {
          name: "艾欧娜尔的回响",
          slot: "腰部、腕部、手指",
        },
      };
      break;

    default:
      break;
  }

  return legendaryDetails;
};
