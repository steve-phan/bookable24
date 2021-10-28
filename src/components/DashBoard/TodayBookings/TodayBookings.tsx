import * as React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import moment from "moment"
import { useAppDispatch, useAppSelector } from "src/store/hooks"
import { morningSlots, afternoonSlots } from "src/templates/ShopPage/utils"
const today = moment(new Date()).format("MMM DD")

// const TodayDashBoard = () => {
//   return <h1>Today Bookings</h1>
// }

import Box from "@mui/material/Box"
import Collapse from "@mui/material/Collapse"
import IconButton from "@mui/material/IconButton"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"

function createData(
  selectedSlot: string,
  person: string,
  firstNam: string,
  lastName: string,
  phone: string,
  email: string,
  require: string,
  _id: string
) {
  return {
    selectedSlot,
    person,
    firstNam,
    lastName,
    phone,
    email,
    require,
    _id,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  }
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props
  const [open, setOpen] = React.useState(false)

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.selectedSlot}
        </TableCell>
        <TableCell align="right">{row.person}</TableCell>
        <TableCell align="right">{row.firstNam + row.lastName}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map(historyRow => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        hello
                        {/* {Math.round(historyRow.amount * row.price * 100) / 100} */}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 3.99),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 4.99),
//   createData("Eclair", 262, 16.0, 24, 6.0, 3.79),
//   createData("Cupcake", 305, 3.7, 67, 4.3, 2.5),
//   createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
// ]

export default function CollapsibleTable() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { shopInfo, allTermins } = useAppSelector(state => state.shop)
  const todayTermins = allTermins
    .filter(termin => termin.selectedDate === today)
    .sort((a, b) => Number(a.selectedSlot) - Number(b.selectedSlot))
  console.log("allTermins", todayTermins)

  // const { selectedSlot, person, firstNam, lastName, phone, email, require } = []

  const rows = todayTermins.map(
    ({
      _id,
      selectedSlot,
      person,
      firstNam,
      lastName,
      phone,
      email,
      require,
    }) => {
      return createData(
        selectedSlot,
        person,
        firstNam,
        lastName,
        phone,
        email,
        require,
        _id
      )
    }
  )

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Time</TableCell>
            <TableCell align="right">Guests</TableCell>
            <TableCell align="right">Name</TableCell>
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
