import * as React from "react"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import GlobalStyles from "@mui/material/GlobalStyles"
import { render as TLRrender, RenderOptions } from "@testing-library/react"
import { I18nextProvider } from "gatsby-plugin-react-i18next"
import { Store } from "@reduxjs/toolkit"
import { Provider } from "react-redux"

import { theme as customTheme, globalStyles } from "../theme"
import i18n from "./customI18n"

export const inputGlobalStyles = <GlobalStyles styles={globalStyles} />

interface ILayoutProps {
  location?: Record<string, any>
  children: JSX.Element
}

interface ICustomRenderOptions extends RenderOptions {
  store?: Store
}

const CustomReduxProvider = ({
  store,
  children,
}: {
  store?: Store
  children: JSX.Element
}) => {
  if (!store) {
    return children
  }

  return <Provider store={store}> {children}</Provider>
}

const WrapperTest =
  ({ store }: { store?: Store }) =>
  ({ children }: ILayoutProps) => {
    return (
      <CustomReduxProvider store={store}>
        <ThemeProvider theme={customTheme}>
          <I18nextProvider i18n={i18n}>
            <CssBaseline />
            {inputGlobalStyles}
            {children}
          </I18nextProvider>
        </ThemeProvider>
      </CustomReduxProvider>
    )
  }

export const render = (
  component: JSX.Element,
  { store, ...options }: ICustomRenderOptions = {}
) => {
  return TLRrender(component, {
    wrapper: WrapperTest({ store }) as React.FunctionComponent,
  })
}
