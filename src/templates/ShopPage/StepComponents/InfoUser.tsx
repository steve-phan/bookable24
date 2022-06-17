import React, { useRef, useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { useAppDispatch, useAppSelector } from "src/store/hooks"
import {
  setCustomerInfo,
  setCustomerValidInfo,
} from "src/store/shop/bookingSlice"
import {
  ICustomer,
  IInfoUserProps,
  TCustomerInfo,
} from "src/store/shop/shop.types"
import { validateEmail, validatePhone } from "src/utils"

import { TextFieldSt, TypographySt } from "./StepComponents.css"
import { WrapColSt } from "../ShopPage.css"
import { Input, TextField } from "@mui/material"
import { useI18next } from "gatsby-plugin-react-i18next"
import { getSchema } from "./utils"

const InfoUser = ({ handleNext }: { handleNext: () => void }) => {
  const { t } = useI18next()
  const dispatch = useAppDispatch()

  const schema = getSchema(t)

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty, dirtyFields },
  } = useForm<IInfoUserProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      lastName: "",
      firstName: "",
      email: "",
      phone: "",
      require: "",
    },
  })
  const { firstName, lastName, phone, email } = dirtyFields
  useEffect(() => {
    if (firstName && lastName && phone && email && isValid) {
      dispatch(setCustomerValidInfo(true))
    }
    return () => {
      dispatch(setCustomerValidInfo(false))
    }
  }, [firstName, lastName, phone, email])

  const onSubmit = (data: IInfoUserProps) => {
    console.log(data)
    dispatch(setCustomerInfo(data))
  }
  console.log({ isValid })
  return (
    <WrapColSt>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <TextFieldSt
              {...field}
              error={!!errors.firstName}
              helperText={errors?.firstName?.message}
              variant="filled"
              placeholder="Vorname"
              label="Vorname*"
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <TextFieldSt
              {...field}
              error={!!errors.lastName}
              helperText={errors?.lastName?.message}
              variant="filled"
              placeholder="Nachname"
              label="Nachname*"
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextFieldSt
              {...field}
              error={!!errors.email}
              helperText={errors?.email?.message}
              variant="filled"
              placeholder="johndoe@mail.com"
              label="E-Mail*"
            />
          )}
        />
        <Controller
          name="phone"
          control={control}
          render={({ field }) => {
            const { onChange: onChangeCustom } = field
            return (
              <TextFieldSt
                {...field}
                onChange={e => {
                  if (e.target.value === "") {
                    onChangeCustom("")
                  }
                  const num = Number.isNaN(parseFloat(e.target.value))
                    ? null
                    : parseFloat(e.target.value)
                  if (num) onChangeCustom(num)
                }}
                error={!!errors.phone}
                helperText={errors?.phone?.message}
                type="tel"
                variant="filled"
                placeholder="+491723567890"
                label="Telefonnummer*"
              />
            )
          }}
        />
        <Controller
          name="require"
          control={control}
          render={({ field }) => (
            <TextFieldSt
              {...field}
              label="Besondere Wünsche hinzufügen"
              multiline
              rows={4}
              placeholder="Sonderwünsche eingeben (ohne Gewähr)"
              variant="filled"
            />
          )}
        />
        <input type="submit" style={{ display: "none" }} />
        <TypographySt>
          Alle Felder, die mit einem Sternchen (*) gekennzeichnet sind, müssen
          bei der Anmeldung ausgefüllt werden.
        </TypographySt>
      </form>
    </WrapColSt>
  )
}

export default InfoUser
