import React from "react";
import {
  Button,
  ClickAwayListener,
  Dialog,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Tooltip,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import BnetIcon from "../../Images/QeAssets/BattleNetIcon.png";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { QELogin } from "./QELogin";

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
    if (name === t("QeHeader.Login")) {
      return (
        <div>
          <Tooltip title={t("QeHeader.Tooltip.Login")} arrow>
            <Button onClick={handleDialogOpen}>{t("QeHeader.Login")}</Button>
          </Tooltip>
          <Dialog
            onClose={handleCloseDialog}
            aria-labelledby="customized-dialog-title"
            open={opendialog}
          >
            <DialogContent>
              <QELogin setRegion={props.setRegion} />
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
          <img src={BnetIcon} width="24px" height="24px" alt="" />
          {props.name}
        </Button>
      );
    }
  }

  return (
    <div className={classes.root}>
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
                    style={{
                      border: "1px solid rgba(255, 255, 255, 0.23)",
                      borderRadius: 4,
                      paddingTop: 0,
                      paddingBottom: 0,
                    }}
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
