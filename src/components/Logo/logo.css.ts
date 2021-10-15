import { DefaultTheme } from "@material-ui/styles"

export const styles = (theme: DefaultTheme) => ({
  logo: {
    display: "inline-flex",
    alignItems: "center",

    "& span": {
      color: theme.color.primary,
      fontWeight: 600,
    },
  },
})
