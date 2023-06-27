import React from 'react';
import { useTheme } from '@mui/material/styles';
import { SmileOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';

// material-ui
import { Box, Stack, Typography, AccordionDetails, Accordion, AccordionSummary } from '@mui/material';


function createData(eventName, eventStartDate, eventEndDate, eventStatus) {
    return { eventName, eventStartDate, eventEndDate, eventStatus };
}


// ==============================|| ORDER TABLE ||============================== //

export default function Info() {
    const theme = useTheme();
    const [expanded, setExpanded] = React.useState('');

    const handleChange = (panel) => {
        setExpanded(panel == expanded ? '' : panel);
    };

    return (
        <Box
            sx={{
                '& .MuiAccordion-root': {
                    borderColor: theme.palette.divider,
                    '& .MuiAccordionSummary-root': {
                        bgcolor: 'transparent',
                        flexDirection: 'row'
                    },
                    '& .MuiAccordionDetails-root': {
                        borderColor: theme.palette.divider
                    },
                    '& .Mui-expanded': {
                        color: theme.palette.primary.main
                    }
                }
            }}
        >
            <Accordion expanded={expanded === 'panel1'} onChange={() => handleChange('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Stack direction="row" justifyContent="center" spacing={100} alignItems="center">
                        {/* <SmileOutlined /> */}
                        <Typography variant="h6">View Info {expanded === 'panel1' ? <UpOutlined /> : <DownOutlined />}</Typography>
                    </Stack>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack spacing={2}>
                        <Typography variant="h5">Lorem ipsum dolor sit amet,</Typography>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </Typography>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </Typography>
                    </Stack>
                </AccordionDetails>
            </Accordion>
        </Box >
    );
}
