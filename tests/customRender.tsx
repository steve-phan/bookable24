import * as React from "react"
import { ThemeProvider as ThemeProviderSt } from "styled-components"
import { Container } from "@mui/material"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import GlobalStyles from "@mui/material/GlobalStyles"
import { render as TLRrender } from "@testing-library/react"
import "jest-styled-components"

import { theme, globalStyles } from "../src/theme"

export const inputGlobalStyles = <GlobalStyles styles={globalStyles} />

interface ILayoutProps {
  location?: Record<string, any>
  children: JSX.Element
}

const WrapperTest =
  () =>
  ({ children }: ILayoutProps) => {
    return (
      <ThemeProvider theme={theme}>
        {/* <ThemeProviderSt theme={theme}> */}
        <CssBaseline />
        {inputGlobalStyles}

        {children}
        {/* </ThemeProviderSt> */}
      </ThemeProvider>
    )
  }

export const render = (component: JSX.Element) => {
  return TLRrender(component, {
    wrapper: WrapperTest(),
  })
}
