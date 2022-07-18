import * as React from "react"
import { Theme, ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import GlobalStyles from "@mui/material/GlobalStyles"
import { render as TLRrender } from "@testing-library/react"

import { theme as customTheme, globalStyles } from "../theme"

export const inputGlobalStyles = <GlobalStyles styles={globalStyles} />

interface ILayoutProps {
  location?: Record<string, any>
  children: JSX.Element
}

const WrapperTest =
  () =>
  ({ children }: ILayoutProps) => {
    return (
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        {inputGlobalStyles}
        {children}
      </ThemeProvider>
    )
  }

export const render = (component: JSX.Element) => {
  return TLRrender(component, {
    wrapper: WrapperTest() as React.FunctionComponent,
  })
}
