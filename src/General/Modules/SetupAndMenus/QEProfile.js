import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import { Grid, Button, Typography, TextField, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";
import ls from "local-storage";
import { SUPPORT_TIERS } from "General/Engine/CONSTANTS";
import QEGoldTier from "Images/QeAssets/QEGoldTier.png";
import QEDiamondTier from "Images/QeAssets/QEDiamondTier.png";
import QERollsRoyceTier from "Images/QeAssets/QERollsRoyceTier.png";

const TIER_IMAGES = { Gold: QEGoldTier, Diamond: QEDiamondTier, "Rolls Royce": QERollsRoyceTier };

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('lg')]: {
      margin: "auto",
      width: "80%",
      justifyContent: "center",
    },
    [theme.breakpoints.up("md")]: {
      margin: "auto",
      width: "65%",
      justifyContent: "center",
    },
    [theme.breakpoints.up("lg")]: {
      margin: "auto",
      width: "45%",
      justifyContent: "center",
    },
  },
}));

export default function QEProfile(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const [email, setEmail] = React.useState(ls.get("email") || "");
  const [emailTemp, setEmailTemp] = React.useState("");
  const [showStripeTiers, setShowStripeTiers] = React.useState(false);
  const emailHandler = (event) => {
    if (emailTemp.length > 3 && emailTemp.length < 92) {
      props.setEmail(event);
      setEmail(event);
      props.emailSnack();
    } else {
      props.emailSnackError();
    }
  };

  let patronStatus = props.patronStatus !== "" ? props.patronStatus + " " + t("QeProfile.EditionAffix") : t("QeProfile.StandardEdition");

  let color = {
    "Rolls Royce Edition": "#04E07C",
    "Diamond Edition": "#FFB6C1",
    "Gold Edition": "#DAA520",
    "Standard Edition": "#FFFFFF",
    "Basic Edition": "#FFFFFF",
  };

  return (
    <div className={classes.root}>
      <div style={{ height: 96 }} />
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h4" color="primary" align="center" style={{ padding: "10px 10px 5px 10px" }}>
            {t("QeProfile.ProfileHeader")}
          </Typography>
          <Paper elevation={0} style={{ padding: 10 }}>
            <div style={{ display: "flex" }}>
              <Typography variant="body1" gutterBottom color="primary" align="left" style={{ display: "flex" }}>
                {t("Battletag")}:
              </Typography>
              <Typography variant="body1" gutterBottom align="left" style={{ paddingLeft: 10, color: "#fff" }}>
                {props.playerTag || t("QeProfile.NoBattleTag")}
              </Typography>
            </div>
            <div style={{ display: "flex" }}>
              <Typography variant="body1" gutterBottom color="primary" align="left" style={{ display: "flex" }}>
                {t("Email")}:
              </Typography>
              <Typography variant="body1" gutterBottom align="left" style={{ paddingLeft: 10, color: "#fff" }}>
                {email || t("QeProfile.NoEmail")}
              </Typography>
            </div>
            <div style={{ display: "flex" }}>
              <Typography variant="body1" gutterBottom color="primary" align="left" style={{ display: "flex" }}>
                {t("QeProfile.QeTier")}:
              </Typography>
              <Typography variant="body1" gutterBottom align="left" style={{ paddingLeft: 10, color: color[patronStatus] }}>
                {patronStatus}
              </Typography>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={0} style={{ padding: 10, height: "100%" }}>
            <Typography variant="h6" gutterBottom color="primary">
              Support Directly
            </Typography>
            <Typography variant="body2" gutterBottom style={{ color: "#ccc", marginBottom: 10 }}>
              Subscribe directly to QE Live via Stripe to support ongoing development.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowStripeTiers(!showStripeTiers)}
            >
              Subscribe via Stripe
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={0} style={{ padding: 10, height: "100%" }}>
            <Typography variant="h6" gutterBottom color="primary">
              Support on Patreon
            </Typography>
            <Typography variant="body2" gutterBottom style={{ color: "#ccc", marginBottom: 10 }}>
              Get early access to new features, support ongoing development, and unlock patron tiers.
            </Typography>
            <Button
              variant="contained"
              style={{ backgroundColor: "#FF424D", color: "#fff" }}
              onClick={() => window.open("https://www.patreon.com/c/questionablyepic/home", "_blank")}
            >
              Support on Patreon
            </Button>
          </Paper>
        </Grid>
        {showStripeTiers && SUPPORT_TIERS.map((tier) => (
          <Grid item xs={12} sm={4} key={tier.name} style={{ marginTop: 20 }}>
            <Paper elevation={0} style={{ padding: 10, height: "100%", borderTop: `3px solid ${tier.color}`, display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
                <img src={TIER_IMAGES[tier.name]} alt={tier.name} style={{ width: 80, height: 80, marginRight: 12 }} />
                <Typography variant="h6" style={{ color: tier.color }}>
                  {tier.name} Edition
                </Typography>
              </div>
              {tier.perks.length > 0 && (
                <ul style={{ paddingLeft: 18, marginBottom: 12 }}>
                  {tier.perks.map((perk) => (
                    <li key={perk}>
                      <Typography variant="body2" style={{ color: "#ccc" }}>{perk}</Typography>
                    </li>
                  ))}
                </ul>
              )}
              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: "auto" }}
                onClick={() => window.open(tier.link, "_blank")}
              >
                Subscribe
              </Button>
            </Paper>
          </Grid>
        ))}
        <Grid item xs={12} style={{ marginTop: 20 }}>
          <Paper elevation={0} style={{ padding: 10 }}>
            <Typography variant="h6" gutterBottom color="primary">
              {t("QeProfile.EmailMsg")}
            </Typography>
            <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={1} wrap="nowrap">
              <Grid item xs={11}>
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  value={emailTemp}
                  type="email"
                  fullWidth
                  size="small"
                  onChange={(e) => setEmailTemp(e.target.value)}
                />
              </Grid>
              <Grid item xs="auto">
                <Button variant="contained" color="primary" onClick={() => emailHandler(emailTemp)}>
                  {t("Save")}
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
