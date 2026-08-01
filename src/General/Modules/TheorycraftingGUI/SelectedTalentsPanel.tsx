import { Box, Typography } from "@mui/material";
import { useState } from "react";

interface TalentRanks {
    talentName: string;
    talentRanks: number;
    talentIcon: string;
    tree: "spec" | "hero" | "class";
}

interface TalentListProps {
    talents: TalentRanks[];
}

const TREE_LABELS: Record<TalentRanks["tree"], string> = {
    spec: "Spec Tree",
    hero: "Hero Tree",
    class: "Class Tree",
};

const TREE_ORDER: TalentRanks["tree"][] = ["spec", "hero", "class"];

function TalentGrid({ talents }: { talents: TalentRanks[] }) {
    return (
        <Box sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1px",
            backgroundColor: "#2e2e2e",
        }}>
            {talents.map((talent) => (
                <Box
                    key={talent.talentName}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        px: "16px",
                        py: "10px",
                        backgroundColor: "#1e1e1e",
                        "&:hover": { backgroundColor: "#252525" },
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <Box
                            component="img"
                            src={`https://wow.zamimg.com/images/wow/icons/large/${talent.talentIcon}.jpg`}
                            alt={talent.talentName}
                            sx={{
                                width: "24px",
                                height: "24px",
                                borderRadius: "4px",
                                border: "1px solid #3a3a3a",
                                flexShrink: 0,
                            }}
                        />
                        <Typography sx={{ fontSize: "13px", color: "#ccc", letterSpacing: "0.02em" }}>
                            {talent.talentName}
                        </Typography>
                    </Box>
                    <Box sx={{
                        backgroundColor: "#2a2218",
                        border: "1px solid #DAA520",
                        borderRadius: "4px",
                        px: "8px",
                        py: "2px",
                        minWidth: "28px",
                        textAlign: "center",
                        flexShrink: 0,
                    }}>
                        <Typography sx={{ fontSize: "11px", color: "#DAA520", fontWeight: 600 }}>
                            {talent.talentRanks}
                        </Typography>
                    </Box>
                </Box>
            ))}
        </Box>
    );
}

function TalentSection({ tree, talents }: { tree: TalentRanks["tree"]; talents: TalentRanks[] }) {
    const [open, setOpen] = useState(true);

    return (
        <Box>
            <Box
                onClick={() => setOpen(o => !o)}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    px: "16px",
                    py: "10px",
                    cursor: "pointer",
                    borderBottom: "1px solid #2e2e2e",
                    backgroundColor: "#1a1a1a",
                    "&:hover": { backgroundColor: "#222" },
                    userSelect: "none",
                }}
            >
                <Typography sx={{
                    fontSize: "11px",
                    fontFamily: "'Cinzel', Georgia, serif",
                    fontWeight: 600,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#DAA520",
                }}>
                    {TREE_LABELS[tree]}
                </Typography>
                <Typography sx={{ fontSize: "12px", color: "#DAA520" }}>
                    {open ? "▲" : "▼"}
                </Typography>
            </Box>
            {open && <TalentGrid talents={talents} />}
        </Box>
    );
}

export default function TalentList({ talents }: TalentListProps) {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1px", backgroundColor: "#2e2e2e" }}>
            {TREE_ORDER.map((tree) => {
                const treeTalents = talents.filter(t => t.tree === tree);
                if (treeTalents.length === 0) return null;
                return <TalentSection key={tree} tree={tree} talents={treeTalents} />;
            })}
        </Box>
    );
}