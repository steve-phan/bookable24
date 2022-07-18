import { styled } from "@mui/material/styles"
import { style } from "@mui/system"

import { drawerWidth } from "src/components/Layout/DasBoadLayout/config"

export const WrapDashBoardSt = styled("div")(({ theme }) => ({
  position: "relative",
  top: 0,
  height: "100vh",
}))

export const DashBoardContentSt = styled("main")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",

  overflow: "auto",
  position: "relative",
  float: "right",
  minHeight: "100%",
  width: "100%",

  [theme.breakpoints.up("md")]: {
    width: `calc(100% - ${drawerWidth}px)`,
  },
}))

export const WrapContentSt = styled("div")(({ theme }) => ({
  flexGrow: 1,
  paddingTop: 100,
}))

export const WrapSideBarSt = styled("div")(({ theme }) => ({
  "& .MuiPaper-root": {
    paddingTop: 64,
    width: `${drawerWidth}px`,
    borderRight: "unset",
    justifyContent: "space-evenly",
  },
}))
