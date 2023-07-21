import { useDispatch, useSelector } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import { Icon } from "@material-ui/core";
import { clear } from "store/reducers/snackbarSlice";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Loader from "./Loader";

export default function LoaderSlider() {
    const dispatch = useDispatch();

    const message = useSelector(
        state => state.loader
    );
    console.log(message);
    const { isLoading } = useSelector(
        state => state.loader
    );
    function handleClose() {
        dispatch(clear());
    }

    return isLoading ? <Loader /> : <></>
}