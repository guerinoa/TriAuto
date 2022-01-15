import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const FormDialog = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Info
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            { props.message}
          </DialogContentText>

          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Do you approve?" labelPlacement="start" />
          </FormGroup>
          <DialogContentText>
            If not enter a new risk level
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Risk"
            type="integer"
            variant="standard"
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FormDialog;