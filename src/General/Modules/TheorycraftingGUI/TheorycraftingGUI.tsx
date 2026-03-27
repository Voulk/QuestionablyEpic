
import { useState } from "react";
import ControlPanel from "./ControlPanel";
import SpellBreakdown, { SpellRow } from "./SpellBreakdownPanel";
import { Box } from "@mui/material";
import TCPanel from "./TCPanel";
import StatScalingChart from "./StatScalingPanel";
import { useSelector } from "react-redux";
import { RootState } from "Redux/Reducers/RootReducer";

export default function TheorycraftingGUI(props) {
    const player = props.player;
    const selectedSpec = player.getSpec();
    const contentType = useSelector((state: RootState) => state.contentType);
    const profiles = player.getAllModels(contentType);
    
    console.log(profiles[0]);

    const [stats, setStats] = useState<Stats>({
        intellect: 2400,
        haste: 400,
        crit: 400,
        mastery: 400,
        versatility: 400,
    });
    const [selectedProfile, setSelectedProfile] = useState(profiles[0]);

    const rows: SpellRow[] = [
        { spellName: "Healing Wave",    cpm: 4.21, overhealing: 0.18, hps: 12450, percentHealing: "34.2%", icon: "spell_nature_healingwavelesser" },
        { spellName: "Chain Heal",      cpm: 2.87, overhealing: 0.31, hps: 9870,  percentHealing: "27.1%", icon: "inv_1115_shaman_chainheal" },
        { spellName: "Riptide",         cpm: 6.10, overhealing: 0.09, hps: 7320,  percentHealing: "20.1%", icon: "spell_nature_riptide" },
        { spellName: "Healing Stream",  cpm: 1.00, overhealing: 0.22, hps: 4100,  percentHealing: "11.3%", icon: "inv_spear_04" },
        { spellName: "Healing Tide Totem",    cpm: 0.33, overhealing: 0.05, hps: 2680,  percentHealing: "7.3%", icon: "ability_shaman_healingtide"  },
    ];
//
// 
      //    const classes = useStyles();
      /*const spellDB = getSpellDB(selectedSpec);
      console.log(spellDB);
      const gameType = useSelector((state) => state.gameType);
      const spellCategories = ["Healing", "Damage", "Cooldowns & Other"];
    
      
      const [seq, setSeq] = useState([]);
      const [sequences, setSequences] = useState(setupSequences());
      const [selectedSeq, setSelectedSeq] = useState(0);
      const [activeStats, setActiveStats] = useState(selectedSpec.includes("Classic") ? 
                                    { spellpower: 5200, intellect: 9500, haste: 2020, crit: 3300, mastery: 3000, spirit: 1000, averageDamage: 5585.25, weaponSwingSpeed: 3.4, isTwoHanded: true } :
                                    { intellect: 131420, haste: 7000, crit: 20000, mastery: 20000, versatility: 7500, stamina: 16000 });
    
      const [talentDB, setTalentDB] = useState(getTalentDB(selectedSpec));
      const [result, setResult] = useState({ totalDamage: 0, totalHealing: 0, hpm: 0 });
      const [combatLog, setCombatLog] = useState([]);
      const [seqSettings, setSeqSettings] = useState(getSpecSettings(selectedSpec));*/
    
    return (
    <Box
      sx={{
        width: "60%",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      {/* Control panel spans full width as a header bar */}
      <ControlPanel stats={stats} setStats={setStats} profiles={profiles} onRunProfile={null} />
 
      {/* Charts flow vertically below */}
      <TCPanel title="Spell Breakdown">
        <SpellBreakdown rows={rows} />
      </TCPanel>

      <StatScalingChart />
 
      {/* Future panels go here */}
    </Box>
    )
}