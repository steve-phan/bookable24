import { Link } from "gatsby-plugin-react-i18next"
import { styled } from "@mui/material/styles"

export const PageLinkSt = styled(Link)`
  color: inherit;
  margin: 0 8px;
  padding-top: 10px;
  padding-bottom: 4px;
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
