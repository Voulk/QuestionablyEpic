async function convertDefensives(data) {
  let defensives = Object.keys(data)
    .filter((key) => data[key].type === "cast")
    .map((key) => data[key]);

  return defensives;
}

export default convertDefensives;
