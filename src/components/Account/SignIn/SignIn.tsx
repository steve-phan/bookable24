import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { Typography } from "@mui/material"
import FilledInput from "@mui/material/FilledInput"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import InputLabel from "@mui/material/InputLabel"
import { signInWithEmailAndPassword } from "firebase/auth"
import { Link } from "gatsby-plugin-react-i18next"
import React, { useEffect } from "react"
import { navigate } from "gatsby"

import Loading from "../../../components/Loading/Loading"
import { auth } from "../../../firebase"
import {
  ButtonSt,
  FormControlSt,
  TextFieldSt,
  TypographySt,
  WrapColSt,
} from "../Account.css"
import { useShopname } from "../accountHook"
import { validateEmail } from "../../../utils"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { getShopinfo, setShopInfo } from "../../../store/shop/shopSlice"

interface IloginStates {
  email: string
  password: string
  showPassword: boolean
  loading: boolean
}

const SignIn = () => {
  const [values, setValues] = React.useState<IloginStates>({
    email: "",
    password: "",
    showPassword: false,
    loading: false,
  })
  const dispatch = useAppDispatch()
  const { isShopLogin } = useAppSelector(state => state.shop)
  const shopList = useShopname()

  useEffect(() => {
    if (isShopLogin) {
      setValues({
        ...values,
        loading: false,
      })
      navigate("/dashboard")
    }
  }, [isShopLogin])

  const handleChange =
    (prop: keyof IloginStates) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value })
    }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const handleShopLogin = async () => {
    setValues({
      ...values,
      loading: true,
    })
    try {
      const userRef = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      )
      const shopname =
        Boolean(userRef) &&
        shopList?.find(
          (shop: { email: string; shopId: string }) =>
            shop.email === values.email
        )?.shopId
      dispatch(
        getShopinfo({
          shopemail: values.email,
          shopname: shopname,
        })
      )
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <WrapColSt>
      {values.loading && <Loading />}
      <h1>Bereits Kunde?</h1>
      <TypographySt>
        Loggen Sie sich jetzt ein, um alle Vorteile des Kundenkontos
        wahrzunehmen. Neuer Kunde?
        <Link to="/request-account"> Anfrage-Demo</Link>
      </TypographySt>
      <TextFieldSt
        fullWidth
        value={values.email}
        variant="filled"
        name="email"
        placeholder="johndoe@mail.com"
        label="Email*"
        error={values.email.length === 0 || !validateEmail(values.email)}
        helperText={
          values.email.length === 0 ||
          (!validateEmail(values.email) &&
            "Geben sie eine gültige E-Mail-Adresse an")
        }
        onChange={handleChange("email")}
      />
      <FormControlSt fullWidth variant="filled">
        <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
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
      <Typography>
        <Link to="/recover" className="siteLink">
          Passwort vergessen?
        </Link>
      </Typography>
      <ButtonSt
        size="large"
        variant="contained"
        onClick={handleShopLogin}
        type="submit"
        disabled={
          values.email.length === 0 ||
          !validateEmail(values.email) ||
          values.password.length < 8
        }
      >
        Anmelden
      </ButtonSt>
    </WrapColSt>
  )
}

export default SignIn
