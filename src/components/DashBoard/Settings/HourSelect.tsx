import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import React from "react"

import { useAppDispatch } from "src/store/hooks"
import {
  setSettingDisableTime,
  setSettingsDisableSlot,
} from "src/store/shop/shopSlice"
import { allSlots } from "src/templates/ShopPage/utils"

interface HourSelectProps {
  time?: string
  slotTime?: string
}

const HourSelect = ({ time, slotTime }: HourSelectProps) => {
  const dispatch = useAppDispatch()
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
        labelId="select-guest-number-label"
        value={time || slotTime}
        label="Personen"
        onChange={(event: SelectChangeEvent) => {
          if (time) {
            dispatch(setSettingDisableTime(event.target.value))
          } else if (slotTime) {
            dispatch(setSettingsDisableSlot(event.target.value))
          } else {
            return null
          }
        }}
      >
        {menuItems()}
      </Select>
    </FormControl>
  )
}
export default HourSelect
