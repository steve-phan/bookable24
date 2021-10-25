import { styled } from "@mui/material/styles"

import { drawerWidth } from "src/components/DashBoard/DashBoardLayout/config"

export const WrapDashBoardSt = styled("div")(({ theme }) => ({
  position: "relative",
  top: 0,
  height: "100vh",
}))

export const DashBoardContentSt = styled("main")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    width: `calc(100% - ${drawerWidth}px)`,
  },
  overflow: "auto",
  position: "relative",
  float: "right",
  maxHeight: "100%",
  width: "100%",
}))
