import React from "react";
import Chart from "react-apexcharts";
import { useState, useEffect } from "react";

const BillableChart = (props) => {
  const [chartOptions, setChartOptions] = useState({
    options: {
      chart: {
        foreColor: "black",
        toolbar: {
          show: false,
        },
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
        title: {
          text: "Month",
          style: {
            fontWeight: "500",
            fontFamily: "Open Sans sans-serif !important",
          },
        },
      },
      yaxis: {
        title: {
          text: "(In Dollars)",
          style: {
            fontWeight: "500",
            fontFamily: "Open Sans sans-serif !important",
          },
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
          fontWeight: "500",
          fontFamily: "Open Sans sans-serif !important",
        },
      },
    },
    series: [
      {
        name: "Spent",
        data: [
          3323, 4443, 7854, 15022, 19204, 21506, 3323, 4443, 7854, 15022, 19204,
          21503,
        ],
      },
    ],
    stroke: {
      curve: "smooth",
    },
  });

  useEffect(() => {
    setChartOptions((c) => {
      return {
        ...c,
        series: [
          {
            name: "Hours",
            data: props.hrs,
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
      type="line"
      height="325"
      width="100%"
    />
  );
};

export default BillableChart;
