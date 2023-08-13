import { useDispatch, useSelector } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import { Icon } from "@material-ui/core";
import { clear } from "store/reducers/snackbarSlice";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import './loader.css'
import { CircularProgress } from '@material-ui/core';

export default function LoderComponent() {
    const dispatch = useDispatch();

    const message = useSelector(
        state => state.snack
    );
    const { isLoading } = useSelector(
        state => state.loader
    );
    function handleClose() {
        dispatch(clear());
    }

    return (
        <>
            {isLoading ? <div className="loader">
                <div className="loader-center">
                    <CircularProgress
                        size={70} />
                </div>
            </div> : <></>}
        </>
    );
}