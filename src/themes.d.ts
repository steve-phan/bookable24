import "@mui/material/styles"
declare module "@mui/material/styles" {
  export interface ThemeOptions {
    color: {
      primary: string
      white: string
      gray: string
      text: string
      invalid: string
      background: string
      black: string
      activeBackground: string
      activeColor: string
      iconColor: string
    }
  }
  // allow configuration using `createTheme`
  // interface ThemeOptions {
  //   status?: {
  //     danger?: string;
  //   };
  // }
}
