import { useDispatch, useSelector } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import { Icon } from "@material-ui/core";
import { clear } from "store/reducers/snackbarSlice";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function SuccessSnackbar() {
    const dispatch = useDispatch();

    const message = useSelector(
        state => state.snack
    );
    console.log(message);
    const { snackbarMessage, successSnackbarOpen, errorSnackbarOpen } = useSelector(
        state => state.snack
    );
    function handleClose() {
        dispatch(clear());
    }

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={successSnackbarOpen || errorSnackbarOpen}
            autoHideDuration={4000} onClose={handleClose}>
            <Alert sx={{ color: '#ffffff' }} severity={successSnackbarOpen ? "success" : errorSnackbarOpen ? "error" : "info"} variant="filled" onClose={handleClose}>
                {snackbarMessage ?? 'This is a message!'}
            </Alert>
        </Snackbar>
    );
}