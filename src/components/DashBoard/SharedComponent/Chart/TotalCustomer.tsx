import * as React from "react"
import { Pie } from "react-chartjs-2/"

import { useTheme } from "@mui/material/styles"
import { useTranslation } from "gatsby-plugin-react-i18next"

import { WrapChartSt, CircleSt, NumberSt, TypoTitleSt } from "./Chart.css"
import { IbookingState, ITermin } from "src/store/shop/shop.types"

const showData = (num: number, color: string) => ({
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

const TotalCustomer = ({ allTermins }: { allTermins: ITermin[] }) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const totalCustomers = allTermins.reduce(
    (acc, cur) => acc + Number(cur.person),
    0
  )
  return (
    <WrapChartSt>
      <TypoTitleSt variant="h5">
        {t("dashboard.dashboard.totalcustomers", "ToTal Customers")}
      </TypoTitleSt>
      <CircleSt>
        <NumberSt>{totalCustomers}</NumberSt>
        <Pie data={showData(totalCustomers, theme?.color?.primary)} />
      </CircleSt>
    </WrapChartSt>
  )
}

export default TotalCustomer
