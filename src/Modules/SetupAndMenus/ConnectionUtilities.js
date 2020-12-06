export function dbCheckPatron(email, setPatron) {
  let name = "";
  let realm = "NA";
  let fetchUrl =
    "https://questionablyepic.com/api/checkemail.php?pemail=" +
    email +
    "&pname=" +
    name +
    "&prealm=" +
    realm;

  fetch(fetchUrl)
    .then((res) => res.text())
    .then((response) => {
      // alert("Success |" + response + "|");
      setPatron(response);
    })
    .catch((err) => console.log(err));
}

// export function dbUpdateChar() {}
export function apiGetPlayerImage(player) {
  let region = player.region;
  let name = player.name;
  let realm = player.realm;
  let fetchUrl =
    "https://questionablyepic.com/api/getplayerimage.php?pregion=" +
    region +
    "&pname=" +
    name +
    "&prealm=" +
    realm;

    fetch(fetchUrl)
    .then((res) => res.text())
    .then((response) => {
      // alert("Success |" + response + "|");
      return(response);
    })
    .catch((err) => console.log(err));

}