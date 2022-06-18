import React, { useRef, useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { useAppDispatch, useAppSelector } from "src/store/hooks"
import {
  setCustomerInfo,
  setCustomerValidInfo,
  setFormDirty,
} from "src/store/shop/bookingSlice"
import {
  ICustomer,
  IInfoUserProps,
  TCustomerInfo,
} from "src/store/shop/shop.types"

import { TextFieldSt, TypographySt } from "./StepComponents.css"
import { WrapColSt } from "../ShopPage.css"
import { Input, TextField } from "@mui/material"
import { useI18next } from "gatsby-plugin-react-i18next"
import { getSchema } from "./utils"

const InfoUser = ({
  handleNext,
  isFormDirty,
}: {
  handleNext: () => void
  isFormDirty: boolean
}) => {
  const { t } = useI18next()
  const dispatch = useAppDispatch()

  const schema = getSchema(t)

  const {
    control,
    register,
    getValues,
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
      dispatch(setCustomerInfo(getValues()))
    }
    return () => {
      dispatch(setCustomerValidInfo(false))
      dispatch(setFormDirty(false))
    }
  }, [firstName, lastName, phone, email, isValid])

  const onSubmit = () => {
    handleNext()
  }
  useEffect(() => {
    if (isFormDirty) {
      handleSubmit(onSubmit)()
    }
  }, [isFormDirty])

  return (
    <WrapColSt>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextFieldSt
          {...register("firstName")}
          error={!!errors.firstName}
          helperText={errors?.firstName?.message}
          variant="filled"
          placeholder="Vorname"
          label="Vorname*"
        />

        <TextFieldSt
          {...register("lastName")}
          error={!!errors.lastName}
          helperText={errors?.lastName?.message}
          variant="filled"
          placeholder="Nachname"
          label="Nachname*"
        />

        <TextFieldSt
          {...register("email")}
          error={!!errors.email}
          helperText={errors?.email?.message}
          variant="filled"
          placeholder="johndoe@mail.com"
          label="E-Mail*"
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
                  const value = e.target.value
                  if (value === "") {
                    onChangeCustom("")
                  }
                  const num =
                    !/^\d+$/.test(value) && Number.isNaN(parseFloat(value))
                      ? null
                      : value
                  if (num) onChangeCustom(num)
                }}
                error={!!errors.phone}
                helperText={errors?.phone?.message}
                type="tel"
                variant="filled"
                placeholder="01723567890"
                label="Telefonnummer*"
              />
            )
          }}
        />

        <TextFieldSt
          {...register("require")}
          label="Besondere Wünsche hinzufügen"
          multiline
          rows={4}
          placeholder="Sonderwünsche eingeben (ohne Gewähr)"
          variant="filled"
        />
        <input
          type="submit"
          style={{
            display: "none",
          }}
        />
        <TypographySt>
          Alle Felder, die mit einem Sternchen (*) gekennzeichnet sind, müssen
          bei der Anmeldung ausgefüllt werden.
        </TypographySt>
      </form>
    </WrapColSt>
  )
}

export default InfoUser
