import { Grid, Button, Typography, Tooltip, Paper, Divider, TextField } from "@mui/material";
import { SpellIcon } from "./SpellIcon";

const talentSelector = (talentDB, talentList, addTalent, setTalents, gameType: gameTypes) => {
    return (
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="h6" align="left" style={{ width: "100%" }} color="primary">
            {"Talents"}
            </Typography>
            {[1, 2, 3, 4, 5, 6].map((tier, i) => (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Grid container spacing={1}>
                {talentList.map((spell, j) =>
                    talentDB[spell].tier === tier ? (
                    <Grid item xs="auto" key={j} style={{ paddingBottom: 7 }}>
                        <SpellIcon
                            spell={talentDB[spell]}
                            gameType={gameType}
                            iconType={"Talent"}
                            width={25}
                            //onDragStart={(e) => { dragStart(e, spell) }}
                            onClick={(e) => {
                                e.persist();
                                addTalent(spell, talentDB, setTalents, e);
                            }}
                            style={{ display: "flex", width: '30px', height: '30px', border: talentDB[spell].points === talentDB[spell].maxPoints ? "2px solid #F2BF59" : "2px solid rgba(255,255,255,0.2)", borderRadius: "2px" }}
                        />
                    </Grid>
                    ) : (
                    ""
                    ),
                )}
                <div style={{ height: 25 }} />
                </Grid>
            </Grid>
            ))}
        </Grid>
    )
}