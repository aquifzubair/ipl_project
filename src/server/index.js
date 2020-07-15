const csv = require("csvtojson");

const matchCsvFilePath = "./../data/matches.csv";
const deliveryCsvFilePath = "./../data/deliveries.csv";

const {
  matchesPerYear,
  matchesWonPerTeamPerYear,
  extraRunPerTeamIn2016,
  topTenEconomicalBowlerIn2015,
} = require("./ipl");

async function runFunctions() {
  // converting data from csv to json
  const matchJsonData = await csv().fromFile(matchCsvFilePath);
  const deliveryJsonData = await csv().fromFile(deliveryCsvFilePath);

  //calling all four functions
  matchesPerYear(matchJsonData);
  matchesWonPerTeamPerYear(matchJsonData);
  extraRunPerTeamIn2016(matchJsonData, deliveryJsonData);
  topTenEconomicalBowlerIn2015(matchJsonData, deliveryJsonData);
}

runFunctions();
