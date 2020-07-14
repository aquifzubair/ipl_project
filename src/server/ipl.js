const fs = require("fs");

function matchesPerYear(json) {
  let output = {};
  for (let item of json) {
    if (output.hasOwnProperty(item.season)) {
      output[item.season]++;
    } else output[item.season] = 1;
  }
  fs.writeFile(
    "./../output/matchesPerYear.json",
    JSON.stringify(output),
    function (err) {
      if (err) throw err;
      console.log("Saved!");
    }
  );
}

function matchesWonPerTeamPerYear(json) {
  let output = {};
  for (let item of json) {
    if (output.hasOwnProperty(item.season)) {
      let win = item.winner;
      if (output[item.season].hasOwnProperty(item.winner) ) {
        output[item.season][item.winner]++;
        
      } else {
        output[item.season][item.winner] = 1;
      }      
    }
    else {
      output[item.season] = {};
    }
  }

  fs.writeFile(
    "./../output/wonMatchesPerYear.json",
    JSON.stringify(output),
    function (err) {
      if (err) throw err;
      console.log("Saved!");
    }
  );
}

module.exports = {
  matchesPerYear,
  matchesWonPerTeamPerYear,
};
