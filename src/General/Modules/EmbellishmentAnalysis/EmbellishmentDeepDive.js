
import ItemDetailCard from "../GeneralComponents/ItemDetailCard";
import { Paper, Typography, Grid, Tooltip, Tabs, Tab, Divider } from "@mui/material";

/***
 * @deprecated
 */
export default function EmbellishmentDeepDive(props) {
    const itemCardData = props.itemCardData;
    const categories = ["Items", "Item Attachments"]
    return (
        <Grid container spacing={1} sx={{ marginTop: "16px" }}>
        {categories.map((key, index) => {

            return (
            <Grid item xs={12} key={index} style={{paddingBottom: "20px"}}>
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