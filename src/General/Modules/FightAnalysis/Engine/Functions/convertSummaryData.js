async function convertSummaryData(data) {
  let summaryData = Object.keys(data)
    .filter((key) => key === "healers")
    .map((key) => data[key])
    .flat();

  return summaryData;
}

export default convertSummaryData;
