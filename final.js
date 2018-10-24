
var fs = require('fs');

let rawdata = fs.readFileSync('edited.json');
let coins = JSON.parse(rawdata);
var removedArr=[];
for (var i = 0; i < coins.length; i++) {
    if (!(coins[i].bip44id)) {
        removedArr.push(coins[i]);
        coins.splice(i, 1);
    }
}
//create removed json file
let dataRemoved = JSON.stringify(removedArr, null, 2);
fs.writeFile('removed.json', dataRemoved, 'utf8', function (err, data) {
    //  console.log(symbol);
});

//add missing one
function readFiles(dirname, onFileContent, onError) {
    fs.readdir(dirname, function (err, filenames) {
        if (err) {
            onError(err);
            return;
        }
        filenames.forEach(function (filename) {
            fs.readFile(dirname + filename, 'utf-8', function (err, content) {
                if (err) {
                    onError(err);
                    return;
                }
                onFileContent(filename, content);
            });
        });
    });
}
readFiles('eth/', function (filename, content) {
    var obj = JSON.parse(content);
    var symbol = obj.symbol.trim();
    var name = obj.name.trim();
    var newObj={};
    newObj.symbol=symbol;
    newObj.name=name;
    newObj.address = obj.address;
    newObj.unitExponent = obj.decimals;
    coins.push(newObj);
    // fs.writeFileSync('coins.json', coins);
    //create processed json file
    let data = JSON.stringify(coins, null, 2);
    fs.writeFile('result.json', data, 'utf8', function (err, data) {
        //  console.log(symbol);
    });

}, function (err) {
    throw err;
});