import React, { useRef, useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { useAppDispatch, useAppSelector } from "src/store/hooks"
import {
  setCustomerInfo,
  setCustomerValidInfo,
  setCustomerSubmit,
} from "src/store/shop/bookingSlice"
import { IInfoUserProps } from "src/store/shop/shop.types"

import { TextFieldSt, TypographySt } from "./StepComponents.styles"
import { WrapColSt } from "../ShopPage.styles"
import { useI18next } from "gatsby-plugin-react-i18next"
import { getSchema } from "./utils"

const InfoUser = ({ handleNext }: { handleNext: () => void }) => {
  const { t } = useI18next()
  const dispatch = useAppDispatch()
  const {
    isValidInfo,
    isSubmitted,
    firstName,
    lastName,
    phone,
    email,
    require,
  } = useAppSelector(state => state.booking)

  const schema = getSchema(t)

  const {
    control,
    register,
    getValues,
    handleSubmit,
    watch,
    formState: { errors, isValid, dirtyFields },
  } = useForm<IInfoUserProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      lastName,
      firstName,
      email,
      phone,
      require,
    },
  })

  useEffect(() => {
    if (isSubmitted === "pending" || isValidInfo) {
      handleSubmit(onSubmit)()
    }
    return () => {
      dispatch(setCustomerSubmit("fail"))
    }
  }, [isSubmitted, isValidInfo])

  const dirtyLength = Object.keys(dirtyFields).map(field => !!field).length

  useEffect(() => {
    if (isValid || dirtyLength >= 4) {
      handleSubmit(onSubmit)()
      dispatch(setCustomerValidInfo(true))
    }
    // const errorsLength = Object.keys(errors).map(field => !!field).length
  }, [
    watch("email"),
    watch("firstName"),
    watch("lastName"),
    watch("phone"),
    watch("require"),
    isValid,
  ])

  const onSubmit = (data: IInfoUserProps) => {
    dispatch(setCustomerInfo(data))
  }
  return (
    <WrapColSt>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <TextFieldSt
          {...register("firstName")}
          error={!!errors.firstName}
          helperText={errors?.firstName?.message}
          variant="filled"
          placeholder="Vorname"
          label="Vorname*"
          autoComplete="off"
        />

        <TextFieldSt
          {...register("lastName")}
          error={!!errors.lastName}
          helperText={errors?.lastName?.message}
          variant="filled"
          placeholder="Nachname"
          label="Nachname*"
          // inputProps={{}}
          autoComplete="off"
        />

        <TextFieldSt
          {...register("email")}
          error={!!errors.email}
          helperText={errors?.email?.message}
          variant="filled"
          placeholder="johndoe@mail.com"
          label="E-Mail*"
          autoComplete="off"
        />
        <Controller
          name="phone"
          control={control}
          render={({ field }) => {
            const { onChange: onChangeCustom } = field
            return (
              <TextFieldSt
                autoComplete="off"
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
          autoComplete="off"
          type="hidden"
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
