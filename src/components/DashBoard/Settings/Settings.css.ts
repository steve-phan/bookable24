import { styled, alpha } from "@mui/material/styles"
import { Button } from "@mui/material"

export const TitleSt = styled("p")(({ theme }) => ({
  margin: "16px 0",
  textAlign: "center",
  fontSize: 18,
  fontWeight: "bold",
}))

export const WrapDaySt = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  background: theme.color.background,
}))
export const DaySt = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "6px 24px",
  flexShrink: 1,
  width: "50%",
  minWidth: 130,
}))

export const WrapHourSt = styled("div")(({ theme }) => ({
  padding: 24,
  width: "100%",
  // height: "100%",
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  "& div ": {
    width: 100,
  },
  // "& p": {
  //   maxWidth: 150,
  // },
}))

export const WrapHourSelectedSt = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100%;
  padding: 24px;

  & div {
    width: 150px;
  }
`

export const SubmitButtonSt = styled(Button)(({ theme }) => ({
  width: "calc(100% - 32px)",
  maxWidth: 260,

  background: theme.color.primary,
  color: theme.color.white,
  margin: "24px auto",
  padding: 10,
  display: "block",
  fontWeight: "bold",

  "&:hover": {
    background: alpha(theme.color.primary, 0.8),
    color: theme.color.white,
  },
}))
