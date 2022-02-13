import React from "react"
import Box from "@mui/material/Box"

import { TypographySt, WrapModalSt } from "../Account.css"

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
}

interface IModalProps {
  open: boolean
  modalText: string
  handleOpen: () => void
  handleClose: () => void
}

const AccountModal = ({ modalText, open, handleClose }: IModalProps) => {
  return (
    <div>
      <WrapModalSt
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style }}>
          <TypographySt id="parent-modal-description">{modalText}</TypographySt>
        </Box>
      </WrapModalSt>
    </div>
  )
}

export default AccountModal
