import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { alpha, styled } from "@mui/material/styles"

export const ColumnCenterBoxSt = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 60vh;
`

export const InfoBoxSt = styled(Box)`
  max-width: 350px;
  padding: 16px;
  text-align: center;
  margin-bottom: 24px;
`

export const ButtonSt = styled(Button)(({ theme }) => ({
  background: theme.color.primary,
  fontWeight: "bold",
  width: 222,
  marginTop: 24,
  marginBottom: 16,

  "&:hover": {
    background: alpha(theme.color.primary, 0.6),
  },
}))
