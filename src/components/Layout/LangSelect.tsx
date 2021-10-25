import MenuItem from "@mui/material/MenuItem"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import { StaticImage } from "gatsby-plugin-image"
import { useI18next } from "gatsby-plugin-react-i18next"
import * as React from "react"
import styled from "styled-components"

const StyledSelect = styled(Select)`
  margin-left: 16px;
  .MuiSelect-select {
    width: 40px;
    display: flex;
    justify-content: center;
    border-radius: 50% !important;
    padding-right: 0 !important;
  }
  svg {
    visibility: hidden;
  }
`

const LangSelect: React.FC = () => {
  const { languages, language, changeLanguage } = useI18next()
  return (
    <StyledSelect
      disableUnderline
      variant="standard"
      value={language}
      onChange={(event: SelectChangeEvent<unknown>) => {
        /* Because this is not a Real Select Tag 
          /* Need using `as string`  */
        changeLanguage(event?.target?.value as string)
      }}
    >
      {languages.map(lng => {
        switch (lng) {
          case "vn":
            return (
              <MenuItem key={lng} value={lng}>
                <StaticImage
                  src={`./flag/vn.png`}
                  width={23}
                  alt={`Flag of ${lng}`}
                />
              </MenuItem>
            )
          case "en":
            return (
              <MenuItem key={lng} value={lng}>
                <StaticImage
                  src={`./flag/en.png`}
                  width={23}
                  alt={`Flag of ${lng}`}
                />
              </MenuItem>
            )
          case "de":
            return (
              <MenuItem key={lng} value={lng}>
                <StaticImage
                  src={`./flag/de.png`}
                  width={23}
                  alt={`Flag of ${lng}`}
                />
              </MenuItem>
            )

          default:
            break
        }
      })}
    </StyledSelect>
  )
}

export default LangSelect
