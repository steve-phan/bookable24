import React from "react"
import * as Chartjs from "chart.js"
import { Doughnut, Pie } from "react-chartjs-2"

import { useTheme } from "@mui/material/styles"
import { useTranslation } from "gatsby-plugin-react-i18next"

import { CircleSt, NumberSt, TypoTitleSt } from "./Chart.css"

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
  const { t } = useTranslation()

  //   const chartContainer = useRef(null);
  //   const [chartInstance, setChartInstance] = useState(null);

  //   useEffect(() => {
  //     if (chartContainer && chartContainer.current) {
  //       const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
  //       setChartInstance(newChartInstance);
  //     }
  //   }, [chartContainer]);
  const totalCustomers = allTermins.reduce((acc, cur) => acc + cur.person, 0)
  return (
    <>
      <TypoTitleSt variant="h5">
        {t("dashboard.dashboard.totalcustomers", "ToTal Customers")}
      </TypoTitleSt>
      <CircleSt>
        <NumberSt>{totalCustomers}</NumberSt>
        <Pie data={showData(totalCustomers, theme.color.primary)} />
      </CircleSt>
    </>
  )
}

export default TotalCustomer
