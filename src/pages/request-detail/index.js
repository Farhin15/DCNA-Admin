// material-ui
import { Typography, Grid, Button, IconButton } from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';
import DownloadIcon from '@mui/icons-material/Download';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import PropTypes from 'prop-types';

// project import
import MainCard from 'components/MainCard';
import RequestInfo from './RequestDetail';
import EventsTable from './EventTable';
import Info from './Info';
import Activity from './Activity';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchRequestById } from 'store/reducers/requestSlice';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import CommunicationForm from './communication/CommunicationForm.js'

// ==============================|| REQUESTS ||============================== //

const RequestDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [requestDetail, setReuestDetail] = useState(null)
    const [open, setOpen] = useState(false);
    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState('sm');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleMaxWidthChange = (event) => {
        setMaxWidth(
            // @ts-expect-error autofill of arbitrary value is not handled.
            event.target.value,
        );
    };

    const handleFullWidthChange = (event) => {
        setFullWidth(event.target.checked);
    };

    useEffect(() => {
        if (id) {
            dispatch(fetchRequestById(id))
                .unwrap()
                .then((res) => {
                    console.log(res.data);
                    let data = res.data;
                    setReuestDetail(data)
                })
                .catch(error => console.log(error));
        }
    }, [])

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12} md={12} lg={12}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Data Subject Request Detail</Typography>
                    </Grid>
                    <Grid item>
                        <Grid container columnSpacing={0.5} alignItems="center" justifyContent="end">
                            <Grid item>
                                <AnimateButton>
                                    <Button
                                        sx={{
                                            fontSize: '0.875rem',
                                            borderRadius: '100px'
                                        }}
                                        disableElevation
                                        fullWidth
                                        size="medium"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Refresh
                                    </Button>
                                </AnimateButton>
                            </Grid>
                            <Grid item>
                                <IconButton variant="contained" shape="rounded" aria-label="upload picture">
                                    <WatchLaterOutlinedIcon />
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <AnimateButton>
                                    <Button
                                        sx={{
                                            fontSize: '0.875rem',
                                            borderRadius: '100px'
                                        }}
                                        disableElevation
                                        fullWidth
                                        size="medium"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        onClick={handleClickOpen}
                                    >
                                        Customer Communication
                                    </Button>
                                </AnimateButton>
                            </Grid>
                            <Grid item>
                                <AnimateButton>
                                    <Button
                                        sx={{
                                            fontSize: '0.875rem',
                                            borderRadius: '100px'
                                        }}
                                        disableElevation
                                        fullWidth
                                        size="medium"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Internal Comment
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* <Grid item /> */}
                </Grid>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography component={Link} to="/requests" variant="label" sx={{ textDecoration: 'none' }} color="primary">
                            Requests
                        </Typography>
                    </Grid>
                    {/* <Grid item /> */}
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <RequestInfo requestDetail={requestDetail} />
                </MainCard>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <EventsTable />
                </MainCard>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <Info />
                </MainCard>
                <Typography sx={{ mt: 2, paddingLeft: '5px' }} variant="h5">Activity</Typography>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <Activity />
                </MainCard>
            </Grid>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Communication</DialogTitle>
                <DialogContent>
                    <CommunicationForm close={handleClose} />
                </DialogContent>
                {/* <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions> */}
            </Dialog>
        </Grid>
    );
};

export default RequestDetail;
