import React, { useRef, useState, useEffect } from "react"
import * as Chartjs from "chart.js"
import { Doughnut, Pie } from "react-chartjs-2"
import { Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles"

import { CircleSt, NumberSt } from "./Chart.css"

const showData = (num: number, color: string) => ({
  //   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: "# of Votes",
      data: [num],
      backgroundColor: color,
      borderColor: color,
      borderWidth: 0,
    },
  ],
})

const TotalCustomer = ({ allTermins }: { allTermins: any[] }) => {
  const theme = useTheme()
  //   const chartContainer = useRef(null);
  //   const [chartInstance, setChartInstance] = useState(null);

  //   useEffect(() => {
  //     if (chartContainer && chartContainer.current) {
  //       const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
  //       setChartInstance(newChartInstance);
  //     }
  //   }, [chartContainer]);
  const totalCustomers = allTermins.reduce((acc, cur) => acc + cur.person, 0)
  console.log("totalcutomer  ", allTermins)
  return (
    <div>
      <Typography variant="h5">Tổng số khách hàng của quán:</Typography>
      <CircleSt>
        <NumberSt>{totalCustomers}</NumberSt>
        <Pie data={showData(totalCustomers, theme.color.primary)} />
      </CircleSt>
    </div>
  )
}

export default TotalCustomer
