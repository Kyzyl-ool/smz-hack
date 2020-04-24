import React, {Component} from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts'
import HC_exporting from 'highcharts/modules/exporting'
import './chart.css'
import ChartProvider from "./ChartProvider";

export default class Chart extends Component {
    constructor(props) {
        super(props);

        const data = [];
        const probability = [0, 0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9]
        let arrange = 2466;

        for (const a of Array(100).keys()) {
            data.push([arrange, probability[Math.floor(Math.random()*probability.length)]])
            arrange++;
        }

        this.state = {
            // To avoid unnecessary update keep all options in the state.
            chartOptions: {
                exporting: {
                    chartOptions: { // specific options for the exported image
                        plotOptions: {
                            series: {
                                dataLabels: {
                                    enabled: true
                                }
                            }
                        }
                    },
                    fallbackToExportServer: false
                },
                chart: {
                    zoomType: 'x'
                },
                title: {
                    text: 'Oil probability'
                },
                subtitle: {
                    text: document.ontouchstart === undefined ?
                        'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
                },
                yAxis: {
                    title: {
                        text: 'Probability'
                    }
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    area: {
                        fillColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1
                            },
                            stops: [
                                [0, Highcharts.getOptions().colors[0]],
                                [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                            ]
                        },
                        marker: {
                            radius: 2
                        },
                        lineWidth: 1,
                        states: {
                            hover: {
                                lineWidth: 1
                            }
                        },
                        threshold: null
                    }
                },
                series: [{
                    type: 'area',
                    name: 'Probability',
                    data: data
                }]
            },
            hoverData: null
        };

        /*this.exportChart = () => {
            this.chart.exportChart();
        };*/
    }

    /*componentDidMount() {
        this.chart = this.refs.chart.chart;
    }*/

    render() {
        const { chartOptions } = this.state;

        return (
            <div>
                <ChartProvider chart={chartOptions}/>
            </div>
        )
    }
}