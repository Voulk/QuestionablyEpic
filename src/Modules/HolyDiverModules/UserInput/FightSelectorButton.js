import React from "react";
import LogImport from "../LogImport/LogImport";
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
    <div>
      <Button
        aria-controls="fight-selector"
        aria-haspopup="true"
        onClick={handleClick}
        variant="outlined"
        style={{ whiteSpace: "nowrap" }}
      >
        {t("HDUserInputs.fightButtonLabel")}
      </Button>
      <Menu
        id="fight-selector"
        anchorEl={anchorEl}
        // keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        TransitionComponent={Fade}
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