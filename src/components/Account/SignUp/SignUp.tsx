import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { Typography } from "@mui/material"
import FilledInput from "@mui/material/FilledInput"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import InputLabel from "@mui/material/InputLabel"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { Link } from "gatsby-plugin-react-i18next"
import React from "react"
import axios from "axios"

import { auth } from "../../../firebase"
import {
  ButtonSt,
  FormControlSt,
  TextFieldSt,
  TypographySt,
  WrapColSt,
} from "../Account.css"
import { useShopname } from "../accountHook"
import { validateEmail, validatePhone } from "../../../utils"

interface IshopInfo {
  company: string
  email: string
  phoneNumber: string
  city: string
  cityCode: string
  street: string
  firstName: string
  lastName: string
  uid?: string
}

interface IRegistrationStates extends IshopInfo {
  password: string
  confirmPassword: string
  showPassword: boolean
  loading: boolean
}

const SignIn = () => {
  const [values, setValues] = React.useState<IRegistrationStates>({
    company: "",
    email: "",
    phoneNumber: "",
    city: "",
    cityCode: "",
    street: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    loading: false,
  })
  const shopList = useShopname()

  const handleChange =
    (prop: keyof IRegistrationStates) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value })
    }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }
  // const handleClickShowPassword = () => {
  //   setInputState({ ...values, showPassword: !values.showPassword })
  // }
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  // React.useEffect(() => {
  //   isShopLogged && history.push('/dashboard');
  // }, [isShopLogged]);

  const handleShopLogin = async () => {
    setValues({
      ...values,
      loading: true,
    })
    try {
      const userRef = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      )
      const {
        company,
        email,
        phoneNumber,
        city,
        cityCode,
        street,
        firstName,
        lastName,
      } = values
      const response = await axios.post("/.netlify/functions/shop-sign-up", {
        userinfo: {
          company,
          email,
          phoneNumber,
          city,
          cityCode,
          street,
          firstName,
          lastName,
          uid: userRef.user.uid,
        },
      })
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <WrapColSt>
      {/* {values.loading && <Loading />} */}
      <h1>Neuer Kunde?</h1>
      <TypographySt>
        Erstellen Sie sich jetzt ein Kundenkonto für ein persönlicheres und
        einfacheres Einkaufserlebnis bei Uns. Bereits Kunde?
        <Link to="/login" className="siteLink">
          {" "}
          Zur Anmeldung
        </Link>
      </TypographySt>
      <TextFieldSt
        fullWidth
        value={values.email}
        variant="filled"
        name="email"
        placeholder="johndoe@mail.com"
        label="Email*"
        error={values.email.length !== 0 && !validateEmail(values.email)}
        helperText={
          values.email.length === 0 ||
          (!validateEmail(values.email) &&
            "Geben sie eine gültige E-Mail-Adresse an")
        }
        onChange={handleChange("email")}
      />
      <FormControlSt fullWidth variant="filled">
        <InputLabel htmlFor="filled-adornment-password">Passwort</InputLabel>
        <FilledInput
          id="filled-adornment-password"
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          onChange={handleChange("password")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControlSt>
      <FormControlSt fullWidth variant="filled">
        <InputLabel htmlFor="filled-adornment-password">
          Passwort wiederholen
        </InputLabel>
        <FilledInput
          id="filled-adornment-password"
          type={values.showPassword ? "text" : "password"}
          value={values.confirmPassword}
          onChange={handleChange("confirmPassword")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControlSt>

      <>
        <TextFieldSt
          value={values.company}
          variant="filled"
          name="company"
          placeholder="BestFood Restaurant"
          label="Firma*"
          onChange={handleChange("company")}
        />
        <TextFieldSt
          variant="filled"
          value={values.street}
          name="street"
          placeholder="Berliner Str 8"
          label="Straße*"
          onChange={handleChange("street")}
        />
        <TextFieldSt
          variant="filled"
          value={values.cityCode}
          name="cityCode"
          placeholder="10149"
          label="PLZ*"
          type="number"
          onChange={handleChange("cityCode")}
        />
        <TextFieldSt
          variant="filled"
          value={values.city}
          name="city"
          placeholder="Berlin"
          label="Ort*"
          onChange={handleChange("city")}
        />
      </>

      <>
        <TextFieldSt
          variant="filled"
          value={values.firstName}
          name="firstName"
          placeholder="John"
          label="First Name*"
          onChange={handleChange("firstName")}
        />
        <TextFieldSt
          variant="filled"
          value={values.lastName}
          name="lastName"
          placeholder="Doe"
          label="Last Name*"
          onChange={handleChange("lastName")}
        />
        <TextFieldSt
          variant="filled"
          value={values.phoneNumber}
          name="phoneNumber"
          placeholder="+491723567890"
          label="Phone*"
          onChange={handleChange("phoneNumber")}
          error={
            values.phoneNumber.length !== 0 &&
            !validatePhone(values.phoneNumber)
          }
          helperText={
            values.phoneNumber &&
            !validatePhone(values.phoneNumber) &&
            "Geben Sie eine gültige Telefonnummer ein"
          }
        />
      </>
      <span
        style={{
          color: "red",
          fontSize: 12,
        }}
      >
        {" "}
        Diese Felder mit (*) Symbolen sind erforderlich
      </span>
      <ButtonSt
        size="large"
        variant="contained"
        onClick={handleShopLogin}
        type="submit"
        disabled={
          values.email.length === 0 ||
          !validateEmail(values.email) ||
          values.password.length < 5 ||
          values.password !== values.confirmPassword ||
          values.company.length === 0 ||
          values.email.length === 0 ||
          values.phoneNumber.length === 0 ||
          values.city.length === 0 ||
          values.cityCode.length === 0 ||
          values.street.length === 0 ||
          values.firstName.length === 0 ||
          values.lastName.length === 0
        }
      >
        Anfrage-Demo
      </ButtonSt>
    </WrapColSt>
  )
}

export default SignIn