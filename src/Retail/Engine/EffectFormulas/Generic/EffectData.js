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
        /*                                        Shards of Zed                                    */
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
            coefficient: 0.105263, 
            duration: 30,
            table: -1,
            ppm: 8, // Does have a 0.5s GCD. Doesn't proc while Effect#2 is active.
          },
          {
            coefficient: 3.158, 
            duration: 30,
            table: -1,
            ppm: 8,
          },
        ],
      },
]