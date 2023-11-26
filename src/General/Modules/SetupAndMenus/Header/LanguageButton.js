import React from "react";
import { Button, Grow, MenuItem, MenuList, Paper, Popper, Tooltip, Divider } from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import makeStyles from "@mui/styles/makeStyles";
import { useTranslation } from "react-i18next";
import ls from "local-storage";
import LanguageIcon from "@mui/icons-material/Language";
import { styled } from "@mui/system";

const StyledButton = styled(Button)(({ theme }) => ({
  color: "white",
  border: "1px solid #ffffff3b",
  "&:hover": {
    color: "white",
    border: "1px solid #ffffff3b",
    backgroundColor: "rgb(255, 255, 255, 0.08)",
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function LanguageSelector() {
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
    ls.set("lang", lang);
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  /* --- return focus to the button when we transitioned from !open -> open --- */
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <div>
        <Tooltip title={t("QeHeader.Tooltip.Language")} arrow>
          <StyledButton color={"white"} variant="outlined" ref={anchorRef} aria-controls={open ? "menu-list-grow" : undefined} aria-haspopup="true" onClick={handleToggle}>
            <LanguageIcon color={"white"} style={{ marginRight: 4 }} />
            {currentLanguage}
          </StyledButton>
        </Tooltip>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={(e) => handleClose(e, currentLanguage)}>
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
                    <MenuItem divider onClick={(e) => handleClose(e, "cn")}>
                      简体中文
                    </MenuItem>
                    <MenuItem divider onClick={(e) => handleClose(e, "en")}>
                      English
                    </MenuItem>
                    <MenuItem divider onClick={(e) => handleClose(e, "fr")}>
                      Français
                    </MenuItem>
                    <MenuItem divider onClick={(e) => handleClose(e, "ru")}>
                      Русский
                    </MenuItem>
                    <MenuItem divider onClick={(e) => handleClose(e, "de")}>
                      Deutsch
                    </MenuItem>
                    <MenuItem divider onClick={(e) => handleClose(e, "it")}>
                      Italian
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
