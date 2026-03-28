
import { useState } from "react";
import ControlPanel from "./ControlPanel";
import SpellBreakdown, { SpellRow } from "./SpellBreakdownPanel";
import { Box } from "@mui/material";
import TCPanel from "./TCPanel";
import StatScalingChart from "./StatScalingPanel";
import { useSelector } from "react-redux";
import { RootState } from "Redux/Reducers/RootReducer";
import { buildStatWeights, buildTCStatChart } from "General/Modules/Player/ClassDefaults/Generic/RampTestSuite"



export default function TheorycraftingGUI(props) {
    const player = props.player;
    const selectedSpec = player.getSpec();
    const contentType = useSelector((state: RootState) => state.contentType);
    const profiles = player.getAllModels(contentType);
    const [activeResult, setActiveResult] = useState({healing: 1,
        spellBreakdown: [
            { spellName: "Healing Wave",    cpm: 4.21, overhealing: 0.18, hps: 12450, percentHealing: "34.2%", icon: "spell_nature_healingwavelesser" },
            { spellName: "Chain Heal",      cpm: 2.87, overhealing: 0.31, hps: 9870,  percentHealing: "27.1%", icon: "inv_1115_shaman_chainheal" },
            { spellName: "Riptide",         cpm: 6.10, overhealing: 0.09, hps: 7320,  percentHealing: "20.1%", icon: "spell_nature_riptide" },
            { spellName: "Healing Stream",  cpm: 1.00, overhealing: 0.22, hps: 4100,  percentHealing: "11.3%", icon: "inv_spear_04" },
            { spellName: "Healing Tide Totem",    cpm: 0.33, overhealing: 0.05, hps: 2680,  percentHealing: "7.3%", icon: "ability_shaman_healingtide"  },
        ]
    });
    const [statChart, setStatChart] = useState([]);
    const [currentWeights, setCurrentWeights] = useState({ haste: 0.2, crit: 0.2, mastery: 0.2, versatility: 0.2, intellect: 1 });

    const [stats, setStats] = useState<Stats>({
        intellect: 2400,
        haste: 400,
        crit: 400,
        mastery: 400,
        versatility: 400,
    });
    const [selectedProfile, setSelectedProfile] = useState(profiles[0]);
    const params = {
                filler: {
                    hw: 0, ch: 1
                },
                asc: {
                    hw: 0, ch: 1
                },
                downtime: 0
            }
    const playerData = { spec: "Restoration Shaman", heroTree: "Farseer", profileName: selectedProfile.modelName, stats: stats,
                                    masteryEffectiveness: 0.3, tierSets: ["Restoration Shaman S1-2", "Restoration Shaman S1-4"], params: params }

    const runProfile = () => {
        const result = selectedProfile.runCastModel(stats, playerData, {}, true);
        const statResults = buildTCStatChart(selectedProfile.runCastModel, playerData)
        setActiveResult(result);
        setStatChart(statResults);
        setCurrentWeights(buildStatWeights(playerData, selectedProfile.runCastModel, {}))
        
    }

    const rows: SpellRow[] = [];

    
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
        <div style={{ height: 5 }} />
      {/* Control panel spans full width as a header bar */}
      <ControlPanel stats={stats} setStats={setStats} profiles={profiles} onRunProfile={runProfile} />
 
      {/* Charts flow vertically below */}
      <TCPanel title="Spell Breakdown">
        <SpellBreakdown rows={activeResult.spellBreakdown} activeResult={activeResult} />
      </TCPanel>

      <StatScalingChart data={statChart} currentWeights={currentWeights} />
 
      {/* Future panels go here */}
      <div style={{ height: 100 }} />
    </Box>
    )
}