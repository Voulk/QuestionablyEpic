
import { useTranslation } from "react-i18next";
import makeStyles from "@mui/styles/makeStyles";
import { Card, CardActions, CardContent, Divider, Grid, Typography } from "@mui/material";
import WowheadTooltip from "General/Modules/GeneralComponents/WHTooltips.tsx"
import { getItemIcon} from "General/Engine/ItemUtilities";
// import { legendaryImages } from "./LegendaryIcons";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    minHeight: 275,
    borderColor: "goldenrod",
  },
  content: { height: 200 },
  title: { fontSize: 14 },
  pos: { marginBottom: 12 },
});

export default function TierObject(props) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  // Item Provided to Component
  const set = props.set;
  // Player Data
  // const player = props.player;
  // const slots = set.slots;

  return (
    // Breakpoints (12 units / row)
    // value         |0px     600px    960px    1280px   1920px
    // key           |xs      sm       md       lg       xl
    // screen width  |--------|--------|--------|--------|-------->
    // range         |   xs   |   sm   |   md   |   lg   |   xl
    // xs - 12/12 = one card per row,
    // sm = 6/12 = Two cards per row,
    // lg = 4/12 = Three cards per row,
    // xl = 3/12 = Four cards per row

    <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
      <Card className={classes.root} variant="outlined">
        <CardContent className={classes.content}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ alignSelf: "center", width: "100%" }}>
              {/* --------------------------------------- Set Name --------------------------------------- */}
              <Typography
                color="primary"
                variant="h6"
                align="center"
                component="h2"
                gutterBottom
                style={{
                  // fontSize: "0.9rem",
                  alignSelf: "center",
                  lineHeight: 1,
                }}
              >
                {set.name[currentLanguage]}
              </Typography>
            </div>
          </div>
          {/* ---------------------------- Divider to seperate header from body ---------------------------- */}
          <Divider style={{ marginBottom: 6 }} />
          <Grid container spacing={1} direction="row" justifyContent="space-between" alignItems="center" style={{ height: 110 }}>
            <Grid item xs={12} style={{ marginTop: 4 }}>
              {/* --------------------------------------- Set Icons --------------------------------------- */}
              <Grid container spacing={1} direction="row" justifyContent="center" alignItems="center">
                {set.slots
                  //.filter((filter) => set.slots[filter].id > 0)
                  .map((key, i) => (
                    <Grid item key={i}>
                      <WowheadTooltip type="item" id={key} domain={"mop-classic"}>
                        <img
                          height={40}
                          width={40}
                          src={getItemIcon(key, "Classic")}
                          alt={key}
                          style={{
                            borderRadius: 4,
                            borderWidth: "1px",
                            borderStyle: "solid",
                            borderColor: "#a73fee",
                          }}
                        />
                      </WowheadTooltip>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            {/* ---------------------------------------------------------------------------------------------- */
            /*                                              2 Set                                              */
            /* ----------------------------------------------------------------------------------------------  */}
            <Grid item xs={12}>
              <Typography align="left" variant="caption" style={{ fontSize: "0.75rem", lineHeight: 1.1 }} component="p">
                {set.twoSet["effect"][currentLanguage]}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            {/* ---------------------------------------------------------------------------------------------- */
            /*                                              4 Set                                              */
            /* ---------------------------------------------------------------------------------------------- */}
            <Grid item xs={12}>
              <Typography align="left" variant="caption" style={{ fontSize: "0.75rem", lineHeight: 1.1 }} component="p">
                {set.fourSet["effect"][currentLanguage]}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            {/* ---------------------------------------------------------------------------------------------- */
            /*                                              6 Set                                             */
            /* ----------------------------------------------------------------------------------------------  */}
            {/* ------------------- Unused - Here for Any 6 set requirements in the future -------------------  */}
            {/* <Typography align="left" variant="caption" style={{ fontSize: "0.75rem", lineHeight: 1.1 }} component="p">
                  {t(set.sixSet["effect"] + ".desc")}
                </Typography> */}
            {/* <Grid item xs={12}>
              <Divider />
            </Grid> */}
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          {/* ---------------------------------------------------------------------------------------------- */
          /*                                            HPS / Set                                           */
          /* ----------------------------------------------------------------------------------------------  */}
          <Grid container direction="row" wrap="nowrap">
            <Grid item xs={6} style={{ textAlign: "center" }}>
              <div style={{ display: "inline-flex" }}>
                <Typography variant="h6" align="center" component="p" noWrap>
                  {t("TierSets.2Set")}:
                </Typography>
                <Typography variant="h6" align="center" component="p" style={{ marginLeft: 6 }}>
                  {/* TODO: Translations */}-
                </Typography>
              </div>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs={6} style={{ textAlign: "center" }}>
              <div style={{ display: "inline-flex" }}>
                <Typography variant="h6" align="center" component="p" noWrap>
                  {t("TierSets.4Set")}:
                </Typography>
                <Typography variant="h6" align="center" component="p" style={{ marginLeft: 6 }}>
                  {/* TODO: Translations */}-
                </Typography>
              </div>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
}
