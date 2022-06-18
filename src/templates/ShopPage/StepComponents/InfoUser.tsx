import React, { useRef, useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { useAppDispatch, useAppSelector } from "src/store/hooks"
import {
  setCustomerInfo,
  setCustomerValidInfo,
} from "src/store/shop/bookingSlice"
import { IInfoUserProps } from "src/store/shop/shop.types"

import { TextFieldSt, TypographySt } from "./StepComponents.css"
import { WrapColSt } from "../ShopPage.css"
import { useI18next } from "gatsby-plugin-react-i18next"
import { getSchema } from "./utils"

const InfoUser = ({
  handleNext,
  submitCustomerInfo,
}: {
  handleNext: () => void
  submitCustomerInfo: boolean
}) => {
  const { t } = useI18next()
  const dispatch = useAppDispatch()

  const schema = getSchema(t)

  const {
    control,
    register,
    getValues,
    handleSubmit,

    formState: { errors, isValid, dirtyFields },
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

  const { firstName, lastName, phone, email, require } = dirtyFields

  useEffect(() => {
    if (isValid) {
      dispatch(setCustomerValidInfo(true))
    }
    return () => {
      dispatch(setCustomerValidInfo(false))
    }
  }, [isValid])

  useEffect(() => {
    if (firstName && lastName && phone && email) {
      handleSubmit(onSubmit)()
    }
  }, [firstName, lastName, phone, email])

  const onSubmit = (data: IInfoUserProps) => {
    dispatch(setCustomerInfo(data))
  }

  if (submitCustomerInfo) {
    handleSubmit(onSubmit)()
  }
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
