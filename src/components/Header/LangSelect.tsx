import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import { StaticImage } from "gatsby-plugin-image"
import { useI18next } from "gatsby-plugin-react-i18next"
import * as React from "react"
import styled from "styled-components"

const StyledSelect = styled(Select)`
  margin-left: 16px;
  .MuiSelect-root {
    width: 40px;
    display: flex;
    justify-content: center;
    border: 1px solid white;
    border-radius: 50% !important;
    padding-right: 0;
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
      value={language}
      onChange={(event: React.ChangeEvent<{ value?: unknown }>) => {
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
                  src={`../../images/vn.png`}
                  width={22}
                  alt="Flag"
                />
              </MenuItem>
            )
          case "en":
            return (
              <MenuItem key={lng} value={lng}>
                <StaticImage
                  src={`../../images/en.png`}
                  width={22}
                  alt="Flag"
                />
              </MenuItem>
            )
          case "de":
            return (
              <MenuItem key={lng} value={lng}>
                <StaticImage
                  src={`../../images/de.png`}
                  width={22}
                  alt="Flag"
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
