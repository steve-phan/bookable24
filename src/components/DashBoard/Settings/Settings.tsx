import Checkbox from "@mui/material/Checkbox"
import Grid from "@mui/material/Grid"
import React, { useState } from "react"
import axios from "axios"
import TextField from "@mui/material/TextField"

import { useAppDispatch, useAppSelector } from "src/store/hooks"
import {
  setSetingsDisableDays,
  setSetingsMaxTerminPerSlot,
} from "src/store/shop/shopSlice"

import HourSelect from "./HourSelect"
import {
  DaySt,
  SubmitButtonSt,
  TitleSt,
  WrapDaySt,
  WrapHourSt,
  WrapHourSelectedSt,
} from "./Settings.css"
import { updateList } from "./utils"
import Loading from "src/components/ContentComponents/Loading/Loading"

const label = { inputProps: { "aria-label": "Checkbox demo" } }

const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri ", "Sat"]

const SettingsDashBoard = () => {
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useAppDispatch()
  const { shopInfo } = useAppSelector(state => state?.shop)
  const { shopName } = shopInfo
  const {
    weekdays = [],
    time = "12:30",
    slotTime = "22:00",
    maxTerminPerSlot = 2,
  } = shopInfo?.settings || {}

  const handleSubmitDisable = async () => {
    setIsLoading(true)
    const res = await axios.post(
      "/.netlify/functions/admin-setting-booking",
      JSON.stringify({
        shopName,
        weekdays,
        time,
        slotTime,
        maxTerminPerSlot,
      })
    )
    if (res.data === "EMAIL_SENT") {
      setIsLoading(false)
      alert("Setting successfully")
    }
  }
  return (
    <div>
      {isLoading && <Loading />}
      <TitleSt>Setting Time/Date avaiable</TitleSt>
      <Grid container>
        <Grid item xs={12}>
          <WrapHourSt>
            <p>
              <strong>(Apply to daily***)</strong> MAX termins / per SLOT:
            </p>
            <TextField
              id="standard-number"
              label="Number"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
              value={maxTerminPerSlot}
              onChange={event => {
                dispatch(setSetingsMaxTerminPerSlot(event.target.value))
              }}
            />
          </WrapHourSt>
        </Grid>
        <Grid item xs={12}>
          <WrapHourSt>
            <p>
              <strong>(Apply to daily***)</strong> Disable after:
            </p>
            <HourSelect slotTime={slotTime} />
          </WrapHourSt>
        </Grid>
        <Grid item xs={12}>
          <WrapDaySt>
            <Grid
              item
              xs={12}
              md={8}
              style={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {week.map((day, index) => {
                return (
                  <DaySt key={day + index}>
                    <Checkbox
                      id={day + index}
                      {...label}
                      value={index}
                      onChange={() => {
                        if (weekdays?.includes(index)) {
                          dispatch(
                            setSetingsDisableDays(updateList(weekdays, index))
                          )
                        } else {
                          dispatch(setSetingsDisableDays([...weekdays, index]))
                        }
                      }}
                      checked={weekdays?.includes(index)}
                    />
                    <label style={{ cursor: "pointer" }} htmlFor={day + index}>
                      {day}
                    </label>
                  </DaySt>
                )
              })}
            </Grid>
            <Grid item xs={12} md={4}>
              <WrapHourSelectedSt>
                <p>
                  <strong>(Apply with checked***)</strong> Disable after:{" "}
                </p>
                <br />

                <HourSelect time={time} />
              </WrapHourSelectedSt>
            </Grid>
          </WrapDaySt>
        </Grid>
      </Grid>
      <SubmitButtonSt onClick={handleSubmitDisable}>
        Update Settings
      </SubmitButtonSt>
    </div>
  )
}

export default SettingsDashBoard
