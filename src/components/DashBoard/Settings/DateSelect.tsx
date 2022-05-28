import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import React from "react"

import { useAppDispatch } from "src/store/hooks"
import { setSetingsClosedRegularDay } from "src/store/shop/shopSlice"

interface DateSelectProps {
  slotDate: string[]
  closedRegularDay: string
}

const DateSelect = ({
  slotDate,
  closedRegularDay = "none",
}: DateSelectProps) => {
  const dispatch = useAppDispatch()
  const menuItems = () =>
    slotDate.map((h, i) => (
      <MenuItem key={Math.random() + i + Math.random()} value={h}>
        {h}
      </MenuItem>
    ))
  return (
    <FormControl
      variant="standard"
      sx={{ minWidth: 80, maxWidth: 220 }}
      fullWidth
    >
      <InputLabel id="select-guest-number-label">Closed day</InputLabel>
      <Select
        labelId="select-guest-number-label"
        value={closedRegularDay}
        label="Personen"
        placeholder="hallo"
        onChange={(event: SelectChangeEvent) => {
          dispatch(setSetingsClosedRegularDay(event.target.value as string))
        }}
      >
        {menuItems()}
      </Select>
    </FormControl>
  )
}
export default DateSelect
