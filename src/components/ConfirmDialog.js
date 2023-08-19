import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography, Divider, Grid } from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
export default function ConfirmDialog() {
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
                Open form dialog
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    <Grid container alignItems="center">
                        <Grid item>
                            <CancelIcon sx={{ mr: 0.5, mt: 0.8, color: 'red' }} />
                        </Grid>
                        <Grid item>
                            <Typography variant="h5">Delete</Typography>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <DialogContentText>
                        <Typography variant="subtitle1">Are you sure, you want to delete this Template?</Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={handleClose}>Yes</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}