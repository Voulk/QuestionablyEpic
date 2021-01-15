import React from "react";
import {
  Button,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Tooltip,
} from "@material-ui/core";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import ReactCountryFlag from "react-country-flag";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function LanguageSelector(props) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event, lang) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    i18n.changeLanguage(lang);
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const langIcon = () => {
    if (currentLanguage === "en") {
      return (
        <ReactCountryFlag countryCode="GB" svg style={{ marginRight: "5px" }} />
      );
    } else if (currentLanguage === "ru") {
      return (
        <ReactCountryFlag countryCode="RU" svg style={{ marginRight: "5px" }} />
      );
    } else if (currentLanguage === "ch") {
      return (
        <ReactCountryFlag countryCode="CN" svg style={{ marginRight: "5px" }} />
      );
    } else if (currentLanguage === "fr") {
      return (
        <ReactCountryFlag countryCode="FR" svg style={{ marginRight: "5px" }} />
      );
    }
  };

  return (
    <div className={classes.root}>
      <div>
        <Tooltip title={t("QeHeader.Tooltip.Language")} arrow>
          <Button
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            {langIcon(currentLanguage)}
            {currentLanguage}
          </Button>
        </Tooltip>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                    style={{
                      border: "1px solid rgba(255, 255, 255, 0.23)",
                      borderRadius: 4,
                      paddingTop: 0,
                      paddingBottom: 0,
                    }}
                  >
                    <MenuItem onClick={(e) => handleClose(e, "ch")}>
                      <ReactCountryFlag
                        countryCode="CN"
                        svg
                        style={{ marginRight: "5px" }}
                      />
                      CN
                    </MenuItem>
                    <MenuItem onClick={(e) => handleClose(e, "en")}>
                      <ReactCountryFlag
                        countryCode="GB"
                        svg
                        style={{ marginRight: "5px" }}
                      />
                      EN
                    </MenuItem>
                    <MenuItem onClick={(e) => handleClose(e, "fr")}>
                      <ReactCountryFlag
                        countryCode="FR"
                        svg
                        style={{ marginRight: "5px" }}
                      />
                      FR
                    </MenuItem>
                    <MenuItem onClick={(e) => handleClose(e, "ru")}>
                      <ReactCountryFlag
                        countryCode="RU"
                        svg
                        style={{ marginRight: "5px" }}
                      />
                      RU
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}
