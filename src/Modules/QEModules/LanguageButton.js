import React from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import ruFlag from "../../locale/ru/ru.png";
import enFlag from "../../locale/en/en.png";
import chFlag from "../../locale/ch/ch.png";

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
  const [open, setOpen] = React.useState(false);
  const [language, setLanguage] = React.useState(props.curLang);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event, lang) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    if (lang === undefined) {
      lang = language;
    }
    setLanguage(lang);
    props.langSet(lang);
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

  const langIcon = (check) => {
    if (check === "en") {
      return enFlag;
    } else if (check === "ru") {
      return ruFlag;
    } else if (check === "ch") {
      return chFlag;
    } else {
      return enFlag;
    }
  };

  return (
    <div className={classes.root}>
      <div>
        <Button
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <img src={langIcon(language)} style={{ marginRight: "5px" }} />{language}
        </Button>
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
                  >
                    <MenuItem onClick={(e) => handleClose(e, "ch")}>
                      <img src={chFlag} style={{ marginRight: "5px" }} />
                      CH
                    </MenuItem>
                    <MenuItem onClick={(e) => handleClose(e, "en")}>
                      <img src={enFlag} style={{ marginRight: "5px" }} />
                      EN
                    </MenuItem>
                    <MenuItem onClick={(e) => handleClose(e, "ru")}>
                      <img src={ruFlag} style={{ marginRight: "5px" }} />
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