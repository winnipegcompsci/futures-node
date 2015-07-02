/* GULP FILE.js */

var util = require('util');
var gulp = require('gulp');
var gutil = require('gulp-util');
var MongoClient = require('mongodb').MongoClient;
var moment = require('moment');


gulp.task('default', function() {
    return gutil.log('Gulp is running');
});

gulp.task('giveadvice', function() {
    var ltp = {};
   
    gutil.log('Checking for advice at: ' + new Date());
    
    MongoClient.connect("mongodb://localhost/futuresapp", function(err, db) {
        if(err) {
            gutil.log(err);
        }
        
        var exchangesRes = db.collection('exchanges').find({});
            
        exchangesRes.forEach(function (exchange) {
            checkForAdvice(exchange.name);
        });
    });
});

function checkForAdvice(exchangeName) {
    gutil.log("Checking for advice from: " + exchangeName);
    var numTicks = 0;
    var sum = 0;
    
    var query = {
        "exchange" : exchangeName.toLowerCase(),
        "timestamp": { $gte: (moment().subtract(1, 'days').unix() * 1000) }
    };
    
    
    MongoClient.connect("mongodb://localhost/futuresapp", function(err, db) {
        if(err) {
            gutil.log(err);
        }

        db.collection('tickers').find(query).forEach(function (tick) {
            numTicks = numTicks + 1;
            sum = Number(sum) + Number(tick.last);
            printMessage("Time: " +  new Date(tick.timestamp * 1000) + "\tCurrent Price: " + tick.last.toFixed(2) + "\tAverage Price: " + Number(sum / numTicks).toFixed(2));
        });
            
        gutil.log(exchangeName + " has a total of: " + numTicks + " ticks today.");
    });
    
    gutil.log();
}

function printMessage(message) {
    gutil.log(message);
}

function printNumTicks(num) {
    gutil.log("There are: " + num + " ticks in this exchange");
}