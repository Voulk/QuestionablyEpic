async function convertEnemyIDs(data) {
  let ids = [];
  Object.entries(data.enemies).map((key) =>
    ids.push({
      id: key[1].id,
      name: key[1].name,
      class: key[1].type,
      spec: key[1].icon,
    }),
  );

  return ids;
}

export default convertEnemyIDs;
