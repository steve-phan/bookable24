import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import { makeStyles } from "@mui/styles"
import Typography from "@mui/material/Typography"
import axios from "axios"
import moment from "moment"
import React, { useContext, useState } from "react"
// import Loading from "../components/Loading"
import { afternoonSlots, morningSlots } from "../utils"
// import { TerminContext } from "../context/contextTermin"

const useStyles = makeStyles({
  root: {
    // position: 'relative',
    margin: "100px auto 0 auto",
    width: "100%",
    maxWidth: 600,
    minWidth: 275,
    // top: '50%',
    // left: '50%',
    // transform: 'translate(-50% ,50%)',
    paddingBottom: 16,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  wrapCard: {
    padding: "10px 6px",
    marginTop: 16,
  },
})

const PrewView = () => {
  // console.log(props);
  const [loading, setLoading] = useState(false)

  const classes = useStyles()
  //   const [
  //     { selectedDate, selectedSlot, userinfo, person, require, shopinfo },
  //     dispatch,
  //   ] = useContext(TerminContext)

  // useEffect(() => {
  //   const oldData = JSON.parse(localStorage.getItem('termin'));
  //   if (oldData) {
  //     console.log(oldData);
  //     dispatch({
  //       type: terminTypes.UPDATE_TERMIN_INFO,
  //       payload: oldData,
  //     });
  //   }
  // }, []);
  // console.log(selectedDate);

  const handleSubmit = () => {
    const data = {
      selectedDate = "",
      selectedSlot = "",
      userinfo,
      person,
      require,
      shopinfo,
    }
    setLoading(true)
    // const sendmailURL = '/api/sendmail';
    axios
      .post("/.netlify/functions/sendmail", JSON.stringify(data))
      .then(res => {
        if (res.data === "EMAIL_SENT") {
          setLoading(false)
          localStorage.setItem("termin", JSON.stringify(data))
          alert("Successfully! Thanks")
          //   history.push("/thanks", { customer: data })
        }
      })
      .catch(err => console.log(err))

    setTimeout(() => {
      if (loading) {
        setLoading(true)
      }
    }, 1500)
  }

  return (
    <>
      <Card className={classes.root} variant="outlined">
        {(!selectedSlot.toString() || loading) && (
          <Loading shopname={shopinfo.shopname} />
        )}
        <CardContent>
          <Card
            style={{ textAlign: "center", border: "none", boxShadow: "none" }}
            className={classes.wrapCard}
          >
            <Typography
              style={{ textTransform: "uppercase", letterSpacing: 0.4 }}
              variant="h5"
              component="h4"
            >
              Your appointment
            </Typography>

            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {shopinfo.company}
            </Typography>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {shopinfo.street + " " + shopinfo.city + " " + shopinfo.cityCode}
            </Typography>
          </Card>
          <Card className={classes.wrapCard}>
            <Typography variant="h6" component="h5">
              Details Info
            </Typography>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {[...morningSlots, ...afternoonSlots][selectedSlot] +
                " " +
                selectedDate}
            </Typography>

            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Persons : {person}
            </Typography>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {require}
            </Typography>
          </Card>

          <Card className={classes.wrapCard}>
            <Typography variant="h6" component="h5">
              Contact Info
            </Typography>

            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {userinfo.lastName + " " + userinfo.firstName}
            </Typography>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {userinfo.email + " " + userinfo.phone}
            </Typography>
          </Card>
        </CardContent>
        <CardActions style={{ padding: 16 }}>
          <Button
            style={{ width: "100%" }}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Book
          </Button>
        </CardActions>
      </Card>
    </>
  )
}

export default PrewView
