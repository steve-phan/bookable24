import React, { useRef, useState, useEffect } from "react"
import * as Chartjs from "chart.js"
import { Doughnut, Pie } from "react-chartjs-2"
import { Typography } from "@mui/material"

const data = {
  //   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: "# of Votes",
      data: [12],
      backgroundColor: ["rgba(54, 162, 235, 0.7)"],
      borderColor: ["rgba(54, 162, 235, 0.7)"],
      borderWidth: 0,
    },
  ],
}

const TotalCustomer = ({ allTermins }: { allTermins: any[] }) => {
  //   const chartContainer = useRef(null);
  //   const [chartInstance, setChartInstance] = useState(null);

  //   useEffect(() => {
  //     if (chartContainer && chartContainer.current) {
  //       const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
  //       setChartInstance(newChartInstance);
  //     }
  //   }, [chartContainer]);
  // const totalCustomers = allTermins.reduce((acc, cur) => acc + cur.person, 0)
  console.log("totalcutomer  ", allTermins)
  return (
    <div>
      <Typography
        variant="h5"
        style={{
          marginTop: "30px",
          marginBottom: "20px",
          textAlign: "center",
          width: "100%",
        }}
      >
        Tổng số khách hàng của quán:
      </Typography>
      <div
        style={{
          maxWidth: 300,
          maxHeight: 300,
          padding: "16px",
          position: "relative",
          display: "flex",
          // flexDirection: 'column',
          margin: "0 auto",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <h4 className="total-customers">{totalCustomers}</h4> */}
        <Pie data={data} />
      </div>
    </div>
  )
}

export default TotalCustomer
