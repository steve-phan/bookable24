import Grid from "@mui/material/Grid"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import React, { useState } from "react"
import { useAppDispatch, useAppSelector } from "src/store/hooks"
import { setNumberOfGuest } from "src/store/shop/bookingSlice"
import { allSlots } from "src/templates/ShopPage/utils"

import { WrapDaySt, WrapHourSt, DaySt } from "./Settings.css"

const label = { inputProps: { "aria-label": "Checkbox demo" } }

const week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]
const updateList = (arr: number[], i: number) => {
  const newArr = arr.filter(num => num !== i)
  return newArr
}

const SettingsDashBoard = () => {
  const [check, setCheck] = useState(false)
  const [list, setList] = useState<number[]>([])
  const dispatch = useAppDispatch()
  const { weekdays, time } = useAppSelector(state => state?.shop?.settings)

  const HourSelect = () => {
    const menuItems = () =>
      allSlots.map((h, i) => (
        <MenuItem key={Math.random() + i + Math.random()} value={h}>
          {h}
        </MenuItem>
      ))
    return (
      <FormControl variant="standard" sx={{ minWidth: 80 }} fullWidth>
        <InputLabel id="select-guest-number-label">Hours</InputLabel>
        <Select
          style={{ paddingLeft: 16 }}
          labelId="select-guest-number-label"
          value={time}
          label="Personen"
          onChange={(event: SelectChangeEvent) => {
            // dispatch(setNumberOfGuest(Number(event.target.value as string)))
          }}
        >
          {menuItems()}
        </Select>
      </FormControl>
    )
  }

  return (
    <div>
      <h3>Setting Disable</h3>
      <Grid container>
        <Grid item xs={12} md={4}>
          <WrapHourSt>
            <p>Select the time start disable</p>
            <HourSelect />
          </WrapHourSt>
        </Grid>
        <Grid item xs={12} md={8}>
          <WrapDaySt>
            {week.map((day, index) => {
              return (
                <DaySt key={day + index}>
                  <Checkbox
                    id={day + index}
                    {...label}
                    value={index}
                    onChange={() => {
                      list.includes(index)
                        ? setList(updateList(list, index))
                        : setList([...list, index])
                    }}
                    checked={list.includes(index)}
                  />
                  <label style={{ cursor: "pointer" }} htmlFor={day + index}>
                    {day}
                  </label>
                </DaySt>
              )
            })}
          </WrapDaySt>
        </Grid>
      </Grid>
      <button>Update Settings</button>
    </div>
  )
}

export default SettingsDashBoard
