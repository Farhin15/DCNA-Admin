// material-ui
import { Typography, List, ListItemButton, ListItemText, Grid } from '@mui/material';
// project import
import MainCard from 'components/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

const RequestInfo = ({ requestDetail }) => (
    <MainCard content={false} >
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12} md={12} lg={6}>
                <List sx={{ p: 2, }}>
                    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                        <Grid item xs={6} md={6} lg={6}><ListItemText primary="Name:" /></Grid>
                        <Grid item xs={6} md={6} lg={6}>
                            <Typography variant="span">{requestDetail?.first_name} {requestDetail?.last_name}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                        <Grid item xs={6} md={6} lg={6}><ListItemText primary="Request Types:" /></Grid>
                        <Grid item xs={6} md={6} lg={6}>
                            <Typography variant="span">{requestDetail?.request_type ?? '-'}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                        <Grid item xs={6} md={6} lg={6}><ListItemText primary="Source:" /></Grid>
                        <Grid item xs={6} md={6} lg={6}>
                            <Typography variant="span">7DA Email Form</Typography>
                        </Grid>
                    </Grid>
                    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                        <Grid item xs={6} md={6} lg={6}><ListItemText primary="Email:" /></Grid>
                        <Grid item xs={6} md={6} lg={6}>
                            <Typography variant="span">{requestDetail?.email ?? '-'}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                        <Grid item xs={6} md={6} lg={6}><ListItemText primary="Stage:" /></Grid>
                        <Grid item xs={6} md={6} lg={6}>
                            <Typography variant="span">Email Verification Expired</Typography>
                        </Grid>
                    </Grid>
                    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                        <Grid item xs={6} md={6} lg={6}><ListItemText primary="Days Left:" /></Grid>
                        <Grid item xs={6} md={6} lg={6}>
                            <Typography variant="span">0</Typography>
                        </Grid>
                    </Grid>
                    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                        <Grid item xs={6} md={6} lg={6}><ListItemText primary="Is California Resident:" /></Grid>
                        <Grid item xs={6} md={6} lg={6}>
                            <Typography variant="span">{requestDetail?.state == 'CA' ? 'Yes' : 'No'}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                        <Grid item xs={6} md={6} lg={6}><ListItemText primary="Request Detail:" /></Grid>
                        <Grid item xs={6} md={6} lg={6}>
                            <Typography variant="span">{requestDetail?.request_details ?? '-'}</Typography>
                        </Grid>
                    </Grid>
                </List>
                {/* <Typography variant="body2">
            Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa. Ut enif
            ad minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube grue dolor in
            reprehended in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non president, sunk in culpa
            qui officiate descent molls anim id est labours.
        </Typography> */}
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
                <List sx={{ p: 2, }}>
                    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                        <Grid item xs={6} md={6} lg={6}><ListItemText primary="Requestor Type:" /></Grid>
                        <Grid item xs={6} md={6} lg={6}>
                            <Typography variant="span">{requestDetail?.requestor_type ?? '-'}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                        <Grid item xs={6} md={6} lg={6}><ListItemText primary="Brand:" /></Grid>
                        <Grid item xs={6} md={6} lg={6}>
                            <Typography variant="span">-</Typography>
                        </Grid>
                    </Grid>
                    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                        <Grid item xs={6} md={6} lg={6}><ListItemText primary="Country" /></Grid>
                        <Grid item xs={6} md={6} lg={6}>
                            <Typography variant="span">United States Of America</Typography>
                        </Grid>
                    </Grid>
                    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                        <Grid item xs={6} md={6} lg={6}><ListItemText primary="Loyalty Id:" /></Grid>
                        <Grid item xs={6} md={6} lg={6}>
                            <Typography variant="span">-</Typography>
                        </Grid>
                    </Grid>
                    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                        <Grid item xs={6} md={6} lg={6}><ListItemText primary="Profile Email:" /></Grid>
                        <Grid item xs={6} md={6} lg={6}>
                            <Typography variant="span">{requestDetail?.email ?? '-'}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                        <Grid item xs={6} md={6} lg={6}><ListItemText primary="Mobile Number" /></Grid>
                        <Grid item xs={6} md={6} lg={6}>
                            <Typography variant="span">+1 72374587</Typography>
                        </Grid>
                    </Grid>
                </List>
                {/* <Typography variant="body2">
            Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa. Ut enif
            ad minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube grue dolor in
            reprehended in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non president, sunk in culpa
            qui officiate descent molls anim id est labours.
        </Typography> */}
            </Grid>
        </Grid>
    </MainCard>
);

export default RequestInfo;
