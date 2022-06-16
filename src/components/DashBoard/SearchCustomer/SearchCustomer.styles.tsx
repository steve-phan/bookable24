import { styled } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"

export const WrapColSt = styled("div")`
  padding: 16px 8px;
  margin: 0 auto;
  max-width: 580px;
  border-radius: 4px;
  overflow: hidden;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const WrapRowSt = styled("div")`
  display: flex;
  align-items: center;
`

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))

export const WrapSearchIcon = styled(SearchIcon)`
  color: ${({ theme }) => theme.color.primary};
  cursor: pointer;
`
