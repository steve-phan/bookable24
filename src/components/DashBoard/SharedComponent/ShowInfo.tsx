import * as React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import moment from "moment"

import { useAppDispatch, useAppSelector } from "src/store/hooks"
import { allSlots } from "src/utils"

import Box from "@mui/material/Box"
import Collapse from "@mui/material/Collapse"
import IconButton from "@mui/material/IconButton"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { Hidden } from "@mui/material"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import InfoIcon from "@mui/icons-material/Info"
import { ITermin } from "./DashBoard.types"

// import ShowInfo from "../SharedComponent/ShowInfo"
// const today = moment(new Date()).format("MMM DD")

const createData = ({
  selectedSlot,
  person,
  first_name,
  last_name,
  phone,
  email,
  require,
  _id,
}: ITermin) => {
  return {
    selectedSlot,
    person,
    firstNam: first_name,
    lastName: last_name,
    phone,
    email,
    require,
    _id,
    custormer: {
      phone,
      email,
      require,
    },
  }
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props
  const [open, setOpen] = React.useState(false)
  const { phone, email, require } = row.custormer
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell
          style={{
            width: 60,
            maxWidth: 60,
          }}
        >
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {allSlots[Number(row.selectedSlot)]}
        </TableCell>
        <TableCell align="left">{row.person}</TableCell>
        <TableCell align="left">{row.firstNam + " " + row.lastName}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              style={{
                background: "#f3e9e9",
                paddingTop: 8,
                paddingBottom: 8,
              }}
            >
              <Table size="small" aria-label="purchases">
                <TableBody>
                  <div key={phone}>
                    <TableRow>
                      <TableCell
                        style={{
                          width: 60,
                          maxWidth: 60,
                        }}
                      >
                        <IconButton>
                          <InfoIcon color="info" />
                        </IconButton>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {phone}
                      </TableCell>
                      <TableCell>{email}</TableCell>
                      <Hidden mdDown>
                        <TableCell style={{ color: "red" }} align="left">
                          {require}
                        </TableCell>
                      </Hidden>
                    </TableRow>
                    <Hidden mdUp>
                      <div
                        style={{
                          color: "red",
                          maxWidth: "100vw",
                          paddingLeft: 16,
                        }}
                      >
                        {require}
                      </div>
                    </Hidden>
                  </div>
                </TableBody>{" "}
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

const ShowInfo = ({ todayTermins }: { todayTermins: ITermin[] }) => {
  const rows = todayTermins.map(
    ({
      _id,
      selectedSlot,
      person,
      first_name,
      last_name,
      phone,
      email,
      require,
    }: ITermin) => {
      return createData({
        selectedSlot,
        person,
        first_name,
        last_name,
        phone,
        email,
        require,
        _id,
      })
    }
  )

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Time
            </TableCell>
            <TableCell
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}
              align="left"
            >
              Guests
            </TableCell>
            <TableCell
              align="left"
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Name
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <Row key={row._id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ShowInfo
