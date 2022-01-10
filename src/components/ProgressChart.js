import React from "react";
import { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const ProgressChart = (props) => {
  const [chartOptions, setChartOptions] = useState({
    options: {
      chart: {
        foreColor: "black",
      },
      xaxis: {
        categories: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
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
  });

  useEffect(() => {
    setChartOptions((c) => {
      return {
        ...c,
        series: [
          {
            name: "Population",
            data: props.task,
          },
        ],
      };
    });
  }, [props]);
  return (
    <Chart
      style={{ marginTop: 10 }}
      options={chartOptions.options}
      series={chartOptions.series}
      type="bar"
      height="320"
      width="100%"
    />
  );
};

export default ProgressChart;
