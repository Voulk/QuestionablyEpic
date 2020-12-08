export function dbCheckPatron(email, setPatron) {
  let name = "";
  let realm = "NA";
  let fetchUrl =
    "https://questionablyepic.com/api/checkemail.php?pemail=" +
    email +
    "&pname=" +
    name +
    "&prealm=" +
    encodeURIComponent(realm);

  fetch(fetchUrl)
    .then((res) => res.text())
    .then((response) => {
      // alert("Success |" + response + "|");
      setPatron(response);
    })
    .catch((err) => console.log(err));
}

export async function apiSendTopGearSet(player, content, score, compared) {
  let name = player.charName;
  let contentType = content;
  let itemsCompared = compared;
  let hardScore = Math.round(score);
  let fetchUrl =
    "https://questionablyepic.com/api/addTopGear.php?btag=" +
    encodeURIComponent(name) +
    "&content=" +
    contentType +
    "&itemscompared=" +
    itemsCompared + 
    "&hardscore=" +
    hardScore;
  //console.log(fetchUrl)
  fetch(fetchUrl)
    .then((res) => res.text())
    .then((response) => {
      // alert("Success |" + response + "|");
      
    })
    .catch((err) => console.log(err));
}

// export function dbUpdateChar() {}
export async function apiGetPlayerImage(player) {
  let region = player.region.toLowerCase();
  let name = player.charName.toLowerCase();
  let realm = player.realm.toLowerCase().replace(" ", "-");
  let urlReturned = "";
  let fetchUrl = 
    "https://questionablyepic.com/api/getplayerimage.php?pregion=" +
    region +
    "&pname=" +
    encodeURIComponent(name) +
    "&prealm=" +
    realm;
  await fetch(fetchUrl)
    .then((res) => res.text())
    .then((response) => {
      //console.log("Res: " + response + " " + fetchUrl);
      urlReturned = response.toString();
    })
    .catch((err) => console.log(err));
  //console.log(urlReturned);
  return urlReturned;
}
