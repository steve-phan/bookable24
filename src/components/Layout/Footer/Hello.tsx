import * as React from "react"
import styled from "styled-components"

const ButtonSt = styled.button`
  background-color: red;
`

const Hello = () => {
  return (
    <>
      <div>Hello</div>
      <ButtonSt>Click me</ButtonSt>
    </>
  )
}

export default Hello
