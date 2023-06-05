async function convertSummaryData({ data }) {
  let summaryData = Object.keys(data.playerDetails)
    .filter((key) => key === "healers")
    .map((key) => result.data.playerDetails[key])
    .flat();

  return summaryData;
}

export default convertSummaryData;
