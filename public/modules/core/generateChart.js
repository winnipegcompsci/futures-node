function buildChart(chartData) {    
    chartData.okcoin.timestamps.unshift('timestamps');
    chartData.okcoin.data.unshift('okcoin');
    chartData.seven.data.unshift("796");
    chartData.bitvc.data.unshift("BitVC");
    
    console.log("Chart Data: " + chartData.okcoin.data);
        
    var chart = c3.generate({
        bindto: '#chart',
        data: {
            x: 'timestamps',
            columns: [
                [chartData.okcoin.timestamps],
                [chartData.okcoin.data],
            ]
        },
        axis: {
            x: {
                type: 'timeseries',
                tick: {
                    format: '%Y-%m-%d %H:%M:%S',
                }
            },
            y: {
                min: 100,
                max: 1000,
            },
        },
    });
    
    var chart2 = c3.generate({
        bindto: '#insurance-coverage-chart',
        data: {
            columns: [
                ['data', 63.7]
            ],
            type: 'gauge',
        },
        gauge: {
            label: {
                format: function(value, ratio) {
                    return value + '%';
                },
                show: false // to turn off the min/max labels.
            },
            min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
            max: 100, // 100 is default
            units: ' %',
            width: 39 // for adjusting arc thickness
        },
        color: {
            pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
            threshold: {
                // unit: 'value', // percentage is default
                // max: 200, // 100 is default
                values: [30, 60, 90, 100]
            }
        },
        size: {
            height: 150
        }
    });
    
    var chart3 = c3.generate({
        bindto: '#trades-by-exchange-chart',
        data: {
            labels: false,
            columns: [
                ['OKCoin', 300, 350, 300, 0, 0, 0],
                ['796', 130, 100, 140, 200, 150, 50],
            ],
            types: {
                data1: 'area',
                data2: 'area-spline'
            }
        },
        size: {
            height: 180,
        }
    });
    
    var chart4 = c3.generate({
        bindto: '#exchange-candle-chart',
        data: {
            columns: [
                ['OKCoin', 273.49, 282.19, 273.32, 263.65, 273.5],
                ['796', 270.88, 282.00, 270.57, 262.00, 271.5],
                ['BitVC', 271.30, 282.76, 271.80, 264.00, 270.80],
                
            ],
            type: 'bar'
        },
        axis: {
            y: {
                min: 250,
                max: 300,
            }
            
        },
        bar: {
            width: {
                ratio: 0.75 // this makes bar width 50% of length between ticks
            }
            
        },
        size: {
            height: 180,
        }
    });

    
    var chart5 = c3.generate({
        bindto: '#profits-losses-chart',
        data: {
            columns: [
                ['OKCoin', 30, -5],
                ['796', 8, -10]
            ],
            labels: [
                ['Profit', 'Loss']
            ],
            type: 'bar'
        },
        bar: {
            width: {
                ratio: 0.5 // this makes bar width 50% of length between ticks
            }
            // or
            //width: 100 // this makes bar width 100px
        },
        size: {
            height: 180,
        }
    });
}

function buildProfitChart() {
    var chart = c3.generate({
        bindto: '#profit-loss-chart',
        data: {
            columns: [
                ['Primary Exchange', 30, 200, 100, 400, 150, 250],
                ['Insurance Exchange', 50, 20, 10, 40, 15, 25]
            ]
        }
    });
}