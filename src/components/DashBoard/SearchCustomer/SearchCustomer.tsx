import * as React from "react"
import { useAppSelector } from "src/store/hooks"

import { TextField } from "@mui/material"
import { WrapColSt, WrapRowSt, WrapSearchIcon } from "./SearchCustomer.styles"
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles(theme => ({
  searchBarStyle: {
    height: "40px",
    width: "200px",
    margin: "0 0 0 0",
    float: "right",
    marginRight: "12px",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: "20px",
        borderColor: "#141414",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#C52328",
        borderWidth: "2px",
      },
    },
  },
}))
const SearchCustomer = () => {
  const { shopName: shopId } = useAppSelector(state => state.shop.shopInfo)

  console.log({ shopInfo: shopId })
  const classes = useStyles()
  return (
    <WrapColSt>
      <WrapRowSt>
        <TextField
          className={classes.searchBarStyle}
          size="small"
          placeholder="Enter customer phone or email or name"
        />
        <WrapSearchIcon fontSize="large" />
      </WrapRowSt>
      <h1>Hello</h1>
    </WrapColSt>
  )
}

export default SearchCustomer
