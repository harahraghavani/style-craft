// MUI Imports
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";

// Component Imports
import DialogCloseButton from "./DialogCloseButton";

const CommonModal = ({
  isOpen,
  handleClose,
  title = "",
  subTitle = "",
  children,
  maxWidth = "sm",
}) => {
  return (
    <Dialog
      fullWidth
      open={isOpen}
      maxWidth={maxWidth}
      scroll="body"
      sx={{ "& .MuiDialog-paper": { overflow: "visible" } }}
    >
      <DialogCloseButton onClick={handleClose} disableRipple>
        <i className="tabler-x" />
      </DialogCloseButton>
      <DialogTitle variant="h4" className="flex flex-col gap-2 text-center ">
        {title}
        <Typography component="span" className="flex flex-col text-center">
          {subTitle}
        </Typography>
      </DialogTitle>
      <DialogContent className="overflow-visible ">{children}</DialogContent>
    </Dialog>
  );
};

export default CommonModal;
