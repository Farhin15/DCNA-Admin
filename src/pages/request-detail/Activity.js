import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { SmileOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

// material-ui
import {
    Box,
    Grid,
    Typography,
    AccordionDetails,
    Stack,
    Tab,
    Tabs,
} from '@mui/material';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';

function createData(eventName, eventStartDate, eventEndDate, eventStatus) {
    return { eventName, eventStartDate, eventEndDate, eventStatus };
}

function TabPanel({ children, value, index, ...other }) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`profile-tabpanel-${index}`} aria-labelledby={`profile-tab-${index}`} {...other}>
            {value === index && children}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

// ==============================|| ORDER TABLE ||============================== //

export default function Activity() {
    const theme = useTheme();
    const [expanded, setExpanded] = React.useState('');

    // const handleChange = (panel) => {
    //     setExpanded(panel == expanded ? '' : panel);
    // };


    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function tabProps(index) {
        return {
            id: `profile-tab-${index}`,
            'aria-controls': `profile-tabpanel-${index}`
        };
    }
    return (
        <>
            <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                <Grid item xs={12} md={12} lg={12}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs
                            variant="fullWidth"
                            value={value}
                            onChange={handleChange}
                            aria-label="activity tabs"
                        >
                            <Tab
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textTransform: 'capitalize'
                                }}
                                // icon={<UserOutlined style={{ marginBottom: 0, marginRight: '10px' }} />}
                                label="Customer Communication"
                                {...tabProps(0)}
                            />
                            <Tab
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textTransform: 'capitalize'
                                }}
                                // icon={<SettingOutlined style={{ marginBottom: 0, marginRight: '10px' }} />}
                                label="Internal Comment"
                                {...tabProps(1)}
                            />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        <Stack spacing={2} sx={{ m: 2 }}>
                            <Typography variant="h5">Customer Communication,</Typography>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </Typography>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </Typography>
                        </Stack>
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        <Stack spacing={2} sx={{ m: 2 }}>
                            <Typography variant="h5">Internal Comment,</Typography>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </Typography>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </Typography>
                        </Stack>
                    </TabPanel>
                </Grid>
            </Grid>
        </>
    );
}
