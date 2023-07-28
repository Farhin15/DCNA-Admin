import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import { Box, Chip, Grid, Stack, Typography } from '@mui/material';

const useStyles = makeStyles({
    root: {
        // maxWidth: 345
    }
});

export default function Message({ message }) {
    const classes = useStyles();

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
                            {message?.timestamp}
                        </Typography>
                    </Grid>
                </Grid>
                <Typography variant="body1" color="textSecondary" component="p">
                    {message?.message ?? ''}
                </Typography>
            </CardContent>
        </Card>
    );
}
