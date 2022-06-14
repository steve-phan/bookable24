import { graphql } from "gatsby"
import React, { useEffect, useState } from "react"
import axios from "axios"
import dayjs from "dayjs"

import { useAppDispatch, useAppSelector } from "src/store/hooks"
import { getShopinfo } from "src/store/shop/shopSlice"
import Loading from "src/components/ContentComponents/Loading/Loading"
import Layout from "src/components/Layout/Layout"
import SEO from "src/components/seo"
import { useSteps } from "src/hooks/useSteps"

import { WrapTerminSt, WrapTerminContentSt, StepperSt } from "./ShopPage.css"
import { getStepContent, allSlots, getDefaultSlot, Stepper } from "./utils"
import ShopLogo from "./ShopLogo/ShopLogo"
import CancelBooking from "./CancelBooking/CancelBooking"
import { ButtonsCTA } from "./ButtonsCTA"

interface IShopPageProps {
  pageContext: {
    shopName: string
    shopEmail: string
    shopId: string
  }
  data: any // Do it later
  location?: any
}

const ShopPage: React.FC<IShopPageProps> = ({
  pageContext,
  data,
  location,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [showCancelBooking, setShowCancelBooking] = useState<boolean>(true)
  const [booking, setBooking] = useState<any>()

  const [activeStep, setActiveStep] = useState(0)
  const dispatch = useAppDispatch()
  const {
    booking: {
      selectedDate,
      selectedSlot = getDefaultSlot(),
      guestInfo,
      numberOfGuest,
      isValidInfo,
    },
    shop: { shopInfo, status },
  } = useAppSelector(state => state)
  const steps = useSteps()

  const { slotTime } = shopInfo?.settings || {}
  const slotDisable = allSlots.findIndex(time => time === slotTime)
  const { shopName, shopEmail, shopId } = pageContext

  useEffect(() => {
    if (status !== "loading" && !showCancelBooking) {
      setIsLoading(false)
    }
  }, [status])

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  useEffect(() => {
    if (location.search.includes("?bookingId=")) {
      const bookingId = location.search.replace("?", "").split("=")[1]
      setShowCancelBooking(true)
      axios
        .post(
          "/.netlify/functions/cancel-termin",
          JSON.stringify({ bookingId, shopId, shopInfo })
        )
        .then(res => {
          setIsLoading(false)
          setBooking(res.data)
        })
        .catch(err => console.log("err", err))
    } else {
      dispatch(
        getShopinfo({
          shopId: shopId,
          shopemail: shopEmail,
          isShopLogin: false,
        })
      )
      setIsLoading(false)
      setShowCancelBooking(false)
    }
  }, [])

  const handleConfirmSubmit = () => {
    const dataBooking = {
      selectedDate,
      selectedSlot,
      userinfo: { ...guestInfo },
      person: numberOfGuest,
      require: guestInfo.require,
      shopInfo,
    }
    setIsLoading(true)
    axios
      .post("/.netlify/functions/confirm-termin", JSON.stringify(dataBooking))
      .then(res => {
        if (res.data === "EMAIL_SENT") {
          const { firstName, lastName, email, phone } = guestInfo
          axios.post(
            "/.netlify/functions/add-restaurant-customer",
            JSON.stringify({
              firstName,
              lastName,
              email,
              phone,
              shopId,
            })
          )
          setIsLoading(false)
          handleNext()
        }
      })
      .catch(err => {
        setIsLoading(false)
        alert("Something wrong, please try again")
        console.error(err)
      })
  }

  const isNextButtonDisable = () => {
    return (
      (dayjs().hour() + 2 >= Number(allSlots[selectedSlot].split(":")[0]) &&
        dayjs().date() === dayjs(selectedDate).date() &&
        activeStep !== 0) ||
      (slotDisable >= 0 && activeStep !== 0 && selectedSlot >= slotDisable) ||
      false
    )
  }
  if (!shopEmail) return null
  return (
    <Layout isShop={true} location={location}>
      <>
        <SEO title={`${shopName} || Online Booking System`} />
        <WrapTerminSt>
          <ShopLogo shopinfo={data.contentfulShopInfo} />
          <WrapTerminContentSt>
            {isLoading && <Loading />}
            {showCancelBooking ? (
              booking?.email && (
                <CancelBooking
                  booking={booking}
                  shopId={shopId}
                  location={location}
                  shopInfo={data.contentfulShopInfo}
                />
              )
            ) : (
              <>
                {activeStep !== 4 && (
                  <StepperSt activeStep={activeStep}>
                    {steps.map((label, index) => (
                      <Stepper key={label + index} label={label} />
                    ))}
                  </StepperSt>
                )}
                <>
                  {getStepContent(activeStep)}
                  {activeStep !== 4 && (
                    <ButtonsCTA
                      activeStep={activeStep}
                      isValidInfo={isValidInfo}
                      handleBack={handleBack}
                      handleNext={handleNext}
                      isNextButtonDisable={isNextButtonDisable}
                      handleConfirmSubmit={handleConfirmSubmit}
                    />
                  )}
                </>
              </>
            )}
          </WrapTerminContentSt>
        </WrapTerminSt>
      </>
    </Layout>
  )
}

export default ShopPage

export const query = graphql`
  query ($language: String!, $shopId: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    contentfulShopInfo(shopId: { eq: $shopId }) {
      email
      shopName
      shopId
      phone
      address
      logo {
        gatsbyImageData(width: 100, cornerRadius: 3)
      }
    }
  }
`
