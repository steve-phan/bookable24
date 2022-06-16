import { Card, styled } from "@mui/material"

export const WrapColSt = styled("div")`
  padding: 16px 8px;
  margin: 0 auto;

  max-width: 580px;
  border-radius: 4px;
  overflow: hidden;
  width: 100%;
`

export const CardSt = styled(Card)(({ theme }) => ({
  padding: "16px 8px",
  marginBottom: 16,
  "& h5": {
    width: "fit-content",
    fontSize: 20,
    lineHeight: "21px",
    borderBottom: `2px solid ${theme.color.warning}`,
    marginBottom: 6,
  },
  "& p": {
    fontSize: 16,
  },
}))
