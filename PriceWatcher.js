var https = require('https');
var http = require('http');
var MongoClient = require('mongodb').MongoClient;
var util = require('util');

function updateTickers() {
    updateOKCTicker();
    update796Ticker();
    updateBitVCTicker();
}

function updateOKCTicker() {
    console.log("Getting OKCoin Ticker");
    
    MongoClient.connect("mongodb://localhost/futuresapp", function(err, db) {
        if(err) {
            return console.log('Error: ' + err); 
        }
    
        var tickers = db.collection('tickers');
    
        https.get('https://www.okcoin.com/api/v1/future_ticker.do?symbol=btc_usd&contract_type=quarter', function(res) {
            var buffer = '';
            
            res.on('data', function(d) {
                buffer += d;
            });
            
            res.on('end', function() {
                var ticker = JSON.parse(buffer);
                        
                tickers.insert({
                    exchange: "okcoin",
                    timestamp: ticker.date,
                    buy: ticker.ticker.buy,
                    high: ticker.ticker.high,
                    last: ticker.ticker.last,
                    low: ticker.ticker.low,
                    sell: ticker.ticker.sell,
                    volume: ticker.ticker.vol,
                    unit_amount: ticker.ticker.unit_amount,
                    contract_id: ticker.ticker.contract_id
                });
                
                console.log("Inserted OKCOIN LTP: " + ticker.ticker.last + " (volume: " + ticker.ticker.vol + ")");
            });
            
            
        });
   
    });
    
    setTimeout(updateOKCTicker, 10 * 1000);
}


function update796Ticker() {
    console.log("Getting 796 Ticker");
    
    MongoClient.connect("mongodb://localhost/futuresapp", function(err, db) {
        if(err) {
            return console.log('Error: ' + err); 
        }
        
        var tickers = db.collection('tickers');
    
        http.get('http://api.796.com/v3/futures/ticker.html?type=weekly', function(res) {
            var buffer = '';
            
            res.on('data', function(d) {
                buffer += d;
            });
            
            res.on('end', function() {
                var ticker = JSON.parse(buffer);
                        
                tickers.insert({
                    exchange: "796",
                    timestamp: ticker.LAST_TIMESTAMP,
                    buy: ticker.ticker.buy,
                    high: ticker.ticker.high,
                    last: ticker.ticker.last,
                    low: ticker.ticker.low,
                    sell: ticker.ticker.sell,
                    volume: ticker.ticker.vol,
                });
                
                console.log("Inserted 796 LTP: " + ticker.ticker.last + " (volume: " + ticker.ticker.vol + ")");
            });
        
        
        });
    
    });    
    
    setTimeout(update796Ticker, 10 * 1000);
}

function updateBitVCTicker() {
    console.log("Getting BitVC Ticker");
    


    
    MongoClient.connect("mongodb://localhost/futuresapp", function(err, db) {
        if(err) {
            return console.log('Error: ' + err); 
        }
        
        var tickers = db.collection('tickers');
    
        http.get('http://market.bitvc.com/futures/exchange_rate.js', function(res) {
            var buffer = '';
            
            res.on('data', function(d) {
                buffer += d;
            });
            
            res.on('end', function() {
                var exchange_rate = JSON.parse(buffer).rate;

                http.get('http://market.bitvc.com/futures/ticker_btc_quarter.js', function(res2) {
                    var buffer2 = '';
                    
                    res2.on('data', function(d) {
                        buffer2 += d;
                    });
                    
                    res2.on('end', function() {
                        var ticker = JSON.parse(buffer2);
                                
                        tickers.insert({
                            exchange: "bitvc",
                            timestamp: ticker.time,
                            contract_id: ticker.contract_id,
                            buy: ticker.buy / exchange_rate,
                            high: ticker.sell / exchange_rate,
                            last: ticker.last / exchange_rate,
                            low: ticker.low / exchange_rate,
                            sell: ticker.sell / exchange_rate,
                            volume: ticker.vol,
                        });
                        
                        console.log("Inserted BitVC LTP: " + ticker.last / exchange_rate + " (volume: " + ticker.vol + ")");
                    });
                });
                
            });
        });
    

    
    });    
    
    setTimeout(updateBitVCTicker, 10 * 1000);    
}

updateTickers(); // Start The Process.



