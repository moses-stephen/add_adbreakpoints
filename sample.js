const xlsx = require("xlsx");
const json2xls = require("json2xls")
const { writeFileSync, readFileSync } = require("fs");
const path = require('path');
var wb = xlsx.readFile("workInput.xlsx");
var ws = wb.Sheets["Sheet1"];
var data = xlsx.utils.sheet_to_json(ws);
let newData = data.reduce((acc, obj) => [...acc, Object.values(obj).map(y => y)], [])
function joinObj(a) {
  var out = [];
  for (var i = 0; i < a.length; i++){
    out.push(a[i].join(","));
  }
  return out
}
var output = joinObj(newData);
var newoutput = JSON.parse(JSON.stringify(output).replace(/;/g, ":"));
console.log(newoutput);
var newArray = new Array();  
  
for(var elements in newoutput) {
  var jsonObj = new Object();
  jsonObj.ad_breakPoints = newoutput[elements];
  newArray.push(jsonObj);
}

var xls = json2xls(newArray);
console.log(newArray);
  
writeFileSync('./UK_AVOD.csv', xls, 'binary');
 