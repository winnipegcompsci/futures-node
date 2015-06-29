function buildChart(chartData) {    
    chartData.okcoin.timestamps.unshift("timestamps");
    chartData.okcoin.data.unshift("OKCoin");
    chartData.seven.data.unshift("796");
    chartData.bitvc.data.unshift("BitVC");
    
    console.log("Chart Data: " + chartData.okcoin.data);
        
    var chart = c3.generate({
        bindto: '#chart',
        /*data: {
            x: 'x',
            columns: [
                ['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
                ['data1', 30, 200, 100, 400, 150, 250],
                ['data2', 130, 340, 200, 500, 250, 350]
            ]
        },*/
        data: {
            x: 'timestamps',
            columns: [
                [chartData.okcoin.timestamps],
                [chartData.okcoin.data],
                [chartData.seven.data],
                [chartData.bitvc.data],
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
}