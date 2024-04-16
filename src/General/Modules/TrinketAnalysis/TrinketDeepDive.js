

import ItemDetailCard from "../1. GeneralComponents/ItemDetailCard";
import { Paper, Typography, Grid, Tooltip, Tabs, Tab, Divider } from "@mui/material";

export default function TrinketDeepDive(props) {
    const itemCardData = props.itemCardData;
    const categories = ["Vault Drops", "Aberrus Drops", "Amirdrassil Drops", "Dungeon Drops", "Other", "DPS Trinkets", "Last Season Trinkets"]

    return (
        <Grid container spacing={1} sx={{ marginTop: "16px" }}>
        {categories.map((key, index) => {

            return (
            <Grid item xs={12} key={index}>
                <Typography color="primary" variant="h5">
                {key}
                </Typography>
                <Divider style={{ marginBottom: 10 }} />
                <Grid container spacing={1}>
                    {itemCardData.filter(item => item.category === key).map((item) => (
                    <Grid item xs={6}>
                        <ItemDetailCard item={item} />
                    </Grid>
                    ))}
                </Grid>
            </Grid>
            );
        })}
        </Grid>
    )

}

/*

        */