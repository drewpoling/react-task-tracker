import React, { Component } from "react";
import Chart from "react-apexcharts";

class BillableChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        chart: {
          foreColor: "black",
        },
        xaxis: {
          categories: ["January", "February", "March", "April", "May", "June"],
          title: {
            text: "Month",
          },
        },
        yaxis: {
          title: {
            text: "(In Dollars)",
          },
        },

        colors: ["dodgerblue"],
        markers: {
          size: 6,
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: 2,
        },

        title: {
          text: "Billable Time Spent",
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
          name: "Spent",
          data: [3323, 4443, 7854, 15022, 19204, 21506],
        },
      ],
      stroke: {
        curve: "smooth",
      },
    };
  }

  render() {
    return (
      <Chart
        style={{ marginTop: 10 }}
        options={this.state.options}
        series={this.state.series}
        type="line"
        height="300"
        width="100%"
      />
    );
  }
}

export default BillableChart;
