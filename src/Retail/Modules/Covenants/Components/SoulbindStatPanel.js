import React from "react";
import { Paper, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { useTranslation } from "react-i18next";

function createData(name, hps) {
  return { name, hps };
}

// The soulbind stat panel sums up all of the active soulbinds in the tree.
export default function SoulbindStatPanel(props) {
  const { t } = useTranslation();
  const covAbilityEst = props.covAbility > 0 ? props.covAbility : "NA";

  //prettier-ignore
  const rows = [
    createData(t("Soulbinds.StatPanel.CovenantEstimate"), covAbilityEst),
    createData(t("Soulbinds.StatPanel.SelectedNodes"), props.hps)
  ];

  return (
    <Grid item xs={12} style={{ padding: 8 }}>
      <Grid container direction="column" spacing={1}>
        <Grid container direction="column">
          <Grid item xs={12}>
            <TableContainer
              component={Paper}
              style={{
                fontSize: "12px",
                textAlign: "left",
                minHeight: 90,
              }}
            >
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ color: "#F2BF59" }}>{t("Soulbinds.StatPanel.Summary")}</TableCell>
                    <TableCell align="right" style={{ color: "#F2BF59" }}>
                      HPS
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.hps}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell align="right" colSpan={1} style={{ color: "#F2BF59" }}>
                      {t("Soulbinds.StatPanel.Score")}
                    </TableCell>
                    <TableCell align="right">{props.hps + props.covAbility}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
