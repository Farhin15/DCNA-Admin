import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import { Box, Chip, Grid, Stack, Typography } from '@mui/material';
import moment from "moment";

const useStyles = makeStyles({
    root: {
        // maxWidth: 345
    }
});

export default function Message({ message }) {
    const classes = useStyles();
    const dateForamt = moment(message?.timestamp).format('LL')
    return (
        <Card className={classes.root}>
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
                <Typography gutterBottom variant="h5" component="h3">
                    {message?.template_id?.name}
                </Typography>

                <Typography variant="body1" color="textSecondary" component="p">
                    {message?.message ?? message?.template_id.description
                        ?? ""}
                </Typography>
                <Grid item >

                    <span dangerouslySetInnerHTML={{ __html: message?.template_id?.content }}></span >

                </Grid>
            </CardContent>
        </Card>
    );
}
