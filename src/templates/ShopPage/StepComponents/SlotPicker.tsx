import dayjs from "dayjs"
import { useTranslation } from "gatsby-plugin-react-i18next"
import React, { useEffect, useState } from "react"

import { useAppDispatch, useAppSelector } from "src/store/hooks"
import { setSelectedSlot } from "src/store/shop/bookingSlice"

import { afternoonSlots, morningSlots, getDefaultSlot } from "../utils"
import {
  ButtonGroupSt,
  ButtonSlotSt,
  TitleBannerSt,
} from "./StepComponents.css"
import { WrapColSt } from "../ShopPage.css"

const isWeekend = (date: Date | null) =>
  dayjs(date).day() === 6 || dayjs(date).day() === 0

const SlotPicker = () => {
  const [loading, setLoading] = useState(true)
  const [terminsBooked, setTerminsBooked] = useState([])
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { selectedSlot = getDefaultSlot(), selectedDate } = useAppSelector(
    state => state.booking
  )

  useEffect(() => {
    // Need dispatch selectedSlot, otherwise it'll be udnefine as a intialState
    dispatch(setSelectedSlot(getDefaultSlot()))
  }, [])

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
                dayjs().hour() + 2 >= Number(slot.split(":")[0]) &&
                dayjs().day() === dayjs(selectedDate).day()
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
                dayjs().hour() + 2 >= Number(slot.split(":")[0]) &&
                dayjs().day() === dayjs(selectedDate).day()
              }
              // $slotwarning={
              //   [13, 14, 15, 16, 17, 18, 19].includes(newIndex) &&
              //   isWeekend(selectedDate)
              // }
              key={newIndex + slot}
              onClick={() => {
                dispatch(setSelectedSlot(newIndex))
              }}
            >
              {/* {[13, 14, 15, 16, 17, 18, 19].includes(newIndex) &&
              terminsBooked[String(newIndex)] >= 2
                ? "full"
                : slot} */}
              {slot}
            </ButtonSlotSt>
          )
        })}
      </ButtonGroupSt>
    </WrapColSt>
  )
}

export default SlotPicker
