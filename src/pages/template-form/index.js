// material-ui
import { Typography, Grid, Button, Box } from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';

// project import
import MainCard from 'components/MainCard';
import Template from './TemplateForm';

// ==============================|| TEMPLATES ||============================== //

const TemplateForm = () => {
    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12} md={12} lg={12}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">New Template</Typography>
                    </Grid>
                    {/* <Grid item /> */}
                </Grid>
                <MainCard sx={{ m: 2, p: 3 }} content={false}>
                    <Grid item xs={12} md={12} lg={8}>
                        <Box sx={{ mt: 2, alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                            <Template />
                        </Box>
                    </Grid>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default TemplateForm;
