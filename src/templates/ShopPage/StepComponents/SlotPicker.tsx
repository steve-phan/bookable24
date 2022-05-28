import dayjs from "dayjs"
import { useTranslation } from "gatsby-plugin-react-i18next"
import React, { useEffect, useState } from "react"

import { useAppDispatch, useAppSelector } from "src/store/hooks"
import { setSelectedSlot } from "src/store/shop/bookingSlice"
import { getDateBookings } from "src/utils"
import { ITermin } from "src/components/DashBoard/SharedComponent/DashBoard.types"

import {
  afternoonSlots,
  morningSlots,
  getDefaultSlot,
  allSlots,
  isSameDay,
  currentHour,
} from "../utils"
import {
  ButtonGroupSt,
  ButtonSlotSt,
  TitleBannerSt,
} from "./StepComponents.css"
import { WrapColSt } from "../ShopPage.css"

const isWeekend = (date: Date | null) =>
  dayjs(date).day() === 6 || dayjs(date).day() === 0

const reduceTermins = (arr: ITermin[]) =>
  arr.reduce((acc: any, cur: any) => {
    if (acc.hasOwnProperty(cur.selectedSlot)) {
      return {
        ...acc,
        [cur.selectedSlot]: acc[cur.selectedSlot] + 1,
      }
    } else {
      return {
        ...acc,
        [cur.selectedSlot]: 1,
      }
    }
  }, {})

const SlotPicker = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { selectedSlot = getDefaultSlot(), selectedDate } = useAppSelector(
    state => state.booking
  )
  const { shopInfo, allTermins } = useAppSelector(state => state.shop)

  const pickedDayTermins = getDateBookings(allTermins, selectedDate)

  const {
    weekdays,
    time,
    slotTime,
    terminBefore = 2,
    maxTerminPerSlot = 2,
  } = shopInfo?.settings || {}
  const dayDisable = weekdays?.includes(dayjs(selectedDate).day())
  //This is the currentDay in list to custom disable
  // && isSameDay(selectedDate)

  useEffect(() => {
    // Need dispatch selectedSlot, otherwise it'll be undefine as a intialState
    dispatch(setSelectedSlot(getDefaultSlot()))
  }, [])
  const slotDisableMorning = morningSlots.findIndex(
    morningSlot => morningSlot === slotTime
  )
  const slotDisableAfternoon = afternoonSlots.findIndex(
    afternoonSlot => afternoonSlot === slotTime
  )
  return (
    <WrapColSt>
      <TitleBannerSt>
        <h5>{t("booking.slot.lunch")}</h5>
      </TitleBannerSt>
      <ButtonGroupSt>
        {morningSlots.map((slot, index) => {
          return (
            <ButtonSlotSt
              $slotactive={selectedSlot === index ? true : undefined}
              key={index + slot}
              onClick={() => {
                dispatch(setSelectedSlot(index))
              }}
              disabled={
                (dayjs().hour() + terminBefore >= Number(slot.split(":")[0]) &&
                  isSameDay(selectedDate)) ||
                (slotDisableMorning >= 0 && index >= slotDisableMorning)
              }
            >
              {slot}
            </ButtonSlotSt>
          )
        })}
      </ButtonGroupSt>
      <TitleBannerSt>
        <h5>{t("booking.slot.dinner")}</h5>
        {selectedDate && isWeekend(selectedDate) ? (
          <span>{t("booking.slot.warning")}</span>
        ) : null}
      </TitleBannerSt>
      <ButtonGroupSt>
        {afternoonSlots.map((slot, index: number) => {
          const newIndex = morningSlots?.length + index
          return (
            <ButtonSlotSt
              $slotactive={selectedSlot === newIndex ? true : undefined}
              disabled={
                (dayDisable &&
                  Number(slot.split(":")[0]) >= Number(time?.split(":")[0])) ||
                (currentHour + terminBefore >= Number(slot.split(":")[0]) &&
                  isSameDay(selectedDate)) ||
                reduceTermins(pickedDayTermins)[String(newIndex)] >=
                  maxTerminPerSlot ||
                (dayDisable &&
                  currentHour >= Number(slotTime?.split(":")[0])) ||
                (slotDisableAfternoon >= 0 && index >= slotDisableAfternoon)
              }
              key={newIndex + slot}
              onClick={() => {
                dispatch(setSelectedSlot(newIndex))
              }}
            >
              {reduceTermins(pickedDayTermins)[String(newIndex)] >=
              maxTerminPerSlot
                ? "full"
                : slot}
            </ButtonSlotSt>
          )
        })}
      </ButtonGroupSt>
    </WrapColSt>
  )
}

export default SlotPicker
