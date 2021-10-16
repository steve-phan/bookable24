import { Container, Typography } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
import Stepper from "@material-ui/core/Stepper"
import { makeStyles } from "@material-ui/core/styles"
import axios from "axios"
import { graphql } from "gatsby"
import React, { useEffect, useState } from "react"

import Layout from "../../components/Layout/Layout"
import ColorlibStepIcon from "./ColorlibStepIcon"
import { useAppSelector, useAppDispatch } from "../../store/hooks"
import { getShopinfo } from "../../store/shop/shopSlice"
// import Loading from '../components/Loading';
// import DatePicker from '../components/TerminSteps/DatePicker';
// import InfoUser from '../components/TerminSteps/InfoUser';
// import SlotPicker from '../components/TerminSteps/SlotPicker';
// import { TerminContext } from '../context/contextTermin';
// import { terminTypes } from '../context/contextTermin/terminTypes';

interface IShopPageProps {
  pageContext: {
    shopName: string
  }
  data: any // Do it later
}

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
  },
  wrap: {
    transform: "translateY(100px)",
    maxWidth: "580px",
    margin: "0 auto",
    padding: "20px 8px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  wrapSteps: {
    padding: "20px 10px 10px",
  },
  stepLabel: {
    flexDirection: "column",
    textAlign: "center",
    // width: '33.3%',
    "& span": {
      paddingTop: 2,
      paddingRight: 0,
    },
  },
  button: {
    fontWeight: 600,
    backgroundColor: "red",
    // marginRight: theme.spacing(1),
    width: "48%",
    height: 40,
    "&:hover": {
      backgroundColor: "pink",
    },
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  shopInfo: {
    padding: 16,
    background: "white",
    textAlign: "center",
    borderBottom: `1px solid  yellow`,
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

// const [skipped, setSkipped] = React.useState(new Set());
// const [{ selectedSlot, isFilled }, dispatch] = useContext(TerminContext);
// console.log(selectedDate);

const ShopPage: React.FC<IShopPageProps> = ({ pageContext, data }) => {
  const [shopInfo, setShopInfo] = useState(null)
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0)
  const dispatch = useAppDispatch()
  const x = useAppSelector(state => state)
  console.log("get Store", x)
  const { shopName } = pageContext
  const steps = getSteps()

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <h1>Date Picker</h1>
      // return <DatePicker />;
      case 1:
        return <h1>SlotPicker Picker</h1>
      // return <SlotPicker />;
      case 2:
        return <h1>SlotPicker Picker</h1>
      // return <SlotPicker />;
      default:
        return "Unknown step"
    }
  }
  // useEffect(() => {
  //   axios
  //     .post("/.netlify/functions/check-shop-list", {
  //       shopName,
  //     })
  //     .then(res => {
  //       console.log("res", res)
  //       // setShopInfo(res.data.shopInfo)
  //       // dispatch({
  //       //   type: terminTypes.SET_SHOP_INFO,
  //       //   shopinfo: res.data.shopInfo,
  //       // })
  //     })
  //     .catch(err => {
  //       // props.history.push("/pagenotfound")
  //     })

  //   // setTimeout(() => {
  //   //   // setCheckShop(true)
  //   // }, 300)
  // }, [])
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  return (
    <Layout className={classes.wrap} shopInfo={shopInfo}>
      {/* {!checkShop && <Loading shopname={shopName} />} */}
      {/* <Loading shopname={shopName} /> */}
      <Container className={classes.shopInfo}>
        <Typography className={classes.shopName}>
          {/* {getLogo(shopName)} */}
        </Typography>
        {/* <Typography className={classes.shopAddress}>
          {shopInfo?.street} <br />
          {shopInfo?.cityCode + ' ' + shopInfo?.city}
        </Typography> */}
      </Container>
      <Stepper className={classes.wrapSteps} activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {}
          const labelProps = {}

          return (
            <Step
              style={{ padding: 0, width: "33.3333%" }}
              key={label}
              {...stepProps}
            >
              <StepLabel
                className={classes.stepLabel}
                StepIconComponent={ColorlibStepIcon}
                {...labelProps}
              >
                {label}
              </StepLabel>
            </Step>
          )
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            {getStepContent(activeStep)}
            <Typography className={classes.instructions}></Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 0",
                margin: "20px auto",
              }}
            >
              <Button
                disabled={activeStep === 0}
                variant="contained"
                color="primary"
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              {activeStep !== 2 ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                  // disabled={
                  //   activeStep === 1 &&
                  //   (selectedSlot === 0 ? false : !selectedSlot)
                  // }
                >
                  Next
                </Button>
              ) : (
                <Button
                  className={classes.button}
                  // disabled={!isFilled}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    // history.push(`/${shopName}/preview`)
                  }}
                >
                  Preview
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
      <button
        style={{
          padding: 30,
        }}
        onClick={() => dispatch(getShopinfo(shopName))}
      >
        {" "}
        Fetch Data{" "}
      </button>
    </Layout>
  )
}

export default ShopPage

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`
