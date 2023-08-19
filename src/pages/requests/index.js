// material-ui
import { Typography, Grid, Button, IconButton } from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';
import DownloadIcon from '@mui/icons-material/Download';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';

// project import
import MainCard from 'components/MainCard';
import RequestsTable from './RequestsTable';
import Search from 'layout/MainLayout/Header/HeaderContent/Search';
import { useState } from 'react';

// ==============================|| REQUESTS ||============================== //

const Requests = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [isExport, setIsExport] = useState(false)

    const onSearch = (val) => {
        setSearchTerm(val)
    }

    const ExportData = () => {
        setIsExport(true);
        setTimeout(() => {
            setIsExport(false);
        }, 500);
    }
    return (
        <Grid container rowSpacing={0} columnSpacing={2.75}>
            <Grid item xs={12} md={12} lg={12}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        {/* <Typography variant="h5">Requests</Typography> */}
                    </Grid>
                    <Grid item>
                        <Grid container columnSpacing={0.5} alignItems="center" justifyContent="end">
                            <Grid item>
                                <Search onSearch={onSearch} placeHolder="Search" />
                                {/* <Typography variant="strong">0 SELECTED</Typography> */}
                            </Grid>
                            {/* <Grid item>
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
                            </Grid> */}
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
                                        color="secondary"
                                        onClick={ExportData}
                                    >
                                        {/* <IconButton size="small" sx={{ color: '#FFFFFF' }} variant="contained" shape="rounded"> */}
                                        <DownloadIcon />
                                        {/* </IconButton> */}
                                        Export
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* <Grid item /> */}
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <RequestsTable searchTerm={searchTerm} isExport={isExport} />
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default Requests;
