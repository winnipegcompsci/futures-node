// Trade Advisor
var MongoClient = require('mongodb').MongoClient;
var util = require('util');

checkForAdvice();


function checkForAdvice() {
    MongoClient.connect("mongodb://localhost/futuresapp", function(err, db) {
        if(err) {
            return console.log('Error: ' + err);
        }
        
        var ltp_data = {};
        
        var tickers = db.collection('tickers');
        
        var okcoin = tickers.find({"exchange": "okcoin"}).sort({_id : -1}).limit(1);
        var seven = tickers.find({"exchange": "796"}).sort({_id : -1}).limit(1);
        var bitvc = tickers.find({"exchange": "bitvc"}).sort({_id : -1}).limit(1);
                
        okcoin.forEach(function (tick) {
            ltp_data.okcoin = Number(tick.last);
            console.log("OKCOIN LTP Data:: " + Number(tick.last).toFixed(2));
        });
        seven.forEach(function (tick) {
            ltp_data.seven = Number(tick.last);
            console.log("796 LTP Data::::: " + Number(tick.last).toFixed(2));
        });
        bitvc.forEach(function (tick) {
            ltp_data.bitvc = Number(tick.last);
            console.log("BitVC LTP Data::: " + Number(tick.last).toFixed(2));
        });
            
        console.log();
        
        if(ltp_data) {
            giveAdvice(ltp_data);
        }        
        
    });

    setTimeout(checkForAdvice, 10 * 1000);
}

function giveAdvice(ltp_data) {
    console.log("GIVE ADVICE BASED ON: " + util.inspect(ltp_data));
}


