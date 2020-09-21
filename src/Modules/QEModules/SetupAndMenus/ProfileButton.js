import React from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import BnetIcon from "../../../Images/QeAssets/BattleNetIcon.png";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { ConfirmLogin, QELogin } from "./QELogin";

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function ProfileSelector(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [opendialog, setOpenDialog] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleHoverOpen = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const { t } = useTranslation();

  const handleClose = () => {
    // if (anchorRef.current && anchorRef.current.contains(event.target)) {
    //   return;
    // }
    setOpen(false);
  };

  const handleLogout = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    props.logFunc();
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
    // if (prevOpen.current === true && open === false) {
    //   anchorRef.current.focus();
    // }

    prevOpen.current = open;
  }, [open]);

  function buttonTHing(name) {
    if (name === t("HeaderLabels.Login")) {
      return (
        <div>
          <Button onClick={handleDialogOpen}>{t("HeaderLabels.Login")}</Button>
          <Dialog
            onClose={handleCloseDialog}
            aria-labelledby="customized-dialog-title"
            open={opendialog}
          >
            <DialogContent>
              <QELogin
                langSet={props.langSet}
                curLang={props.lang}
                setRegion={props.setRegion}
              />
            </DialogContent>
          </Dialog>
        </div>
      );
    } else {
      return (
        <Button
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          onMouseOver={handleHoverOpen}
        >
          <img src={BnetIcon} width="24px" height="24px" />
          {props.name}
        </Button>
      );
    }
  }

  return (
    <div className={classes.root}>
      {console.log(props.name)}
      <div>
        {buttonTHing(props.name)}
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
                    <MenuItem
                      onClick={(e) => handleClose(e)}
                      component={props.component}
                      to={props.to}
                    >
                      Account
                    </MenuItem>
                    <MenuItem onClick={(e) => handleLogout(e)}>Logout</MenuItem>
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