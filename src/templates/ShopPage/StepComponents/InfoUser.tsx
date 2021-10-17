import { makeStyles, TextField, Typography } from "@material-ui/core"
import React, { useContext, useEffect, useState } from "react"
import { TerminContext } from "../../context/contextTermin"
import { terminTypes } from "../../context/contextTermin/terminTypes"
import { validateEmail, validatePhone } from "../../utils"
const useStyles = makeStyles(theme => ({
  userInput: {
    width: "100%",
    maxWidth: "560px",
    marginBottom: "20px",
    "& label.Mui-focused": {
      color: "#999",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#999",
    },
  },
  require: {
    fontSize: 14.5,
    paddingLeft: 10,
    color: "#333",
    borderLeft: `2px solid ${theme.palette.highlight}`,
  },
}))
// .MuiFormLabel-Root.Mui-focused

const InfoUser = () => {
  const [firstName, setFirstName] = useState(null)
  const [lastName, setLastName] = useState(null)
  const [email, setEmail] = useState(null)
  const [phone, setPhone] = useState(null)
  const [require, setRequire] = useState(null)
  const classes = useStyles()
  const [{}, dispatch] = useContext(TerminContext)
  useEffect(() => {
    if (
      firstName &&
      lastName &&
      phone &&
      email &&
      validateEmail(email) &&
      validatePhone(phone)
    ) {
      dispatch({
        type: terminTypes.SET_FILLED,
        userinfo: {
          firstName,
          lastName,
          phone,
          email,
        },
      })
    }

    return () => {
      dispatch({
        type: terminTypes.SET_OPTIONAL,
        require: require,
      })
    }
  }, [require, phone])
  // console.log(require);
  return (
    <section
      style={{
        background: "white",
        padding: "16px",
      }}
    >
      <TextField
        className={classes.userInput}
        variant="outlined"
        name="first_name"
        placeholder="Vorname"
        label="Vorname*"
        onChange={e => setFirstName(e.target.value)}
      />
      <TextField
        className={classes.userInput}
        variant="outlined"
        name="last_name"
        placeholder="Nachname"
        label="Nachname*"
        onChange={e => setLastName(e.target.value)}
      />
      <TextField
        className={classes.userInput}
        variant="outlined"
        name="email"
        placeholder="johndoe@mail.com"
        label="E-Mail*"
        error={!!email && !validateEmail(email)}
        helperText={
          email &&
          !validateEmail(email) &&
          "Bitte geben Sie eine gültige E-Mail-Adresse ein."
        }
        onChange={e => setEmail(e.target.value)}
      />
      <TextField
        className={classes.userInput}
        variant="outlined"
        name="phone"
        placeholder="+491723567890"
        label="Telefonnummer*"
        error={!!phone && !validatePhone(phone)}
        helperText={
          phone &&
          !validatePhone(phone) &&
          "Bitte geben Sie eine gültige Telefonnummer ein."
        }
        onChange={e => setPhone(e.target.value)}
      />
      <TextField
        className={classes.userInput}
        id="outlined-multiline-static"
        label="Besondere Wünsche hinzufügen"
        multiline
        rows={4}
        // defaultValue='Default Value'
        placeholder="Sonderwünsche eingeben (ohne Gewähr)"
        variant="outlined"
        onChange={e => {
          setRequire(e.target.value)
        }}
      />
      <Typography className={classes.require}>
        Alle Felder, die mit einem Sternchen (*) gekennzeichnet sind, müssen bei
        der Anmeldung ausgefüllt werden.
      </Typography>
    </section>
  )
}

export default InfoUser
