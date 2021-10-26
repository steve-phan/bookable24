import moment from "moment"
import { Link, useTranslation } from "gatsby-plugin-react-i18next"

import React, { useState } from "react"
import { useAppDispatch, useAppSelector } from "src/store/hooks"
import { setSelectedSlot } from "src/store/shop/bookingSlice"
import { afternoonSlots, morningSlots } from "../utils"
import {
  ButtonGroupSt,
  ButtonSlotSt,
  TitleBannerSt,
} from "./StepComponents.css"
import { WrapColSt } from "../ShopPage.css"

const isWeekend = (date: Date | null) =>
  moment(date).day() === 6 || moment(date).day() === 0

const SlotPicker = () => {
  const [loading, setLoading] = useState(true)
  const [terminsBooked, setTerminsBooked] = useState([])
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { selectedSlot, selectedDate } = useAppSelector(state => state.booking)
  // useEffect(() => {
  //   if (isWeekend(selectedDate)) {
  //     const formatDate = moment(
  //       selectedDate,
  //       selectedDate.length === 10 ? "DD-MM-YYYY" : "YYYY MM DD"
  //     ).format("MMM DD")
  //     console.log("formatDate", formatDate)
  //     axios
  //       .post("/.netlify/functions/get-termin-weekend", {
  //         selectedDate: formatDate,
  //       })
  //       .then(data => {
  //         setTerminsBooked(reduceTermins(data.data))
  //         setLoading(false)
  //       })
  //       .catch(err => {
  //         setLoading(false)
  //       })
  //     // console.log('Selecdate', selectedDate);
  //   } else {
  //     setLoading(false)
  //   }
  // }, [])
  // console.log("selectedSlot", selectedSlot)
  return (
    <WrapColSt>
      {/* {loading && <Loading />} */}
      <TitleBannerSt>
        <h5>{t("booking.slot.lunch")}</h5>
      </TitleBannerSt>
      <ButtonGroupSt>
        {morningSlots.map((slot, index) => {
          return (
            <ButtonSlotSt
              slotactive={selectedSlot === index ? true : undefined}
              key={index + slot}
              onClick={() => {
                dispatch(setSelectedSlot(index))
              }}
            >
              {" "}
              {slot}{" "}
            </ButtonSlotSt>
          )
        })}
      </ButtonGroupSt>
      <TitleBannerSt>
        <h5>{t("booking.slot.dinner")}</h5>
        {selectedDate && isWeekend(selectedDate) ? (
          <span>
            {t("booking.slot.warning")} <strong></strong>
          </span>
        ) : null}
      </TitleBannerSt>
      <ButtonGroupSt>
        {afternoonSlots.map((slot, index: number) => {
          const newIndex = morningSlots?.length + index
          return (
            <ButtonSlotSt
              slotactive={selectedSlot === newIndex ? true : undefined}
              // disabled={
              //   [13, 14, 15, 16, 17, 18, 19].includes(newIndex) &&
              //   terminsBooked[String(newIndex)] >= 2
              // }
              slotwarning={
                [13, 14, 15, 16, 17, 18, 19].includes(newIndex) &&
                isWeekend(selectedDate)
              }
              key={newIndex + slot}
              onClick={() => {
                dispatch(setSelectedSlot(newIndex))
              }}
            >
              {" "}
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
