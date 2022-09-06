import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styled from "styled-components";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
  whiteSpace: "nowrap",
};

export default function ModalImage({ src }) {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <img
        onClick={() => setOpen(true)}
        src={src}
        style={{ cursor: "pointer", width: "200px" }}
        alt=""
      />

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Image src={src} />
        </Box>
      </Modal>
    </div>
  );
}

const Image = styled.img`
  width: 400px;
  @media (max-width: 576px) {
    width: 300px;
  }
`;
