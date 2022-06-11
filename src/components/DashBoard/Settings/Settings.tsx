import Checkbox from "@mui/material/Checkbox"
import Grid from "@mui/material/Grid"
import React, { useState } from "react"
import axios from "axios"
import TextField from "@mui/material/TextField"

import { useAppDispatch, useAppSelector } from "src/store/hooks"
import Loading from "src/components/ContentComponents/Loading/Loading"
import {
  setSetingsRegularDays,
  setSetingsTerminBefore,
  setSetingsMaxTerminPerSlot,
} from "src/store/shop/shopSlice"

import {
  DaySt,
  SubmitButtonSt,
  TitleSt,
  WrapDaySt,
  WrapHourSt,
  WrapHourSelectedSt,
} from "./Settings.css"
import { updateList } from "./utils"
import HourSelect from "./HourSelect"
import DateSelect from "./DateSelect"
import DisabelDate from "./DisabelDate"
import { isSameDay } from "src/templates/ShopPage/utils"

const label = { inputProps: { "aria-label": "Checkbox demo" } }

const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri ", "Sat", "None"]

const SettingsDashBoard = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [disableDay, setDisableDay] = useState<Date>(new Date())
  const dispatch = useAppDispatch()
  const { shopInfo } = useAppSelector(state => state?.shop)
  const { shopName } = shopInfo
  const {
    weekdays = [],
    time = "12:30",
    closedRegularDay = "none",
    closedSpecificDay,
    slotTime = "22:00",
    terminBefore = 2,
    maxTerminPerSlot = 2,
  } = shopInfo?.settings || {}

  const handleSubmitDisable = async () => {
    setIsLoading(true)

    const res = await axios.post(
      "/.netlify/functions/admin-setting-booking",
      JSON.stringify({
        shopName,
        weekdays,
        closedRegularDay,
        closedSpecificDay: isSameDay(disableDay)
          ? closedSpecificDay
          : [...closedSpecificDay, disableDay],
        time,
        slotTime,
        maxTerminPerSlot,
      })
    )
    setIsLoading(false)
    if (res.data === "EMAIL_SENT") {
      alert("Setting successfully")
    } else {
      alert("Something gone wrong.. try again")
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
              id="standard-termin"
              label="Termins"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
              value={maxTerminPerSlot || 8}
              onChange={event => {
                dispatch(setSetingsMaxTerminPerSlot(event.target.value))
              }}
            />
          </WrapHourSt>
        </Grid>
        <Grid item xs={12}>
          <WrapHourSt>
            <p>
              <strong>(Apply to daily***)</strong> Acceptable termin before:
            </p>
            <TextField
              id="standard-hours"
              label="Hours"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
              value={terminBefore || 0}
              onChange={event => {
                dispatch(setSetingsTerminBefore(event.target.value))
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
                if (day === "None") {
                  return null
                }
                return (
                  <DaySt key={day + index}>
                    <Checkbox
                      id={day + index}
                      {...label}
                      value={index}
                      onChange={() => {
                        if (weekdays?.includes(index)) {
                          dispatch(
                            setSetingsRegularDays(updateList(weekdays, index))
                          )
                        } else {
                          dispatch(setSetingsRegularDays([...weekdays, index]))
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
        <Grid container>
          <Grid
            alignItems="center"
            display="flex"
            flexDirection="column"
            item
            xs={12}
            md={6}
          >
            <p>
              <strong>Close</strong> Regular WeekDay:
            </p>
            <DateSelect slotDate={week} closedRegularDay={closedRegularDay} />
          </Grid>
          <Grid
            alignItems="center"
            display="flex"
            flexDirection="column"
            item
            xs={12}
            md={6}
          >
            <p>
              <strong>Close </strong>a Specific day:
            </p>
            <DisabelDate
              disableDay={disableDay}
              setDisableDay={setDisableDay}
            />
          </Grid>
        </Grid>
      </Grid>
      <SubmitButtonSt onClick={handleSubmitDisable}>
        Update Settings
      </SubmitButtonSt>
    </div>
  )
}

export default SettingsDashBoard
