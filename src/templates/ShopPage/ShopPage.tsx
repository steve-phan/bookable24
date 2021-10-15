import React, { useState, useEffect, useContext } from "react"
import axios from "axios"
import { PageProps, Link, graphql } from "gatsby"
import { Container, Typography } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import Step from "@material-ui/core/Step"
import StepConnector from "@material-ui/core/StepConnector"
import StepLabel from "@material-ui/core/StepLabel"
import Stepper from "@material-ui/core/Stepper"
import {
  darken,
  lighten,
  makeStyles,
  withStyles,
} from "@material-ui/core/styles"
import { AvTimer, ContactMail, EventAvailable } from "@material-ui/icons"
import clsx from "clsx"
import Layout from "../../components/Layout/Layout"
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
    backgroundColor: theme.mainblue,
    // marginRight: theme.spacing(1),
    width: "48%",
    height: 40,
    "&:hover": {
      backgroundColor: lighten(theme.mainblue, 0.2),
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
    borderBottom: `1px solid ${theme.palette.highlight}`,
  },
  shopName: {
    fontSize: 32,
  },
}))

const useColorlibStepIconStyles = makeStyles(theme => {
  // console.log(theme);
  return {
    root: {
      backgroundColor: "#ccc",
      zIndex: 1,
      color: "#fff",
      width: 50,
      height: 50,
      display: "flex",
      borderRadius: "50%",
      justifyContent: "center",
      alignItems: "center",
    },

    active: {
      // backgroundColor: theme.palette.primary.main,

      // backgroundImage:
      //   'linear-gradient( 136deg , rgb(242,113,33) 0%, rgb(249 190 84) 50%, rgb(138,35,135) 100%)',
      boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    },
    completed: {
      backgroundColor: "rgb(23, 179, 85)",
      // backgroundImage:
      //   'linear-gradient( 136deg , rgb(242,113,33) 0%, rgb(249 190 84) 50%, rgb(138,35,135) 100%)',
    },
  }
})

function ColorlibStepIcon(props: any) {
  const classes = useColorlibStepIconStyles()
  const { active, completed } = props

  const icons = {
    1: <EventAvailable />,
    2: <AvTimer />,
    3: <ContactMail />,
  }

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  )
}

function getSteps() {
  return [
    "Personen und Datum",
    "Wähle unten eine Zeit aus",
    "Name und Kontaktdaten",
  ]
}

const classes = useStyles()

// const [skipped, setSkipped] = React.useState(new Set());
// const [{ selectedSlot, isFilled }, dispatch] = useContext(TerminContext);
// console.log(selectedDate);

const ShopPage: React.FC<IShopPageProps> = ({ pageContext, data }) => {
  const [shopInfo, setShopInfo] = useState(null)
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0)

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
  useEffect(() => {
    axios
      .post("/.netlify/functions/check-shop-list", {
        shopName,
      })
      .then(res => {
        console.log("res", res)
        // setShopInfo(res.data.shopInfo)
        // dispatch({
        //   type: terminTypes.SET_SHOP_INFO,
        //   shopinfo: res.data.shopInfo,
        // })
      })
      .catch(err => {
        // props.history.push("/pagenotfound")
      })

    setTimeout(() => {
      // setCheckShop(true)
    }, 300)
  }, [])
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
                  disabled={
                    activeStep === 1 &&
                    (selectedSlot === 0 ? false : !selectedSlot)
                  }
                >
                  Next
                </Button>
              ) : (
                <Button
                  className={classes.button}
                  disabled={!isFilled}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    history.push(`/${shopName}/preview`)
                  }}
                >
                  Preview
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
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
