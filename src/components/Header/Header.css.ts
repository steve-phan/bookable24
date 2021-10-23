import { Link } from "gatsby-plugin-react-i18next"
import { styled } from "@mui/material/styles"

export const PageLinkSt = styled(Link)`
  color: inherit;
  margin: 0 8px;
  padding-top: 10px;
  padding-bottom: 4px;
`

export const CTAButtons = styled(Link)`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.white};
  background-color: ${({ theme }) => theme.color.primary};
  padding: 12px 20px;
  cursor: pointer;
  border-radius: 20px;
  text-transform: uppercase;
`
export const LinkItemSt = styled(Link)`
  font-size: 16px;
  font-weight: 500;
  padding: 8px;
  margin-top: 16px;
  display: flex;
  align-items: center;
  color: white;

  svg {
    margin-right: 20px;
    margin-left: 20px;
    font-size: 18px;
  }
`

export const LoginButton = styled(CTAButtons)`
  padding: 10px 16px;
  /* width: fit-content; */
  /* width: 120px; */
  margin: 0 auto;
`

export const WrapLoginSt = styled("div")`
  display: flex;
  place-items: center;
  padding: 10px 28px;
  border-bottom: 1px solid white;
`
