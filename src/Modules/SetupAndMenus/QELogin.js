import React from "react";
import Button from "@material-ui/core/Button";
import { useHistory, useLocation } from "react-router-dom";
// import ls from "local-storage";
import BattleNetLogo from "../../Images/QeAssets/BattleNetLogo.png";
import { Grid } from "@material-ui/core";

export function QELogin(props) {
  let history = useHistory();

  const btnStyle = {
    display: "inline-block",
    margin: "0px",
    marginTop: "12px",
    marginRight: "20px",
    marginLeft: "20px",
  };

  function handleClick(region) {
    props.setRegion(region);
    history.push("/attemptlogin");
  }

  return (
    <div>
      <img
        src={BattleNetLogo}
        style={{ borderRadius: "4px" }}
        alt="BattleNet"
      />
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
        wrap="nowrap"
      >
        <Grid item xs={4}>
          <Button
            variant="contained"
            color="primary"
            style={btnStyle}
            onClick={() => handleClick("us")}
          >
            US
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            color="primary"
            style={btnStyle}
            onClick={() => handleClick("eu")}
          >
            EU
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            color="primary"
            style={btnStyle}
            onClick={() => handleClick("apac")}
          >
            APAC
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            color="primary"
            style={btnStyle}
            onClick={() => handleClick("cn")}
          >
            CN
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

// Checks that the battle tag and player ID are valid.
// ID is just in the format of a medium length int, BTag is String#Numbers. Regex should be more than sufficient.
// TODO implement
function checkCanUpdateID(ID, BTAG) {
  return true;
}

// Takes the players authorization code and sends it to the QE servers to be converted into an access code.
// We use the QE servers for this to avoid revealing our client secret.
export function ConfirmLogin(props) {
  let query = useQuery();
  let history = useHistory();

  fetch("https://questionablyepic.com/getTok.php?code=" + query.get("code"))
    .then((res) => res.text())
    .then((response) => {
      //alert("Success |" + response + "|")
      getPlayerTag(response, props.updatePlayerID);
    })
    .catch((err) => console.log(err));

  history.push("/");

  //});
  props.loginSnackOpen();
  return (
    <div>
      <p>{query.get("code")}</p>
    </div>
  );
}

// Uses a players access token to get their battle tag and player ID.
// Right now PlayerID is assumed to be unique. This probably needs to be double checked before we use it as a primary key.
function getPlayerTag(accessToken, updatePlayerID) {
  fetch("https://us.battle.net/oauth/userinfo?access_token=" + accessToken)
    .then((res) => res.json())
    .then(
      (result) => {
        //alert("Full Success" + JSON.stringify(result) + "|" + result.battletag)
        if (checkCanUpdateID(result.id, result.battletag)) {
          updatePlayerID(result.id, result.battletag);
          dbCreatePlayer(result.id, result.battletag);
        }
      },
      (error) => {
        console.log("Error: " + error.message + ".");
      }
    );
}

function dbCreatePlayer(bid, btag) {
  let adjTag = btag.replace("#", "%23");
  let fetchUrl =
    "https://questionablyepic.com/api/addUser.php?btag=" +
    adjTag +
    "&bid=" +
    bid;

  fetch(fetchUrl)
    .then((res) => res.text())
    .then((response) => {
      //alert("Success |" + response + "|")
    })
    .catch((err) => console.log(err));
}

// Add allChars to DB with a players bid and btag.
function dbAddCharacters() {}

// Update a players characters in the DB when a change is made.
// Possible changes:
// - Changed stat weights.
// - New Log URL.
// - Character name change.
// - Deleted character.
function dbUpdateCharacters() {}

function dbPullCharacters() {}