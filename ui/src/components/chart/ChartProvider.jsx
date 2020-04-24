import {Component} from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import React from "react";

export default class ChartProvider extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {chart} = this.props;

        return (
            <div>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={chart}
                    ref={"chart"}
                />
            </div>
        )
    }
}