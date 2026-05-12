import { useState } from "react";
import TCPanel from "./TCPanel";
import SpellBreakdown from "./SpellBreakdownPanel";
import TalentList from "./SelectedTalentsPanel";

const tabs = ['Healing Breakdown', 'Talents Selected', 'Unused Panel'] as const;
type Tab = typeof tabs[number];

interface ModelInformationTabsProps {
    activeResult: any;
    selectedTalents: {talentName: string, talentRanks: number}[];
}

export default function ModelInformationTabs({ activeResult, selectedTalents }: ModelInformationTabsProps) {
    const [activeTab, setActiveTab] = useState<Tab>('Healing Breakdown');

    return (
        <div>
<div style={{
    display: 'flex',
    borderBottom: '1px solid #2e2e2e',
    backgroundColor: '#1e1e1e',
    borderRadius: '6px 6px 0 0',
    border: '1px solid #3a3a3a',
    borderBottomColor: '#2e2e2e',
}}>
    {tabs.map(tab => (
        <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
                padding: '12px 20px',
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === tab ? '2px solid #DAA520' : '2px solid transparent',
                color: activeTab === tab ? '#DAA520' : '#888',
                fontFamily: "'Cinzel', Georgia, serif",
                fontWeight: 600,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                fontSize: '11px',
                cursor: 'pointer',
            }}
        >
            {tab}
        </button>
    ))}
</div>

            {activeTab === 'Healing Breakdown' && (
                <TCPanel title="">
                    <SpellBreakdown rows={activeResult.spellBreakdown} activeResult={activeResult} />
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