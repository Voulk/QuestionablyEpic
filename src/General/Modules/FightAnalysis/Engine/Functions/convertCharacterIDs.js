async function convertCharacterIDs(data) {
  let newData = [...data.dps, ...data.healers, ...data.tanks];
  let ids = [];
  Object.entries(newData).map((key) =>
    ids.push({
      id: key[1].id,
      name: key[1].name,
      class: key[1].type,
      spec: key[1].icon,
    }),
  );

  return ids;
}

export default convertCharacterIDs;
