var fs = require('fs'),
    request = require('request');

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};
let rawdata = fs.readFileSync('coins.json');  
let coins = JSON.parse(rawdata);  
for(var i=0;i<coins.length;i++){
download('https://s2.coinmarketcap.com/static/img/coins/64x64/'+coins[i].id+".png", coins[i].symbolImage+".png", function(){
  console.log('done');
});
}