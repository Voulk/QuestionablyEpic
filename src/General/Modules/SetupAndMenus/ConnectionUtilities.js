export function dbCheckPatron(email, setPatron) {
  let name = "";
  let realm = "NA";
  let fetchUrl = "https://questionablyepic.com/api/checkemail.php?pemail=" + email + "&pname=" + name + "&prealm=" + encodeURIComponent(realm);

  fetch(fetchUrl)
    .then((res) => res.text())
    .then((response) => {
      // alert("Success |" + response + "|");
      setPatron(response);
    })
    .catch((err) => console.log(err));
}

export async function dbGetArticleList(setArticleList) {
  let fetchUrl = "https://questionablyepic.com/api/getArticleList.php";
  fetch(fetchUrl)
    .then((res) => res.json())
    .then((data) => {
      setArticleList(data);
      return data;
    })
    .catch((err) => console.log(err));
}

export async function dbGetHallOfFame() {
  let fetchUrl = "https://questionablyepic.com/api/getHall.php";
  fetch(fetchUrl)
    .then((res) => res.json())
    .then((data) => {
      //setArticleList(data);
      return data;
    })
    .catch((err) => console.log(err));
}

export async function apiSendTopGearSet(player, content, score, compared) {
  let name = player.charName;
  let contentType = content;
  let itemsCompared = compared;
  let hardScore = Math.round(score);
  let fetchUrl =
    "https://questionablyepic.com/api/addTopGear.php?btag=" + encodeURIComponent(name) + "&content=" + contentType + "&itemscompared=" + itemsCompared + "&hardscore=" + hardScore;
  //console.log(fetchUrl)
  fetch(fetchUrl)
    .then((res) => res.text())
    .then((response) => {
      // alert("Success |" + response + "|");
    })
    .catch((err) => console.log(err));
}

export async function apiSendUpgradeFinder(player, content) {
  let name = player.charName;
  let contentType = content;

  let fetchUrl = "https://questionablyepic.com/api/addUpgradeFinder.php?btag=" + encodeURIComponent(name) + "&content=" + contentType;
  fetch(fetchUrl)
    .then((res) => res.text())
    .then((response) => {
      // alert("Success |" + response + "|");
    })
    .catch((err) => console.log(err));
}

// export function dbUpdateChar() {}
export async function apiGetPlayerImage(player) {
  if (player !== undefined) {
    let region = player.region.toLowerCase();
    let name = player.charName.toLowerCase();
    let realm = player.realm.toLowerCase().replace(" ", "-");
    let urlReturned = "";
    let fetchUrl = "https://questionablyepic.com/api/getplayerimage.php?pregion=" + region + "&pname=" + encodeURIComponent(name) + "&prealm=" + realm;
    await fetch(fetchUrl)
      .then((res) => res.text())
      .then((response) => {
        urlReturned = response.toString();
      })
      .catch((err) => console.log(err));
    return urlReturned;
  }
  else {
    return "";
  }

}

export async function apiSendError(player, errorType, errorMessage, result) {
  let name = player.charName;

  let fetchUrl =
    "https://questionablyepic.com/api/addError.php?btag=" +
    encodeURIComponent(name) +
    "&etype=" +
    encodeURIComponent(errorType) +
    "&emessage=" +
    encodeURIComponent(errorMessage) +
    "&eresult=" +
    encodeURIComponent(result);


  fetch(fetchUrl)
    .then((res) => res.text())
    .then((response) => {
      // alert("Success |" + response + "|");
    })
    .catch((err) => console.log(err));
}
