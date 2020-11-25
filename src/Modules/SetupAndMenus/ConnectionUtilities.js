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
