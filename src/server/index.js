const csv=require('csvtojson');

const csvFilePath='./../data/matches.csv';
const {matchesPerYear,matchesWonPerTeamPerYear} = require('./ipl')


csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    let jsonData = jsonObj;
    // console.log(jsonData);
    matchesPerYear(jsonData)
    matchesWonPerTeamPerYear(jsonData)
    
})

