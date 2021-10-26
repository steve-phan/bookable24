import React from "react"
import { Bar } from "react-chartjs-2"
import { Typography } from "@mui/material"
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]
const getData = (data: any) => ({
  labels: months,
  datasets: [
    {
      label: " Số termin",
      data,
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(221, 190, 169, 0.2)",
        "rgba(107, 112, 92, 0.2)",
        "rgba(203, 153, 126, 0.2)",
        "rgba(183, 183, 164, 0.2)",
        "rgba(247, 127, 0, 0.2)",
        "rgba(252, 191, 73, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(221, 190, 169, 1)",
        "rgba(107, 112, 92, 1)",
        "rgba(203, 153, 126, 1)",
        "rgba(183, 183, 164, 1)",
        "rgba(247, 127, 0, 1)",
        "rgba(252, 191, 73, 1)",
      ],
      borderWidth: 1,
    },
  ],
})

const options = {
  indexAxis: "x",
  // Elements options apply to all of the options unless overridden in a dataset
  // In this case, we are setting the border of each horizontal bar to be 2px wide
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    // legend: {
    //   position: 'right',
    // },
    // title: {
    //   display: true,
    //   text: 'Chart.js Horizontal Bar Chart',
    // },
  },
}

const TotalOders = ({ allTermins }: { allTermins: any[] }) => {
  return <h1>Total Oder</h1>
}

export default TotalOders
