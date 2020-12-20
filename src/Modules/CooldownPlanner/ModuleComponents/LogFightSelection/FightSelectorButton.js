import React from "react";
import LogImport from "./FightSelectorMenu";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import { useTranslation } from "react-i18next";

export default function FightSelectorButton(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { t } = useTranslation();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ whiteSpace: "nowrap" }}>
      <Button
        aria-controls="fight-selector"
        aria-haspopup="true"
        disabled={props.disabled || false}
        onClick={handleClick}
        variant="outlined"
        style={{ height: 40 }}
      >
        {t("CooldownPlanner.UserInputs.fightButtonLabel")}
      </Button>
      <Menu
        style={{ marginTop: 5, height: 500 }}
        id="fight-selector"
        anchorEl={anchorEl}
        MenuListProps={{
          style: { paddingTop: 0, paddingBottom: 0, ...props.customStyle },
        }}
        // keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        TransitionComponent={Fade}
        PaperProps={{
          style: { border: "1px solid rgba(255, 255, 255, 0.23)" },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        getContentAnchorEl={null}
      >
        {
          <LogImport
            reportid={props.reportid}
            clicker={props.clicky}
            update={props.update}
            close={handleClose}
          />
        }
      </Menu>
    </div>
  );
}
