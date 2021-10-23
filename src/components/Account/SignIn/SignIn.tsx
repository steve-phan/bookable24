import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { Typography } from "@mui/material"
import FilledInput from "@mui/material/FilledInput"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import InputLabel from "@mui/material/InputLabel"
import { signInWithEmailAndPassword } from "firebase/auth"
import { Link } from "gatsby-plugin-react-i18next"
import React from "react"
import axios from "axios"

import { auth } from "../../../firebase"
import {
  ButtonSt,
  FormControlSt,
  TextFieldSt,
  TypographySt,
} from "../Account.css"
import { WrapColSt } from "./SignIn.css"

import { useShopname } from "../accountHook"

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
  const shopList = useShopname()

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
  // const handleClickShowPassword = () => {
  //   setInputState({ ...inputState, showPassword: !inputState.showPassword })
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
      console.log("email", values.email)
      const res = await axios.get("/.netlify/functions/get-shop-termins", {
        headers: {
          shopemail: values.email,
          shopname: shopname,
        },
      })
      console.log(res)
    } catch (error) {
      console.log(error)
    }
    // auth
    //   .signInWithEmailAndPassword(inputState.email, inputState.password)
    //   .then(async user => {
    //     const res = await axios.get("/.netlify/functions/get-shop-termins", {
    //       headers: {
    //         shopEmail: inputState.email,
    //         shopname: ShopInfo[inputState.email],
    //       },
    //     })
    //     console.log(res)
    //     // dispatch({
    //     //   type: shopTypes.SHOP_LOGIN,
    //     //   email: inputState.email,
    //     //   // allTermins: sortedTermin(res.data.allTermins),
    //     //   allTermins: res.data.allTermins,

    //     //   shopInfo: res.data.shopInfo,
    //     // })
    //     setInputState({
    //       ...inputState,
    //       loading: false,
    //     })

    //     // history.push("/dashboard")
    //   })
    //   .catch((err: any) => {
    //     alert("Check Again Password and Email")
    //     setInputState({
    //       ...inputState,
    //       loading: false,
    //     })
    //   })
  }
  return (
    <WrapColSt>
      {/* {inputState.loading && <Loading />} */}
      <h1>Bereits Kunde?</h1>
      <TypographySt>
        Loggen Sie sich jetzt ein, um alle Vorteile des Kundenkontos
        wahrzunehmen. Neuer Kunde?
        <Link to="/request"> Anfrage-Demo</Link>
      </TypographySt>
      <TextFieldSt
        fullWidth
        value={values.email}
        variant="filled"
        name="email"
        placeholder="johndoe@mail.com"
        label="Email*"
        //   error={!!inputState.email && !validateEmail(inputState.email)}
        //   helperText={
        //     inputState.email &&
        //     !validateEmail(inputState.email) &&
        //     "Enter a valid email address"
        //   }
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
        <Link to="/account/passrecover" className="siteLink">
          Passwort vergessen?
        </Link>
      </Typography>
      <ButtonSt
        size="large"
        variant="contained"
        onClick={handleShopLogin}
        type="submit"
      >
        Anmelden
      </ButtonSt>
    </WrapColSt>
  )
}

export default SignIn
