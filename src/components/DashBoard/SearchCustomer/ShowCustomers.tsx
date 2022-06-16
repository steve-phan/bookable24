import * as React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"

import { ICustomer } from "src/store/shop/shop.types"

import {
  TableCellSt,
  LongTableCellSt,
  MediumTableCellSt,
  BoldTableCellSt,
  BoldLongTableCellSt,
  BoldMediumTableCellSt,
} from "./ShowCustomers.styles"

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
        <LongTableCellSt>{email}</LongTableCellSt>
        <MediumTableCellSt>{phone}</MediumTableCellSt>
        <TableCellSt>{firstName}</TableCellSt>
        <TableCellSt>{lastName}</TableCellSt>
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
            <BoldLongTableCellSt>Email</BoldLongTableCellSt>
            <BoldMediumTableCellSt>Phone</BoldMediumTableCellSt>
            <BoldTableCellSt>FirstName</BoldTableCellSt>
            <BoldTableCellSt>LastName</BoldTableCellSt>
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
