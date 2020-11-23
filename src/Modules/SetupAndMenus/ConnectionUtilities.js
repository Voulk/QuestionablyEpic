

export function dbCheckPatron() {
  
    let email = "itsvoulk@gmail.com";
    let name = "Voulk"
    let realm = "NA"

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
        alert("Success |" + response + "|")
      })
      .catch((err) => console.log(err));

    
  }

export function dbUpdateChar() {
  
}
