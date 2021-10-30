import React from "react"
import { Router, Link, Location } from "@reach/router"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import { graphql } from "gatsby"

import PrivateRoute from "src/components/Layout/PrivateRote"
import DashBoardLayout from "src/components/Layout/DasBoadLayout"
import HomeDashBoard from "src/components/DashBoard/Home/Home"
import TodayBookings from "src/components/DashBoard/TodayBookings/TodayBookings"
import TomorrowBookings from "src/components/DashBoard/TomorrowBookings/TomorrowBookings"
import SettingsDashBoard from "src/components/DashBoard/Settings/Settings"
import AllBookingsDashBoard from "src/components/DashBoard/AllBookings/AllBookings"

const App = () => (
  <DashBoardLayout>
    <Router basepath="/dashboard">
      <PrivateRoute path="/todaybooking" component={TodayBookings} />
      <PrivateRoute path="/tomorrowbooking" component={TomorrowBookings} />
      <PrivateRoute path="/allbooking" component={AllBookingsDashBoard} />
      <PrivateRoute path="/settings" component={SettingsDashBoard} />
      <PrivateRoute path="/" component={HomeDashBoard} />

      {/* <HomeDashBoard path="/" /> */}
    </Router>
  </DashBoardLayout>
)

const FadeTransitionRouter = (props: any) => (
  <Location>
    {({ location }) => (
      <TransitionGroup className="transition-group">
        <CSSTransition key={location.key} classNames="fade" timeout={500}>
          {/* the only difference between a router animation and
              any other animation is that you have to pass the
              location to the router so the old screen renders
              the "old location" */}
          <Router location={location} className="router">
            {props.children}
          </Router>
        </CSSTransition>
      </TransitionGroup>
    )}
  </Location>
)

const Page = (props: any) => (
  <div
    className="page"
    style={{ background: `hsl(${props.page * 75}, 60%, 60%)` }}
  >
    {props.page}
  </div>
)

export default App

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`
