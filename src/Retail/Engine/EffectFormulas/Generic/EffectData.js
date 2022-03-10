export const effectData = [
    {
      /* ---------------------------------------------------------------------------------------------- */
      /*                                        Passable Credentials                                    */
      /* ---------------------------------------------------------------------------------------------- */
      
      name: "Passable Credentials",
      effects: [
        {
            coefficient: 0.165898,
            duration: 15,
            ppm: 2,
            table: -1
        },
      ],
    },
    {
      /* ---------------------------------------------------------------------------------------------- */
      /*                                     Soulwarped Seal of Wrynn                                   */
      /* ---------------------------------------------------------------------------------------------- */
      // This has a ppm of 3 in the spell data, however this is it's maximum strength and we don't yet know the minimum (hitting a target at high health).
      // This almost unavoidably means that the ring will need to be tested in-game to get a reasonable value.
      // It's a prediction until then.
      name: "Soulwarped Seal of Wrynn",
      effects: [
        {
            coefficient: 0.739246,
            duration: 12,
            ppm: 10, // 20 in spell data. Verify with in-game logs. 
            table: -8 // -9
        },
      ],
    },
    {
      /* ---------------------------------------------------------------------------------------------- */
      /*                                           Sepulcher's Savior                                   */
      /* ---------------------------------------------------------------------------------------------- */
      // This is primarily a tank offhand that can also be used by Shaman / Paladin healers. 
      // It trades secondary stats for heal and damage procs on a 1.5 minute cooldown.
      // The damage effect is NYI but can be quite easily.
      name: "Sepulcher's Savior",
      effects: [
        {
            coefficient: 231.3687,
            cooldown: 180,
            table: -8 // -9
        },
      ],
    },
    {
      /* ---------------------------------------------------------------------------------------------- */
      /*                                           Cosmic Protoweave                                    */
      /* ---------------------------------------------------------------------------------------------- */
      name: "Cosmic Protoweave",
      effects: [
        {
            coefficient: 12.42858,
            efficiency: 0.6,
            ppm: 1.5,
            table: -8 // -9
        },
      ],
    },
    {
      /* ---------------------------------------------------------------------------------------------- */
      /*                                 Magically Regulated Automa Core                                */
      /* ---------------------------------------------------------------------------------------------- */
      name: "Magically Regulated Automa Core",
      // TODO: Check log average targets.
      effects: [
        {
            coefficient: 4.358473,
            efficiency: 0.72,
            targets: 1,
            ppm: 1.5,
            table: -8 // -9
        },
      ],
    },
    {
      /* ---------------------------------------------------------------------------------------------- */
      /*                                     Ephemera Harmonizing Stone                                  */
      /* ---------------------------------------------------------------------------------------------- */
      // Int proc
      name: "Ephemera Harmonizing Stone",
      effects: [
        {
            coefficient: 0.194108,
            duration: 15,
            ppm: 1, 
            table: -1,
            efficiency: 0.35
        },
      ],
    },
    {
      /* ---------------------------------------------------------------------------------------------- */
      /*                                Antumbra (Singularity Supreme)                                  */
      /* ---------------------------------------------------------------------------------------------- */
      // Int proc
      name: "Antumbra, Shadow of the Cosmos",
      effects: [
        {
            coefficient: 0.039516,
            duration: 15,
            avgStacks: 12.9, // Disc only 
            table: -7,
        },
      ],
    },
    {
      /* ---------------------------------------------------------------------------------------------- */
      /*                                          Genesis Lathe                                         */
      /* ---------------------------------------------------------------------------------------------- */
      // The effects are similar enough in strength that a different distribution of procs doesn't particularly matter - so long as they are being used.
      name: "Genesis Lathe",
      effects: [
        {name: "Absorb", coefficient: 92.22098, table: -8, percProcs: 0.75, ticks: 1, secondaries: ["Versatility"]},
        {name: "FlatHeal", coefficient: 107.5911, table: -8, percProcs: 0.1, ticks: 1, secondaries: ["Versatility", "Crit"]},
        {name: "Hot", coefficient: 16.04781, table: -8, percProcs: 0.15, ticks: 5, secondaries: ["Versatility", "Crit", "Haste"]}]
    },



    // DOMINATION SOCKETS
    {
        /* ---------------------------------------------------------------------------------------------- */
        /*                                            Shards of Zed                                       */
        /* ---------------------------------------------------------------------------------------------- */
        
        name: "Shard of Zed", // Chance on cast to give a target an Unholy Aura, leeching from nearby enemies for 10s.
        effects: [
          {
            coefficient: [0.00712, 0.008921, 0.010722, 0.012523, 0.014325], 
            duration: 10,
            table: -6,
            ppm: 0.95, // 60s ICD, very high proc rate.
            expectedTargets: {Raid: 1, Dungeon: 3.5},
            secondaryScaling: ['Crit', 'Vers']
          },
        ],
      },
      {
        /* ---------------------------------------------------------------------------------------------- */
        /*                                          Shards of Dyz                                         */
        /* ---------------------------------------------------------------------------------------------- */
        
        name: "Shard of Dyz", // Stacking damage increase to your target. UNHOLY.
        effects: [
          {
            coefficient: [0.263158, 0.326316, 0.389474, 0.463158, 0.526316], 
            stacks: 3,
            duration: 4,
            table: -1,
          },
        ],
      },
      {
        /* ---------------------------------------------------------------------------------------------- */
        /*                                          Shards of Oth                                         */
        /* ---------------------------------------------------------------------------------------------- */
        
        name: "Shard of Oth", // Speed. UNHOLY
        effects: [
          {
            coefficient: 0,
            table: -1,
          },
        ],
      },
      {
        /* ---------------------------------------------------------------------------------------------- */
        /*                                             Chaos Bane                                         */
        /* ---------------------------------------------------------------------------------------------- */
        
        name: "Chaos Bane", // These use tables as if 174 ilvl.
        effects: [
          {
            //coefficient: [0.052632, 0.078948, 0.105264, 0.13158, 0.157896], 
            coefficient: [0.105263, 0.1578945, 0.210526, 0.2631575, 0.315789],
            duration: 30,
            table: -1,
            ppm: 8, // Does have a 0.5s GCD. Doesn't proc while Effect#2 is active.
          },
          {
            //coefficient: [1.578947, 2.3684205, 3.157894, 3.9473675, 4.736841], 
            coefficient: [3.158, 4.737, 6.316, 7.895, 9.474], 
            duration: 30,
            table: -1,
            ppm: 8,
          },
        ],
      },
      {
        /* ---------------------------------------------------------------------------------------------- */
        /*                                          Shards of Cor                                         */
        /* ---------------------------------------------------------------------------------------------- */
        
        name: "Shard of Cor", // Your damage is increased by 1.5% for 20s after attacking an enemy you have not yet damaged.
        effects: [
          {
            coefficient: [1.578947, 1.978947, 2.368421, 2.768421, 3.157895], 
            duration: 20,
            table: -1,
            uptime: {Raid: 0.2, Dungeon: 0.45}, // TODO
          },
        ],
      },
      {
        /* ---------------------------------------------------------------------------------------------- */
        /*                                            Shards of Tel                                       */
        /* ---------------------------------------------------------------------------------------------- */
        
        name: "Shard of Tel", // Your critical hits cause their target to absorb the next X damage dealt to them. 
        effects: [
          {
            coefficient: [0.007334, 0.009135, 0.010979, 0.012824, 0.014668], 
            table: -6,
            ppm: {"Restoration Druid": 31, "Holy Paladin": 14, "Mistweaver Monk": 42, "Restoration Shaman": 18, "Holy Priest": 11, "Discipline Priest": 11},
            expectedWastage: 0.15 // This is reasonably low since the absorb lasts 6 seconds and is small enough to be used first.
          },
        ],
      },
      {
        /* ---------------------------------------------------------------------------------------------- */
        /*                                            Shards of Kyr                                       */
        /* ---------------------------------------------------------------------------------------------- */
        
        name: "Shard of Kyr", // Gain an absorb every 5 seconds, stacking up to a cap. 
        effects: [
          {
            coefficient: [0.028306, 0.035383, 0.04246, 0.049536, 0.056613], 
            table: -6,
            ppm: 12,
          },
        ],
      },
      {
        /* ---------------------------------------------------------------------------------------------- */
        /*                                         Winds of Winter                                        */
        /* ---------------------------------------------------------------------------------------------- */
        
        name: "Winds of Winter", // 6% of your critical hits and healing are stored. You get an absorb and deal damage very 20s based on what is stored.
        effects: [
          {
            coefficient: [7.44707, 11.170605, 14.89414, 18.617675, 22.34121], // The coefficient is for the maximum amount stored on a crit. It was unchanged in the buff.
            table: -8,
            specOvercap: {"Restoration Druid": 0.89, "Holy Paladin": 0.65, "Mistweaver Monk": 0.82, "Restoration Shaman": 0.7, "Holy Priest": 0.61, "Discipline Priest": 0.82},
            specAbilitiesThatWork: {"Restoration Druid": 0.99, "Holy Paladin": 0.96, "Mistweaver Monk": 0.97, "Restoration Shaman": 0.46, "Holy Priest": 1, "Discipline Priest": 0.86}, // Winds of Winter doesn't work on multiple abilities in the game. Disc and Holy Paladin are penalized most heavily.
            expectedOverhealing: 0.25, // Even though the absorb lasts quite a while, wastage is unavoidable.
            //stored: [0.05, 0.075, 0.1, 0.125, 0.15],
            stored: [0.09, 0.135, 0.18, 0.225, 0.27]
          },
        ],
      },
      {
        /* ---------------------------------------------------------------------------------------------- */
        /*                                            Shards of Bek                                       */
        /* ---------------------------------------------------------------------------------------------- */
        
        name: "Shard of Bek", // Your damage is increased by 1.5% when you have 50% or more health than your target
        effects: [
          {
            coefficient: [1.578947, 1.978947, 2.368421, 2.768421, 3.157895], 
            table: -1,
            uptime: 0.45
          },
        ],
      },
      {
        /* ---------------------------------------------------------------------------------------------- */
        /*                                            Shards of Jas                                       */
        /* ---------------------------------------------------------------------------------------------- */
        
        name: "Shard of Jas", // Incoming healing you receive is increased by 0.7%. Your maximum health is increased by 300.
        effects: [
          {
            coefficient: [], 
            table: -6,
          },
        ],
      },
      {
        /* ---------------------------------------------------------------------------------------------- */
        /*                                            Shards of Rev                                       */
        /* ---------------------------------------------------------------------------------------------- */
        
        name: "Shard of Rev", // Leech
        effects: [
          {
            coefficient: [0.315789, 0.389474, 0.473684, 0.547368, 0.631579], 
            table: -1,
          },
        ],
      },
      {
        /* ---------------------------------------------------------------------------------------------- */
        /*                                            Blood Link                                          */
        /* ---------------------------------------------------------------------------------------------- */
        
        name: "Blood Link", // These use tables as if 174 ilvl.
        effects: [
          {    
            //coefficient: [22.3414, 33.5121, 44.6828, 55.8535, 67.0242], // Original Value
            //coefficient: [13.404727, 20.107, 26.809454, 33.5118175, 40.214181], // Reverted Nerf
            coefficient: [26.809452, 40.214178, 53.618904, 67.02363, 80.428356], // New Post-buff value
            table: -9, // -8 in the spell data.
            ppm: 20, // Has a 100% uptime, and procs every 3 seconds.
            expectedOverhealing: 0.15,
          },
        ],
      },
]