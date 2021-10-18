import { ThemeOptions } from "@mui/material/styles"

export const styles = (theme: ThemeOptions) => ({
  logo: {
    display: "inline-flex",
    alignItems: "center",

    "& span": {
      color: theme.color.primary,
      fontWeight: 600,
    },
  },
})
