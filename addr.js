var fs = require('fs');

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
var oldPath = 'eth/'
var newPath = 'processed/'

function moveFile(filename) {
    fs.rename(oldPath + filename, newPath + filename, function (err) {
        if (err) throw err
    });
}
var data = {};
let rawdata = fs.readFileSync('coins.json');
let coins = JSON.parse(rawdata);
readFiles('eth/', function (filename, content) {
    var obj = JSON.parse(content);
    var symbol = obj.symbol.trim();
    var name = obj.name.trim();
    var isRepeat = [];
    var count = 0
    for (var i = 0; i < coins.length; i++) {
        if ((coins[i].symbol.trim()).toUpperCase() == symbol.toUpperCase()) {
            coins[i].address = obj.address;
            coins[i].unitExponent = obj.decimals;
            isRepeat.push(coins[i]);
            count++;
             moveFile(filename);
        }
        else if ((coins[i].name.trim()).toUpperCase() == name.toUpperCase()) {
            coins[i].address = obj.address;
            coins[i].unitExponent = obj.decimals;
            isRepeat.push(coins[i]);
            count++;
             moveFile(filename);
        }
        
    }
    // fs.writeFileSync('coins.json', coins);
    //create processed json file
    if (count ==1) {
    let data = JSON.stringify(coins, null, 2);
    fs.writeFile('edited.json', data, 'utf8', function (err, data) {
        //  console.log(symbol);
    });
}

}, function (err) {
    throw err;
});



