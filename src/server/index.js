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
    // let output = {};
    // for(let item of jsonData){
    //     if(output.hasOwnProperty(item.season)){
    //         output[item.season]++
    //     }
    //     else
    //         output[item.season] = 1;
    // }
    // console.log(output)
    
})


 
// Async / await usage
// const jsonArray=await csv().fromFile(csvFilePath);