import * as React from "react"
import Box from "@mui/material/Box"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import { useTranslation } from "gatsby-plugin-react-i18next"

import { useAppDispatch, useAppSelector } from "src/store/hooks"
import { setNumberOfCustomer } from "src/store/shop/bookingSlice"

const PersonPicker = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { person } = useAppSelector(state => state.booking)

  const menuItems = () =>
    [...Array(10)].map((_, i) => (
      <MenuItem key={Math.random() + i + Math.random()} value={i + 1}>
        {i + 1}
      </MenuItem>
    ))
  return (
    <Box>
      <FormControl variant="standard" sx={{ minWidth: 120 }} fullWidth>
        <InputLabel id="select-guest-number-label">
          {t("booking.datepicker.person")}
        </InputLabel>
        <Select
          style={{ paddingLeft: 16 }}
          labelId="select-guest-number-label"
          value={`${person}`}
          label={t("booking.datepicker.person")}
          onChange={(event: SelectChangeEvent) => {
            dispatch(setNumberOfCustomer(Number(event.target.value)))
          }}
        >
          {menuItems()}
        </Select>
      </FormControl>
    </Box>
  )
}
export default PersonPicker
