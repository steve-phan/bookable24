import * as React from "react"
import { useAppSelector } from "src/store/hooks"

import { TextField } from "@mui/material"
import {
  WrapColSt,
  WrapSearchSt,
  WrapSearchIcon,
} from "./SearchCustomer.styles"
import { makeStyles } from "@mui/styles"
import { async } from "@firebase/util"
import axios from "axios"
import { ICustomer } from "src/store/shop/shop.types"
import ShowCustomers from "./ShowCustomers"

const useStyles = makeStyles(theme => ({
  searchBarStyle: {
    height: "40px",
    width: "200px",
    margin: "0 0 0 0",
    float: "right",
    marginRight: "12px",
    flex: 1,
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
  const [searchTerm, setSearchTerm] = React.useState("")
  const [foundCustomers, setFoundCustomers] = React.useState<ICustomer[]>([])
  const submitSearch = async () => {
    if (!searchTerm.trim()) {
      return
    }
    try {
      const response = await axios.post(
        "/.netlify/functions/search-customer",
        JSON.stringify({
          searchTerm,
          shopId,
        })
      )
      const { customers } = response?.data as { customers: ICustomer[] }
      setFoundCustomers(customers)
      console.log({ response })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <WrapColSt>
      <WrapSearchSt>
        <TextField
          value={searchTerm}
          className={classes.searchBarStyle}
          size="small"
          placeholder="Enter customer phone or email or name"
          onChange={e => {
            setSearchTerm(e.target.value)
          }}
          onKeyPress={e => {
            if (e.key == "Enter") {
              submitSearch()
            }
          }}
        />
        <WrapSearchIcon
          fontSize="large"
          onClick={e => {
            console.log("clicking ...")
            submitSearch()
          }}
        />
      </WrapSearchSt>
      <ShowCustomers customers={foundCustomers} />
    </WrapColSt>
  )
}

export default SearchCustomer
