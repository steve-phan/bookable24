// import styled from "styled-components"
import Stepper from "@mui/material/Stepper"
import StepLabel from "@mui/material/StepLabel"
import Button from "@mui/material/Button"
import { styled, alpha } from "@mui/material/styles"

export const WrapTerminSt = styled("div")`
  margin: 0 auto;
  max-width: 580px;
`

export const StepperSt = styled(Stepper)`
  margin-bottom: 10px;
  padding: 20px 6px 20px;
`

export const StepLabelSt = styled(StepLabel)`
  flex-direction: column;
  text-align: center;

  span {
    margin-top: 5px;
  }
`

export const WrapRowSt = styled("div")`
  display: flex;
  justify-content: space-between;
  padding: 10px 8px;
  margin: 20px auto;
`

export const ButtonSt = styled(Button)`
  width: 48%;
  height: 40px;
  font-weight: bold;
  background: ${({ theme }) => theme.color.primary};

  :hover {
    background: ${({ theme }) => alpha(theme.color.primary, 0.6)};
  }
`
