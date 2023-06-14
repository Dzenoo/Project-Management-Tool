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

const MainModal = ({
  isOpen,
  close,
  text,
  title,
  onClick,
  content,
  disabled,
  showButtons,
}) => {
  return (
    <Modal
      open={isOpen}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h5" fontWeight="bold">
          {title}
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={{ mt: 2, mb: 2 }}
          color="textSecondary"
        >
          {text}
        </Typography>
        {content}
        <Box
          sx={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
            display: "flex",
            gap: "12px",
          }}
        >
          {showButtons && (
            <>
              <Button variant="outlined" onClick={close}>
                Cancel
              </Button>

              <Button variant="contained" onClick={onClick} disabled={disabled}>
                Confirm
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default MainModal;
