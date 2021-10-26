import React from "react"
import { Card, CardHeader, Grid } from "@mui/material"
import { timeAgo } from "src/utils"
import moment from "moment"

import { useAppDispatch, useAppSelector } from "src/store/hooks"
import { getShopinfo } from "src/store/shop/shopSlice"

import TotalCustomer from "./Chart/TotalCustomer"
import TotalOders from "./Chart/TotalOder"

const HomeDashBoard = () => {
  const dispatch = useAppDispatch()
  const { shopInfo, allTermins } = useAppSelector(state => state.shop)

  console.log("allTermins", allTermins)
  return (
    <div>
      <Card>
        <CardHeader plain color="primary"></CardHeader>
        <Grid>
          <Grid sm={12} md={6}>
            <TotalCustomer allTermins={allTermins} />
          </Grid>
          <Grid
            sm={12}
            md={6}
            style={{
              // width: 400,
              // height: 400,
              // padding: '16px',
              position: "relative",
              // display: 'flex',

              margin: "0 auto",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TotalOders allTermins={allTermins} />
          </Grid>
        </Grid>
      </Card>
    </div>
  )
}

export default HomeDashBoard
