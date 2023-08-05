import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Stack, Chip, Typography } from '@mui/material';

// project import
import DrawerHeaderStyled from './DrawerHeaderStyled';
import Logo from 'components/Logo';
import img from '../../../../assets/images/logo/DCNA11.png'

// ==============================|| DRAWER HEADER ||============================== //

const DrawerHeader = ({ open }) => {
    const theme = useTheme();

    return (
        // only available in paid version
        <DrawerHeaderStyled justifyContent="center" alignItems="center" theme={theme} open={open}>
            <Stack direction="row" justifyContent="center" spacing={2} alignItems="center">
                {/* <Typography variant="h3">LOGO</Typography> */}
                <img style={{ height: '45px', marginLeft: '45px', marginTop: '15px', marginBottom: '15px', }} src={img} alt="DCNA_LOGO" />
                {/* <Logo /> */}
                {/* <Chip
                    label={process.env.REACT_APP_VERSION}
                    size="small"
                    sx={{ height: 16, '& .MuiChip-label': { fontSize: '0.625rem', py: 0.25 } }}
                    component="a"
                    href="https://github.com/codedthemes/mantis-free-react-admin-template"
                    target="_blank"
                    clickable
                /> */}
            </Stack>
        </DrawerHeaderStyled>
    );
};

DrawerHeader.propTypes = {
    open: PropTypes.bool
};

export default DrawerHeader;
