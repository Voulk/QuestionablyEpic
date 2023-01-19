import React, { useState, useEffect } from "react";
import ReactGA from "react-ga";
import { useTranslation } from "react-i18next";
import makeStyles from "@mui/styles/makeStyles";
import { InputLabel, MenuItem, FormControl, Select, Button, Grid, Paper, Typography, Divider, Snackbar, TextField, Popover, Box } from "@mui/material";
import { Autocomplete } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import "../SetupAndMenus/QEMainMenu.css";
import Item from "../Player/Item";
import ClassicItem from "../Player/ClassicItem";
import { checkDefaultSocket, getItemDB, getValidArmorTypes, getValidWeaponTypesBySpec, getItemProp, scoreItem, getItemAllocations, calcStatsAtLevel, getLegendaryID } from "../../Engine/ItemUtilities";
import { CONSTRAINTS } from "../../Engine/CONSTRAINTS";
import { useSelector } from "react-redux";
import { dominationGemDB } from "../../../Databases/DominationGemDB";
import { getTranslatedStats } from "locale/statsLocale";

const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(0.5),
    minWidth: 120,
    whiteSpace: "noWrap",
  },
  title: {
    // padding: "8px 8px",
    paddingLeft: 16,
    fontSize: theme.typography.pxToRem(15),
  },
  typography: {
    padding: theme.spacing(2),
  },
  option: {
    borderBottom: "1px solid rgba(255, 255, 255, 0.23)",
  },
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ItemBar(props) {
  const contentType = useSelector((state) => state.contentType);
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const classes = useStyles();
  /* ------------------------------ Popover Props ----------------------------- */
  const [anchorEl, setAnchorEl] = useState(null);
  const openPop = Boolean(anchorEl);
  const idPop = openPop ? "simple-popover" : undefined;
  const gameType = useSelector((state) => state.gameType);
  const playerSettings = useSelector((state) => state.playerSettings);

  /* ----------------------------- Snackbar State ----------------------------- */
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const fillItems = (slotName, spec) => {
    const acceptableArmorTypes = getValidArmorTypes(spec);
    const acceptableWeaponTypes = getValidWeaponTypesBySpec(spec);
    let newItemList = [];
    const db = getItemDB(gameType);

    db.filter(
      (key) =>
        (!("classReq" in key) || key.classReq.includes(spec)) &&
        (key.slot === "Back" ||
          (key.itemClass === 4 && acceptableArmorTypes.includes(key.itemSubClass)) ||
          key.slot === "Holdable" ||
          key.slot === "Offhand" ||
          key.slot === "Shield" ||
          (key.itemClass === 2 && acceptableWeaponTypes.includes(key.itemSubClass)) ||
          (key.itemClass === 2 && spec === "Holy Priest Classic")), // Wands
    ).map((key) => newItemList.push({ value: key.id, label: key.names[currentLanguage] }));

    newItemList = newItemList.reduce((unique, o) => {
      if (!unique.some((obj) => obj.label === o.label)) {
        unique.push(o);
      }
      return unique;
    }, []);

    newItemList.sort((a, b) => (a.label > b.label ? 1 : -1));

    return newItemList;
  };

  const [itemDropdown, setItemDropdown] = useState(fillItems("", props.player.spec)); // Filled later based on item slot and armor type.
  /* ------------------------------ Define State ----------------------------- */
  const [itemLevel, setItemLevel] = useState("");
  const [itemID, setItemID] = useState("");
  const [itemName, setItemName] = useState("");
  const [activeSlot, setSlot] = useState("");
  const [itemSocket, setItemSocket] = useState(false);
  const [itemTertiary, setItemTertiary] = useState("");
  const [itemList, setItemList] = useState(props.player.getActiveItems(activeSlot));
  const [inputValue, setInputValue] = useState("");
  const [dominationSocket, setDominationSocket] = useState("");
  const [missives, setMissives] = useState("");

  /* ------------------------ End Simc Module Functions ----------------------- */

  const handleClosePop = () => {
    setAnchorEl(null);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  /* ---------------- Add an item to our "Active Items" array. ---------------- */
  const addItem = (event) => {
    if (itemLevel > CONSTRAINTS.Retail.maxItemLevel) {
      setAnchorEl(anchorEl ? null : event.currentTarget);
      return null;
    }
    let player = props.player;
    let item = "";

    if (gameType === "Retail") {
      const itemSlot = getItemProp(itemID, "slot", gameType);
      const isCrafted = getItemProp(itemID, "crafted", gameType);

      if (isCrafted) {
        // Item is a legendary and gets special handling.
        const missiveStats = missives.toLowerCase().replace(" (engineering)", "").replace(/ /g, "").split("/");
        let itemAllocations = getItemAllocations(itemID, missiveStats);
        let craftedSocket = checkDefaultSocket(itemID);
        item = new Item(itemID, itemName, itemSlot, craftedSocket, itemTertiary, 0, itemLevel, "");
        item.stats = calcStatsAtLevel(item.level, itemSlot, itemAllocations, "");
        if (item.slot === "Neck") item.socket = 3;
        //if (item.effect.type.includes("unity")) item.uniqueEquip = "unity";
        //item.uniqueEquip = "legendary";
        let bonusString = "";
        if (missives.includes("Haste")) bonusString += ":6649";
        if (missives.includes("Mastery")) bonusString += ":6648";
        if (missives.includes("Crit")) bonusString += ":6647";
        if (missives.includes("Versatility")) bonusString += ":6650";

        item.bonusIDS = bonusString;
        item.guessQualityColor();
      } else {
        item = new Item(itemID, itemName, getItemProp(itemID, "slot", gameType), itemSocket, itemTertiary, 0, itemLevel, "");
        if (item.slot === "Neck" && itemSocket) item.socket = 3;
        item.guessQualityColor();

      }
    } else {
      // Burning Crusade
      item = new ClassicItem(itemID, itemName, getItemProp(itemID, "slot", gameType), "");
    }

    item.softScore = scoreItem(item, player, contentType, gameType, playerSettings);

    player.addActiveItem(item);
    setItemList([...player.getActiveItems(activeSlot)]);
    props.setItemList([...player.getActiveItems(activeSlot)]);
    setOpen(true);

    setInputValue("");
    setItemLevel("");
    setItemSocket(false);
    setItemTertiary("");
    setDominationSocket("");
  };

  const itemNameChanged = (event, val) => {
    if (val === null) {
      setItemID("");
      setItemName("");
    } else {
      setItemID(val.value);
      setItemName(val.name);
      if (gameType === "Classic") setItemLevel(getItemProp(val.value, "itemLevel", gameType));
    }
  };

  const itemLevelChanged = (val) => {
    setItemLevel(val);
    //setItemSocket(false);
    //setItemTertiary("");
  };

  const itemSocketChanged = (event) => {
    setItemSocket(event.target.value);
  };

  const itemTertiaryChanged = (event) => {
    setItemTertiary(event.target.value);
  };

  const itemDominationChanged = (event) => {
    setDominationSocket(event.target.value);
  };

  const itemMissivesChanged = (event) => {
    setMissives(event.target.value);
  };

  const [openAuto, setOpenAuto] = React.useState(false);
  const handleOpen = () => {
    if (inputValue.length > 0) {
      setOpenAuto(true);
    }
  };
  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
    if (newInputValue.length > 2) {
      setOpenAuto(true);
    } else {
      setOpenAuto(false);
    }
  };
  /* ---------------------------------------- Missive Array --------------------------------------- */
  const legendaryStats = ["Haste / Versatility", "Haste / Mastery", "Haste / Crit", "Crit / Mastery", "Crit / Versatility", "Mastery / Versatility",
                          "Haste (engineering)", "Crit (engineering)", "Mastery (engineering)", "Versatility (engineering)"];
  const legendaryItemLevels = [190, 210, 225, 235, 249, 262, 291];

  const isItemShadowlandsLegendary = getItemDB("Retail")
    .filter((key) => key.id === itemID)
    .map((key) => key.crafted)[0]; // Change this to crafted.

  const isItemDomination =
    getItemDB("Retail")
      .filter((key) => key.id === itemID)
      .map((key) => key.socketType)[0] === "Domination";

  return (
    <Paper
      id="itemBarPaper"
      elevation={0}
      style={{
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto",
        paddingTop: 8,
      }}
    >
      <Grid
        id="itemBarMainGridContainer"
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        style={{
          // paddingTop: 4,
          paddingBottom: 4,
          // display: "inline-flex",
        }}
      >
        <Grid id="itemBarTitleGrid" item xs={12}>
          <Typography id="itembarTitleTypography" className={classes.title}>
            {t("QuickCompare.ItemBarTitle")}
          </Typography>
          <Divider id="itemBarTitleDivider" variant="middle" />
        </Grid>
        {/* -------------------------------------------------------------------------- */
        /*                               Item Selection                               */
        /* -------------------------------------------------------------------------- */}

        <Grid item xs={11} sm={11} md={6} lg={6} xl={5}>
          <FormControl className={classes.formControl} variant="outlined" size="small" fullWidth>
            <Autocomplete
              size="small"
              classes={{
                option: classes.option,
              }}
              id="item-select"
              // value={AutoValue}
              onChange={(e, v) => itemNameChanged(e, v)}
              options={itemDropdown}
              openOnFocus={true}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) => option.value === value.value}
              inputValue={inputValue}
              onInputChange={handleInputChange}
              freeSolo
              style={{ width: "100%" }}
              renderInput={(params) => <TextField {...params} label={t("QuickCompare.ItemName")} variant="outlined" />}
              // TODO: Fix option key error
              // renderOption={(props, option) => {
              //   return (
              //     <Box component="li" {...props} key={option.id}>
              //       {option.name}
              //     </Box>
              //   );
              // }}
              ListboxProps={{ style: { border: "1px solid rgba(255, 255, 255, 0.23)", borderRadius: 4, paddingTop: 0, paddingBottom: 0 } }}
              open={openAuto}
              onOpen={handleOpen}
              onClose={() => setOpenAuto(false)}
            />
          </FormControl>
        </Grid>

        {/* -------------------------------------------------------------------------- */
        /*                                 Item Level                                 */
        /* -------------------------------------------------------------------------- */}

        <Grid item>
          {false ? (
            <FormControl className={classes.formControl} variant="outlined" size="small" disabled={itemID === "" || gameType !== "Retail" ? true : false}>
              <InputLabel id="itemLevelSelectLabel">{t("QuickCompare.ItemLevel")}</InputLabel>
              <Select key={"itemLevelSelect"} labelId="itemLevelSelectLabel" value={itemLevel} onChange={(e) => itemLevelChanged(e.target.value)} label={t("QuickCompare.ItemLevel")}>
                {legendaryItemLevels.map((key, i, arr) => {
                  let lastItem = i + 1 === arr.length ? false : true;
                  return (
                    <MenuItem divider={lastItem} key={key} label={key} value={key}>
                      {key}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          ) : (
            <FormControl className={classes.formControl} variant="outlined" size="small" style={{ width: t("QuickCompare.ItemLevel").length > 10 ? 160 : 120 }}>
              <TextField
                error={itemLevel > CONSTRAINTS.Retail.maxItemLevel ? true : false}
                id="Ilvl-select"
                onChange={(e) => itemLevelChanged(e.target.value)}
                value={itemLevel}
                label={t("QuickCompare.ItemLevel")}
                disabled={itemID === "" || gameType !== "Retail" ? true : false}
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 3);
                }}
                variant="outlined"
                size="small"
                type="number"
                inputProps={{
                  min: CONSTRAINTS.Retail.minItemLevel,
                  max: CONSTRAINTS.Retail.maxItemLevel,
                }}
              />
            </FormControl>
          )}
        </Grid>

        {
          /* ---------------------------------------------------------------------------------------------- */
          /*                                   Legendary Missive Selection                                  */
          /* ---------------------------------------------------------------------------------------------- */
          isItemShadowlandsLegendary === true ? (
            <Grid item>
              <FormControl className={classes.formControl} variant="outlined" size="small" disabled={itemLevel === "" ? true : false}>
                <InputLabel id="missiveSelection">{t("QuickCompare.Missives")}</InputLabel>
                <Select key={"missiveSelection"} labelId="missiveSelection" value={missives} onChange={itemMissivesChanged} label={t("QuickCompare.Missives")}>
                  {legendaryStats.map((key, i, arr) => {
                    let lastItem = i + 1 === arr.length ? false : true;
                    return (
                      <MenuItem divider={lastItem} key={key} label={t(key)} value={key}>
                        {t(key)}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          ) : isItemDomination ? (
            /* ---------------------------------------------------------------------------------------------- */
            /*                                       Domination Sockets                                       */
            /* ---------------------------------------------------------------------------------------------- */
            gameType === "Retail" ? (
              <Grid item>
                <FormControl
                  className={classes.formControl}
                  variant="outlined"
                  size="small"
                  style={{ width: t("QuickCompare.DominationSocket").length > 10 ? 160 : 140 }}
                  disabled={itemLevel !== "" && isItemDomination ? false : true}
                >
                  <InputLabel id="DominationSocket">{t("QuickCompare.DominationSocket")}</InputLabel>
                  <Select key={"DominationSocket"} labelId="DominationSocket" value={dominationSocket} onChange={itemDominationChanged} label={t("QuickCompare.DominationSocket")}>
                    {dominationGemDB
                      .filter((filter) => filter.type !== "Set Bonus")
                      .map((key, i, arr) => {
                        let lastItem = i + 1 === arr.length ? false : true;
                        return (
                          <MenuItem divider={lastItem} key={key.gemID} label={key.name[currentLanguage]} value={key.gemID}>
                            <a data-wowhead={"item=" + key.gemID}>
                              <img
                                style={{
                                  height: 20,
                                  width: 20,
                                  margin: "0px 5px 0px 0px",
                                  verticalAlign: "middle",
                                  borderRadius: 4,
                                  border: "1px solid rgba(255, 255, 255, 0.12)",
                                }}
                                src={process.env.PUBLIC_URL + "/Images/Icons/" + key.icon + ".jpg"}
                                alt={key.name[currentLanguage]}
                              />
                            </a>
                            {key.name[currentLanguage] + " " + "[" + (key.effect.rank + 1) + "]"}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </Grid>
            ) : (
              ""
            )
          ) : /* ---------------------------------------------------------------------------------------------- */
          /*                                             Sockets                                             */
          /* ----------------------------------------------------------------------------------------------  */
          gameType === "Retail" ? (
            <Grid item>
              <FormControl className={classes.formControl} variant="outlined" size="small" disabled={itemLevel === "" ? true : false}>
                <InputLabel id="itemsocket">{t("QuickCompare.Socket")}</InputLabel>
                <Select key={"sockets"} labelId="itemsocket" value={itemSocket} onChange={itemSocketChanged} label={t("QuickCompare.Socket")}>
                  <MenuItem divider key={1} label={t("Yes")} value={true}>
                    {t("Yes")}
                  </MenuItem>
                  <MenuItem key={3} label={t("No")} value={false}>
                    {t("No")}
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          ) : (
            ""
          )
        }

        {/* -------------------------------------------------------------------------- */
        /*                              Tertiary Dropdown                             */
        /* -------------------------------------------------------------------------- */}

        {gameType === "Retail" ? (
          <Grid item>
            <FormControl
              className={classes.formControl}
              variant="outlined"
              size="small"
              style={{ width: t("QuickCompare.ItemLevel").length > 10 ? 160 : 120 }}
              disabled={itemLevel === "" || isItemShadowlandsLegendary === true ? true : false}
            >
              <InputLabel id="itemtertiary">{t("QuickCompare.Tertiary")}</InputLabel>
              <Select key={"TertiarySelect"} labelId="itemtertiary" value={itemTertiary} onChange={itemTertiaryChanged} label={t("QuickCompare.Tertiary")}>
                <MenuItem divider key={"LeechItem"} label={getTranslatedStats("Leech", currentLanguage)} value={"Leech"}>
                  {getTranslatedStats("Leech", currentLanguage)}
                </MenuItem>
                <MenuItem divider key={"AvoidanceItem"} label={getTranslatedStats("Avoidance", currentLanguage)} value={"Avoidance"}>
                  {getTranslatedStats("Avoidance", currentLanguage)}
                </MenuItem>
                <MenuItem key={"NoneItem"} label={t("None")} value={"None"} onClick={""}>
                  {t("None")}
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        ) : (
          ""
        )}

        {/* -------------------------------------------------------------------------- */
        /*                                 Add Button                                 */
        /* -------------------------------------------------------------------------- */}

        <Grid item>
          <Button key={8} variant="contained" color="primary" onClick={addItem} size="small" disabled={itemLevel === "" ? true : false}>
            {t("QuickCompare.AddButton")}
          </Button>
          <Popover
            id={idPop}
            open={openPop}
            anchorEl={anchorEl}
            onClose={handleClosePop}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Typography className={classes.typography}>{t("QuickCompare.ItemErrorMsg")}</Typography>
          </Popover>
        </Grid>
        {/* Item added snackbar */}
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            {t("QuickCompare.ItemAdded")}
          </Alert>
        </Snackbar>
      </Grid>
    </Paper>
  );
}
