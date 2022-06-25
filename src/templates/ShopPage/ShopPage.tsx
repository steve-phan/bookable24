import { graphql } from "gatsby"
import React, { useEffect, useState } from "react"
import axios from "axios"
import dayjs from "dayjs"
import Step from "@mui/material/Step"

import { useAppDispatch, useAppSelector } from "src/store/hooks"
import { getShopinfo } from "src/store/shop/shopSlice"
import Loading from "src/components/ContentComponents/Loading/Loading"
import Layout from "src/components/Layout/Layout"
import SEO from "src/components/seo"
import { useSteps } from "src/hooks/useSteps"

import {
  WrapTerminSt,
  WrapTerminContentSt,
  StepperSt,
  StepLabelSt,
} from "./ShopPage.css"
import { getStepContent, allSlots, getDefaultSlot } from "./utils"
import ShopLogo from "./ShopLogo/ShopLogo"
import { ButtonsCTA } from "./ButtonsCTA"
import ColorlibStepIcon from "./ColorlibStepIcon"

interface IShopPageProps {
  pageContext: {
    shopName: string
    shopEmail: string
    shopId: string
  }
  data: any // Do it later
  location?: Location
}

const ShopPage: React.FC<IShopPageProps> = ({
  pageContext,
  data,
  location,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [submitCustomerInfo, setSubmitCustomerInfo] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const dispatch = useAppDispatch()
  const {
    booking: {
      selectedDate,
      selectedSlot = getDefaultSlot(),
      firstName,
      lastName,
      email,
      phone,
      require,
      person,
      isValidInfo,
      isSubmitted,
    },
    shop: { shopInfo, status },
  } = useAppSelector(state => state)
  const steps = useSteps()

  const { slotTime } = shopInfo?.settings || {}
  const slotDisable = allSlots.findIndex(time => time === slotTime)
  const { shopName, shopEmail, shopId } = pageContext

  if (!shopId || !shopEmail || !shopName) {
    alert(
      "Etwas ist schief gelaufen, bitte versuchen Sie es später noch einmal"
    )
  }
  useEffect(() => {
    if (status !== "loading") {
      setIsLoading(false)
    }
  }, [status])

  const handleNext = () => {
    if (activeStep == 2) {
      if (isValidInfo) {
        return setSubmitCustomerInfo(true)
      } else {
        return
      }
    }
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  useEffect(() => {
    if (isSubmitted && activeStep === 2) {
      setActiveStep(prevActiveStep => prevActiveStep + 1)
    }
  }, [isSubmitted])
  console.log({ isSubmitted })
  useEffect(() => {
    dispatch(
      getShopinfo({
        shopId,
        shopEmail,
        isShopLogin: false,
        url: "/.netlify/functions/get-shopinfo",
      })
    )
    setIsLoading(false)
  }, [])

  const handleConfirmSubmit = () => {
    const dataBooking = {
      selectedDate,
      selectedSlot,
      firstName,
      lastName,
      email,
      phone,
      person,
      shopId,
    }
    if (
      Object.values(dataBooking).length !== 8 ||
      Object.values(shopInfo).length !== 11
    ) {
      alert("Something wrong, please try again")
    }
    setIsLoading(true)
    axios
      .post(
        "/.netlify/functions/confirm-termin",
        JSON.stringify({ ...dataBooking, require, shopInfo })
      )
      .then(res => {
        if (res.data === "EMAIL_SENT") {
          setIsLoading(false)
          handleNext()
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
        }
      })
      .catch(err => {
        setIsLoading(false)
        alert("Something wrong, please try again")
        console.error(err)
      })
  }

  // const isNextButtonDisable = () => {
  //   return (
  //     (dayjs().hour() + 2 >= Number(allSlots[selectedSlot].split(":")[0]) &&
  //       dayjs().date() === dayjs(selectedDate).date() &&
  //       activeStep !== 0) ||
  //     (slotDisable >= 0 && activeStep !== 0 && selectedSlot >= slotDisable) ||
  //     false
  //   )
  // }
  if (!shopEmail) return null
  return (
    <Layout isShop={true} location={location}>
      <>
        <SEO title={`${shopName} || Online Booking System`} />
        <WrapTerminSt>
          <ShopLogo shopInfoContenful={data.contentfulShopInfo} />
          <WrapTerminContentSt>
            {isLoading && <Loading />}
            <>
              {activeStep !== 4 && (
                <StepperSt activeStep={activeStep}>
                  {steps.map((label, index) => (
                    <Step
                      key={`${label}${index}`}
                      style={{ padding: 0, width: "33.3333%" }}
                    >
                      <StepLabelSt StepIconComponent={ColorlibStepIcon}>
                        {label}
                      </StepLabelSt>
                    </Step>
                  ))}
                </StepperSt>
              )}
              <>
                {getStepContent(
                  activeStep,
                  handleNext,
                  submitCustomerInfo,
                  setSubmitCustomerInfo
                )}
                {activeStep !== 4 && (
                  <ButtonsCTA
                    activeStep={activeStep}
                    isValidInfo={isValidInfo}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    // isNextButtonDisable={isNextButtonDisable}
                    handleConfirmSubmit={handleConfirmSubmit}
                  />
                )}
              </>
            </>
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
