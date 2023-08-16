import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import { Box, Chip, Grid, Stack, Typography, Paper } from '@mui/material';
import moment from "moment";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        // maxWidth: 345
    }
});

export default function Message({ message }) {
    const classes = useStyles();
    // const dateForamt = moment(message?.timestamp).format('MMMM Do YYYY, h:mm a')
    const dateForamt = moment(message?.timestamp).format('yyyy-MM-DD hh:mm');
    return (
        // <Card className={classes.root}>
        <Paper variant="outlined">
            <CardContent>
                <Grid container justifyContent="space-between" alignItems="center">
                    {/* <Grid item> */}
                    <Typography gutterBottom variant="h4" component="h3">
                        {message?.recipient_name}
                    </Typography>
                    {/* </Grid>  */}
                    <Grid item>
                        <Typography gutterBottom variant="h6" component="h3">
                            {dateForamt}
                        </Typography>
                    </Grid>
                </Grid>
                <Divider />
                {/* <Typography gutterBottom variant="h5" component="h3">
                    {message?.template_id?.name}
                </Typography> */}

                <Typography sx={{ mt: 2 }} variant="body1" color="textSecondary" component="p">
                    {/* {message?.message ?? message?.template_id?.description
                        ?? ""} */}
                    {message?.message ?? ""}
                </Typography>
                <Grid item >

                    <span dangerouslySetInnerHTML={{ __html: message?.template_id?.content }}></span >

                </Grid>
            </CardContent>
        </Paper>
        // </Card>
    );
}
