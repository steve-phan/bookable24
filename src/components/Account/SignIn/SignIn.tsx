import { Button, Container, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import axios from "axios"
import React, { useContext, useState } from "react"
import { Link, useTranslation } from "gatsby-plugin-react-i18next"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Input from "@mui/material/Input"
import FilledInput from "@mui/material/FilledInput"
import OutlinedInput from "@mui/material/OutlinedInput"
import InputLabel from "@mui/material/InputLabel"
import InputAdornment from "@mui/material/InputAdornment"
import FormHelperText from "@mui/material/FormHelperText"
import FormControl from "@mui/material/FormControl"
import TextField from "@mui/material/TextField"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { WrapColSt } from "./SignIn.css"
import {
  TextFieldSt,
  FormControlSt,
  TypographySt,
  ButtonSt,
} from "../Account.css"

import { auth } from "../../../firebase"
// import { ShopInfo } from "../../store/"
// import { auth } from "../../firebase"
// import { sortedTermin, validateEmail } from "../../utils"
// import Loading from "../Loading"

interface IloginStates {
  email: string
  password: string
  showPassword: boolean
  loading: boolean
}

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
  },
  wrapComponent: {
    background: "white",
    paddingTop: 26,
    paddingBottom: 32,
    borderRadius: 4,
  },
  userInput: {
    width: "100%",
    maxWidth: "560px",
    marginBottom: "22px",
    marginTop: 26,
    fontSize: 14,
    // [theme.breakpoints.down('sm')]: {
    //   fontSize: 16,
    // },
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
    // borderLeft: `2px solid ${theme.palette.highlight}`,
  },
  helperInput: {
    marginTop: -10,
    color: "#f44336",
  },
  btnSignup: {
    marginTop: 36,
    width: "100%",
    // [theme.breakpoints.down("sm")]: {
    //   width: "100%",
    // },
  },
}))

const SignIn = () => {
  const classes = useStyles()
  //   const [{ password, email, isValid, isShopLogged }, dispatch] =
  //     useContext(ShopContext)
  const initialState = {
    email: "",
    password: "",
    showPassword: false,
    loading: false,
  }
  const [inputState, setInputState] = useState(initialState)
  const handleInput = (e: any) => {
    setInputState(preState => {
      return {
        ...preState,
        [e.target.name]: e.target.value,
      }
    })
  }
  const [values, setValues] = React.useState<IloginStates>({
    email: "",
    password: "",
    showPassword: false,
    loading: false,
  })

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

  const handleShopLogin = () => {
    setInputState({
      ...inputState,
      loading: true,
    })
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
        value={inputState.email}
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
        onChange={handleInput}
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
