import { useState } from "react";
import TCPanel from "./TCPanel";
import SpellBreakdown from "./SpellBreakdownPanel";
import TalentList from "./SelectedTalentsPanel";

const tabs = ['Healing Breakdown', 'Damage Breakdown', 'Talents Selected', 'Unused Panel'] as const;
type Tab = typeof tabs[number];

interface ModelInformationTabsProps {
    activeResult: any;
    selectedTalents: {talentName: string, talentRanks: number}[];
}

// ─── Design tokens ────────────────────────────────────────────────────────────
// Shared with SpellBreakdown / ControlPanel: cool slate base, Space Grotesk
// labels, gold as the neutral chrome accent (kept off healing-green /
// damage-coral since those are reserved for the meters themselves).

const FONT_DISPLAY = "'Space Grotesk', 'Segoe UI', system-ui, sans-serif";

const COLORS = {
    bg: "#15171c",
    border: "rgba(255,255,255,0.06)",
    divider: "rgba(0,0,0,0.4)",
    textMuted: "#7d8394",
};

const PRIMARY = "#e3b341";

export default function ModelInformationTabs({ activeResult, selectedTalents }: ModelInformationTabsProps) {
    const [activeTab, setActiveTab] = useState<Tab>('Healing Breakdown');

    return (
        <div>
<div style={{
    display: 'flex',
    borderBottom: `1px solid ${COLORS.border}`,
    backgroundColor: COLORS.bg,
    borderRadius: '8px 8px 0 0',
    border: `1px solid ${COLORS.border}`,
    borderBottomColor: COLORS.border,
}}>
    {tabs.map(tab => (
        <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
                padding: '12px 20px',
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === tab ? `2px solid ${PRIMARY}` : '2px solid transparent',
                color: activeTab === tab ? PRIMARY : COLORS.textMuted,
                fontFamily: FONT_DISPLAY,
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontSize: '11px',
                cursor: 'pointer',
                transition: 'color 0.15s, border-color 0.15s',
            }}
        >
            {tab}
        </button>
    ))}
</div>

            {activeTab === 'Healing Breakdown' && (
                <TCPanel title="">
                    <SpellBreakdown rows={activeResult.spellBreakdowns.healingBreakdown} activeResult={activeResult} tag="healing" />
                </TCPanel>
            )}
            {activeTab === 'Damage Breakdown' && (
                <TCPanel title="">
                    <SpellBreakdown rows={activeResult.spellBreakdowns.damageBreakdown} activeResult={activeResult} tag="damage" />
                </TCPanel>
            )}
            {activeTab === 'Talents Selected' && (
                <TCPanel title="">
                    <TalentList talents={selectedTalents} />
                </TCPanel>
            )}
            {/*activeTab === 'Unused Panel' && (
                <TCPanel title="Tab C">

                </TCPanel>
            )*/}
        </div>
    );
}