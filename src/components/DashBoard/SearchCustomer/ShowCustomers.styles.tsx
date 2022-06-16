import { styled } from "@mui/material"
import TableCell from "@mui/material/TableCell"

// interface ICustomCell {
//     head-title?: boolean
//   shortText?: boolean
//   //   bold?: boolean
// }

export const TableCellSt = styled(TableCell)`
  width: 55px;
  max-width: 100px;
`

export const BoldTableCellSt = styled(TableCell)`
  width: 55px;
  max-width: 100px;
  font-weight: bold;
`

export const LongTableCellSt = styled(TableCell)`
  width: 120px;
  max-width: 250px;
`
export const BoldLongTableCellSt = styled(TableCell)`
  width: 120px;
  max-width: 250px;
  font-weight: bold;
`

export const MediumTableCellSt = styled(TableCell)`
  width: 80px;
  max-width: 120px;
`
export const BoldMediumTableCellSt = styled(TableCell)`
  width: 80px;
  max-width: 120px;
  font-weight: bold;
`
