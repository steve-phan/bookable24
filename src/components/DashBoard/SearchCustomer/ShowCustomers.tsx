import * as React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Collapse from "@mui/material/Collapse"
import IconButton from "@mui/material/IconButton"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"

import { ICustomer } from "src/store/shop/shop.types"

const Row = ({ customer, index }: { customer: ICustomer; index: number }) => {
  const { email, phone, lastName, firstName } = customer
  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": {
            borderBottom: "unset",
            background: index % 2 === 0 ? "#ffffff" : "#faf8f8",
          },
        }}
      >
        <TableCell
          style={{
            width: 120,
            maxWidth: "250px",
          }}
          align="left"
        >
          {email}
        </TableCell>
        <TableCell
          style={{
            width: 120,
            maxWidth: 120,
          }}
          align="left"
        >
          {phone}
        </TableCell>
        <TableCell
          style={{
            width: 80,
            maxWidth: 80,
          }}
          align="right"
        >
          {firstName}
        </TableCell>
        <TableCell
          style={{
            width: 80,
            maxWidth: 80,
          }}
          align="right"
        >
          {lastName}
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

const ShowCustomers = ({ customers }: { customers: ICustomer[] }) => {
  const { t } = useTranslation()

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell
              style={{
                fontSize: 16,
                fontWeight: "bold",
                width: "250px",
              }}
            >
              Email
            </TableCell>
            <TableCell
              style={{
                fontSize: 16,
                fontWeight: "bold",
              }}
              align="left"
            >
              Phone
            </TableCell>
            <TableCell
              align="right"
              style={{
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              FirstName
            </TableCell>
            <TableCell
              align="right"
              style={{
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              LastName
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((customer, index) => (
            <Row
              key={customer.phone + index}
              customer={customer}
              index={index}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ShowCustomers
