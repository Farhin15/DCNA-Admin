// material-ui
import { Typography, Grid, Button, IconButton } from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';
import DownloadIcon from '@mui/icons-material/Download';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import { useNavigate } from "react-router-dom";

// project import
import MainCard from 'components/MainCard';
import Search from 'layout/MainLayout/Header/HeaderContent/Search';
import TemplatesTable from './templatesTable';

// ==============================|| TEMPLATES ||============================== //

const Templates = () => {
    const navigate = useNavigate();

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12} md={12} lg={12}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Templates</Typography>
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
                                        onClick={() => navigate('/templates/detail', { replace: true })}
                                    >
                                        New Template
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* <Grid item /> */}
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <TemplatesTable />
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default Templates;
