import { Router, Link, useLocation, Redirect } from "@reach/router"
import * as React from "react"
// import HomeIcon from "@mui/icons-material/HomeOutlined"
// import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty"
// import MenuBookIcon from "@mui/icons-material/MenuBook"
// import SettingsIcon from "@mui/icons-material/Settings"
// import TodayIcon from "@mui/icons-material/Today"
// import UpdateIcon from "@mui/icons-material/Update"
// // core components/views for RTL layout
// // import RTLPage from 'views/RTLPage/RTLPage.js';
// import AllTermins from "../components/DashBoard/AllTermins"
// import Home from "../components/DashBoard/Home"
// import PeddingTermins from "../components/DashBoard/PeddingTermins"
// import Settings from "../components/DashBoard/Settings"
// import TodayTermins from "../components/DashBoard/TodayTermins"
// import TomorrowTermins from "../components/DashBoard/TomorrowTermins"
// import SignIn from "../components/SignIn"

// const dashboardRoutes = [
//   {
//     path: "",
//     name: "Trang chủ",

//     icon: HomeIcon,
//     component: Home,
//     layout: "/dashboard",
//   },
//   {
//     path: "/alltermins",
//     name: "Tất cả Booking",

//     icon: MenuBookIcon,
//     component: AllTermins,
//     layout: "/dashboard",
//   },

//   {
//     path: "/todaytermins",
//     name: "Booking hôm nay",

//     icon: TodayIcon,
//     component: TodayTermins,
//     layout: "/dashboard",
//   },
//   {
//     path: "/tomorrowtermins",
//     name: "Booking ngày mai",

//     icon: UpdateIcon,
//     component: TomorrowTermins,
//     layout: "/dashboard",
//   },
//   {
//     path: "/penddingtermins",
//     name: "Booking chờ duyệt",
//     icon: HourglassEmptyIcon,
//     component: PeddingTermins,
//     layout: "/dashboard",
//   },
//   {
//     path: "/Settings",
//     name: "Cài đặt",

//     icon: SettingsIcon,
//     component: Settings,
//     layout: "/dashboard",
//   },
// ]

// export default dashboardRoutes

export const switchRoutes = () => {
  return (
    <Router>
      {/* {routes.map((prop, key) => {
        if (prop.layout === "/dashboard") {
          return (
            <Route
              exact
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
            />
          )
        }
        return null
      })} */}
      <Page path="/1" page="1" />
      <Page path="/2" page="2" />
    </Router>
  )
}
const Page = (props: any) => (
  <div
    className="page"
    style={{ background: `hsl(${props.page * 75}, 60%, 60%)` }}
  >
    {props.page}
  </div>
)
