import { Container, Typography } from "@mui/material"
import Button from "@mui/material/Button"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import { makeStyles } from "@mui/styles"
import { graphql } from "gatsby"
import React, { useEffect, useState } from "react"
import axios from "axios"
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image"
import Loading from "../../components/Loading/Loading"

import Layout from "../../components/Layout/Layout"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { getShopinfo } from "../../store/shop/shopSlice"
import ColorlibStepIcon from "./ColorlibStepIcon"
import SEO from "../../components/seo"
// import Loading from '../components/Loading';
// import DatePicker from '../components/TerminSteps/DatePicker';
// import InfoUser from '../components/TerminSteps/InfoUser';
// import SlotPicker from '../components/TerminSteps/SlotPicker';
// import { TerminContext } from '../context/contextTermin';
// import { terminTypes } from '../context/contextTermin/terminTypes';
import {
  WrapTerminSt,
  StepperSt,
  StepLabelSt,
  WrapRowSt,
  ButtonSt,
} from "./ShopPage.css"
import { getStepContent } from "./utils"
import ShopLogo from "./ShopLogo/ShopLogo"
interface IShopPageProps {
  pageContext: {
    shopName: string
    shopEmail: string
  }
  data: any // Do it later
}

const useStyles = makeStyles(theme => ({
  stepLabel: {
    flexDirection: "column",
    textAlign: "center",
    // width: '33.3%',
    "& span": {
      paddingTop: 2,
      paddingRight: 0,
      fontSize: 12,
    },
  },

  instructions: {
    // marginTop: theme.spacing(1),
    // marginBottom: theme.spacing(1),
  },

  shopName: {
    fontSize: 32,
  },
}))

function getSteps() {
  return [
    "Personen und Datum",
    "Wähle unten eine Zeit aus",
    "Name und Kontaktdaten",
  ]
}

const ShopPage: React.FC<IShopPageProps> = ({ pageContext, data }) => {
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0)
  const dispatch = useAppDispatch()
  const {
    booking: {
      selectedDate,
      selectedSlot,
      guestInfo,
      numberOfGuest,
      isValidInfo,
    },
    shop: { shopInfo },
  } = useAppSelector(state => state)
  // const image = getImage(data.contentfulShopInfo.logo) as IGatsbyImageData

  // const { selectedDate, selectedSlot, guestInfo, numberOfGuest, isValidInfo } =
  //   booking
  // const { shopInfo } = shop

  const { shopName, shopEmail } = pageContext
  const steps = getSteps()

  useEffect(() => {
    dispatch(getShopinfo({ shopname: shopName, shopemail: shopEmail }))
  }, [])

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {}, [isLoading])

  const handleConfirmSubmit = () => {
    const dataBooking = {
      selectedDate,
      selectedSlot,
      userinfo: { ...guestInfo },
      person: numberOfGuest,
      require: guestInfo.require,
      shopinfo: shopInfo,
    }
    setIsLoading(true)
    axios
      .post("/.netlify/functions/confirm-booking", JSON.stringify(dataBooking))
      .then(res => {
        if (res.data === "EMAIL_SENT") {
          // setLoading(false)
          // localStorage.setItem("termin", JSON.stringify(data))
          // alert("Successfully! Thanks")
          // history.push("/thanks", { customer: data })
          setIsLoading(false)
          handleNext()
        }
      })
      .catch(err => {
        setIsLoading(false)
      })
  }
  return (
    <Layout>
      <SEO title="Booking Online System" />
      {/* {!checkShop && <Loading shopname={shopName} />} */}
      {isLoading && <Loading />}
      <WrapTerminSt>
        <ShopLogo shopinfo={data.contentfulShopInfo} />
        {activeStep !== 4 && (
          <StepperSt activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {}
              const labelProps = {}

              return (
                <Step
                  style={{ padding: 0, width: "33.3333%" }}
                  key={label}
                  {...stepProps}
                >
                  <StepLabelSt
                    // className={classes.stepLabel}
                    StepIconComponent={ColorlibStepIcon}
                    {...labelProps}
                  >
                    {label}
                  </StepLabelSt>
                </Step>
              )
            })}
          </StepperSt>
        )}
        <>
          {getStepContent(activeStep)}
          {activeStep !== 4 && (
            <WrapRowSt>
              <ButtonSt
                disabled={activeStep === 0}
                variant="contained"
                color="primary"
                onClick={handleBack}
              >
                Back
              </ButtonSt>
              <ButtonSt
                disabled={activeStep === 2 && !isValidInfo}
                variant="contained"
                color="primary"
                onClick={() => {
                  if (activeStep < 3) {
                    handleNext()
                  } else {
                    handleConfirmSubmit()
                  }
                }}
              >
                {activeStep < 2
                  ? "Next"
                  : activeStep === 2
                  ? "Preview"
                  : "Book"}
              </ButtonSt>
            </WrapRowSt>
          )}
        </>
      </WrapTerminSt>
    </Layout>
  )
}

export default ShopPage

export const query = graphql`
  query ($language: String!, $shopName: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    contentfulShopInfo(shopId: { eq: $shopName }) {
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
