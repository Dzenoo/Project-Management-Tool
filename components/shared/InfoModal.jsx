"use client";
import { Box, Button, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: "fit-content",
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 12,
  p: 4,
};

const InfoModal = ({ isOpen, text, onCancel }) => {
  return (
    <Modal
      open={isOpen}
      onClose={onCancel}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-description"
          sx={{ mt: 2, mb: 2 }}
          color="textSecondary"
        >
          {text}
        </Typography>
        <Box>
          <Button variant="contained" onClick={onCancel}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default InfoModal;
