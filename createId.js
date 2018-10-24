
var fs = require('fs');

let rawdata = fs.readFileSync('result.json');  
let coins = JSON.parse(rawdata); 
for(var i=0;i<coins.length;i++){
coins[i].id=i;
if(coins[i].address){
    coins[i].tokenNetwork='eth';
}
} 
let dataRemoved = JSON.stringify(coins, null, 2);
fs.writeFile('coin-ids.json', dataRemoved, 'utf8', function (err, data) {
      console.log('Done');
});