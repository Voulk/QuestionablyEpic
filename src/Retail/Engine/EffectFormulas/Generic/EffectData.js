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
            coefficient: [7.44707, 11.170605, 14.89414, 18.617675, 22.34121], // The coefficient is for the maximum amount stored on a crit.
            table: -8,
            specOvercap: {"Restoration Druid": 0.92, "Holy Paladin": 0.6, "Mistweaver Monk": 0.82, "Restoration Shaman": 0.94, "Holy Priest": 0.62, "Discipline Priest": 0.7},
            specAbilitiesThatWork: {"Restoration Druid": 0.84, "Holy Paladin": 0.7, "Mistweaver Monk": 0.68, "Restoration Shaman": 0.47, "Holy Priest": 0.91, "Discipline Priest": 0.26}, // Winds of Winter doesn't work on multiple abilities in the game. Disc and Holy Paladin are penalized most heavily.
           
            //stored: [0.05, 0.075, 0.1, 0.125, 0.15],
            stored: [0.06, 0.09, 0.12, 0.15, 0.18],
            wastage: 0.1
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
            uptime: 0.5
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
            //coefficient: [13.404727, 20.107, 26.809454, 33.5118175, 40.214181], 
            coefficient: [22.3414, 33.5121, 44.6828, 55.8535, 67.0242], 
            table: -9, // -8 in the spell data.
            ppm: 20, // Has a 100% uptime, and procs every 3 seconds.
            expectedOverhealing: 0.2,
          },
        ],
      },
]