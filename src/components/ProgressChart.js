import React, { Component } from "react";
import Chart from "react-apexcharts";

class ProgressChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        chart: {
          foreColor: "black",
        },
        xaxis: {
          categories: ["January", "February", "March", "April", "May", "June"],
        },
        fill: {
          colors: ["dodgerblue"],
        },
        dataLabels: {
          enabled: false,
        },

        title: {
          text: "Tasks Finished",
          align: "center",
          margin: 20,
          offsetY: 20,
          style: {
            fontSize: "25px",
          },
        },
      },
      series: [
        {
          name: "Population",
          data: props.task,
        },
      ],
    };
  }

  render() {
    return (
      <Chart
        style={{ marginTop: 10 }}
        options={this.state.options}
        series={this.state.series}
        type="bar"
        height="320"
        width="100%"
      />
    );
  }
}

export default ProgressChart;
