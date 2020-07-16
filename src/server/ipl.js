const fs = require("fs");

const matchesPerYear = (json) => {
  const output = json.reduce((acc, currVal) => {
    if (acc[currVal.season]) acc[currVal.season]++;
    else acc[currVal.season] = 1;
    return acc;
  }, {});

  fs.writeFile(
    "./../output/matchesPerYear.json",
    JSON.stringify(output),
    (err) => {
      if (err) console.error("Not able to write file", err);
      console.log("Matches per year file saved!");
    }
  );
};

const matchesWonPerTeamPerYear = (json) => {
  const output = json.reduce((acc, currVal) => {
    if (acc[currVal.season]) {
      if (acc[currVal.season][currVal.winner])
        acc[currVal.season][currVal.winner]++;
      else acc[currVal.season][currVal.winner] = 1;
    } else acc[currVal.season] = {};
    return acc;
  }, {});

  fs.writeFile(
    "./../output/wonMatchesPerYear.json",
    JSON.stringify(output),
    function (err) {
      if (err) console.error("Not able to write file", err);
      console.log("Matches won per team per year file Saved!");
    }
  );
};

const extraRunPerTeamIn2016 = (match, delivery) => {
  const dataOf2016 = [];
  const output = { 2016: {} };
  for (let item of match) {
    if (item.season == 2016) {
      dataOf2016.push(item);
    }
  }
  const arrayOfIds = dataOf2016.map((item) => item.id);
  for (var item of delivery) {
    for (let i = 0; i < arrayOfIds.length; i++) {
      if (item.match_id == arrayOfIds[i]) {
        if (output["2016"].hasOwnProperty(item.bowling_team)) {
          output["2016"][item.bowling_team] += parseInt(item.extra_runs);
        } else {
          output["2016"][item.bowling_team] = 0;
        }
      }
    }
  }
  fs.writeFile(
    "./../output/extraRunPerTeamIn2016.json",
    JSON.stringify(output),
    function (err) {
      if (err) console.error("Not able to write file", err);
      console.log("Extra run per team in 2016 file Saved!");
    }
  );
};


const topTenEconomicalBowlerIn2015 = (match, delivery) => {
  const dataOf2015 = [];
  const output = [];
  for (let item of match) {
    if (item.season == 2015) {
      dataOf2015.push(item);
    }
  }
  for (let item of delivery) {
    for (let items of dataOf2015) {
      if (item.id == items.match_id) {
        if (output[item.bowler]) {
          output[item.bowler].bowl += 1;
          output[item.bowler].runs += +item.total_runs;
        } else {
          output[item.bowler] = {};
          output[item.bowler].bowl = 1;
          output[item.bowler].runs = +item.total_runs;
        }
      }
    }
  }

  const arrayOfEconomy = [];
  const resultArr = [];

  for (let bowler in output) {
    if (output[bowler].bowl > 6) {
      output[bowler].economy = (
        output[bowler].runs /
        (output[bowler].bowl / 6)
      ).toFixed(2);
      arrayOfEconomy.push(output[bowler].economy);
    }
  }

  arrayOfEconomy.sort((a, b) => a - b);

  for (let bowlers in output) {
    if (
      output[bowlers].economy <= +arrayOfEconomy[9] &&
      +output[bowlers].economy !== 0
    ) {
      let finalObj = {};
      finalObj.bowler = Object.values(bowlers).join("");
      finalObj.economy = output[bowlers].economy;
      resultArr.push(finalObj);
    }
  }

  resultArr.sort((a, b) => a.economy - b.economy);
  
  fs.writeFile(
    "./../output/topTenBestBowlerByEconomy.json",
    JSON.stringify(resultArr),
    function (err) {
      if (err) console.error("Not able to write file", err);
      console.log("Top 10 economy bowler in 2015 file Saved!");
    }
  );
};

module.exports = {
  matchesPerYear,
  matchesWonPerTeamPerYear,
  extraRunPerTeamIn2016,
  topTenEconomicalBowlerIn2015,
};
