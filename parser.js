
//Preprocesses text to organize words in hash table

var fs = require("fs");
var json = fs.readFileSync('data/cruzParsed.txt').toString();

var json2 = '{"a":[1,4,2], "b":[3,2,5]}';

obj = JSON.parse(json);
console.log(obj['government']);
console.log(obj['government'][1]);
if ('government' in obj){
    console.log(true);
}


