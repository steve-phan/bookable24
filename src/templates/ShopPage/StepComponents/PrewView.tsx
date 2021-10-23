import Button from "@mui/material/Button"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import { makeStyles } from "@mui/styles"
import Typography from "@mui/material/Typography"
import axios from "axios"
import moment from "moment"
import React, { useContext, useState } from "react"
// import Loading from "../components/Loading"
import { afternoonSlots, morningSlots } from "../utils"
import { WrapColSt } from "../ShopPage.css"
import { CardSt } from "./StepComponents.css"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"

// import { TerminContext } from "../context/contextTermin"

const PrewView = () => {
  // console.log(props);

  const dispatch = useAppDispatch()
  const { selectedDate, selectedSlot, guestInfo, numberOfGuest } =
    useAppSelector(state => state.booking)
  const [loading, setLoading] = useState(false)

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

  // const handleSubmit = () => {
  //   const data = {
  //     selectedDate = "",
  //     selectedSlot = "",
  //     userinfo,
  //     person,
  //     require,
  //     shopinfo,
  //   }
  //   setLoading(true)
  //   // const sendmailURL = '/api/sendmail';
  //   axios
  //     .post("/.netlify/functions/sendmail", JSON.stringify(data))
  //     .then(res => {
  //       if (res.data === "EMAIL_SENT") {
  //         setLoading(false)
  //         localStorage.setItem("termin", JSON.stringify(data))
  //         alert("Successfully! Thanks")
  //         //   history.push("/thanks", { customer: data })
  //       }
  //     })
  //     .catch(err => console.log(err))

  //   setTimeout(() => {
  //     if (loading) {
  //       setLoading(true)
  //     }
  //   }, 1500)
  // }

  return (
    <WrapColSt>
      {/* {(!selectedSlot.toString() || loading) && (
          <Loading shopname={shopinfo.shopname} />
        )} */}

      <CardSt style={{ border: "none", boxShadow: "none" }}>
        <Typography
          style={{ textTransform: "uppercase", letterSpacing: 0.4 }}
          variant="h5"
          component="h4"
        >
          Your appointment
        </Typography>

        <Typography>{/* {shopinfo.company} */}</Typography>
        <Typography>
          {/* {shopinfo.street + " " + shopinfo.city + " " + shopinfo.cityCode} */}
        </Typography>
      </CardSt>
      <CardSt>
        <Typography variant="h6" component="h5">
          Details Info
        </Typography>
        <Typography>
          Time:{" "}
          {[...morningSlots, ...afternoonSlots][selectedSlot] +
            " " +
            moment(selectedDate).format("dddd, DD. MMMM")}
        </Typography>

        <Typography>Persons: {numberOfGuest}</Typography>
        <Typography>Require: {guestInfo.require}</Typography>
      </CardSt>

      <CardSt>
        <Typography variant="h6" component="h5">
          Contact Info
        </Typography>

        <Typography>
          Name: {guestInfo.lastName + " " + guestInfo.firstName}
        </Typography>
        <Typography>Email: {guestInfo.email}</Typography>
        <Typography>Phone: {guestInfo.phone}</Typography>
      </CardSt>
    </WrapColSt>
  )
}

export default PrewView
