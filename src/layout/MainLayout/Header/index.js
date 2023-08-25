import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { AppBar, IconButton, Toolbar, useMediaQuery, Stack, Typography, Box } from '@mui/material';

// project import
import AppBarStyled from './AppBarStyled';
import HeaderContent from './HeaderContent';
import navigation from 'menu-items';

// assets
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

// ==============================|| MAIN LAYOUT - HEADER ||============================== //

const Header = ({ open, handleDrawerToggle }) => {
    const theme = useTheme();
    const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));
    const menu = useSelector((state) => state.menu.menu);
    const [title, setTitle] = useState('');
    const iconBackColor = 'grey.100';
    const iconBackColorOpen = 'grey.200';

    const getCollapse = (menu) => {
        if (menu.children?.length) {
            menu.children.filter((collapse) => {
                if (collapse.type && collapse.type === 'collapse') {
                    getCollapse(collapse);
                } else if (collapse.type && collapse.type === 'item') {
                    if (location.pathname === collapse.url) {
                        setTitle(collapse.title);
                        // setMain(menu);
                        // setItem(collapse);
                    }
                }
                return false;
            });
        }
    };

    useEffect(() => {
        navigation?.items?.map((menu) => {
            if (menu.type && menu.type === 'group') {
                getCollapse(menu);
            }
            return false;
        });
    }, [menu])
    // common header
    const mainHeader = (
        <Toolbar sx={{ bgcolor: '#1ba61b', color: '#ffffff' }}>
            <IconButton
                disableRipple
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                edge="start"
                color="secondary"
                sx={{ color: 'text.primary', bgcolor: open ? iconBackColorOpen : iconBackColor, ml: { xs: 0, lg: -2 } }}
            >
                {!open ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </IconButton>
            {/* {title} */}
            <Stack direction="row" spacing={2} alignItems="center" sx={{ px: 2 }}>
                {/* <Avatar alt="profile user" src={avatar1} sx={{ width: 32, height: 32 }} /> */}
                <Typography variant="h5">
                    <Box sx={{ color: '#000080' }}>
                        {title}
                    </Box>
                </Typography>
            </Stack>
            <HeaderContent />
        </Toolbar>
    );

    // app-bar params
    const appBar = {
        position: 'fixed',
        color: 'inherit',
        elevation: 0,
        sx: {
            borderBottom: `1px solid ${theme.palette.divider}`
            // boxShadow: theme.customShadows.z1
        }
    };

    return (
        <>
            {!matchDownMD ? (
                <AppBarStyled open={open} {...appBar}>
                    {mainHeader}
                </AppBarStyled>
            ) : (
                <AppBar {...appBar}>{mainHeader}</AppBar>
            )}
        </>
    );
};

Header.propTypes = {
    open: PropTypes.bool,
    handleDrawerToggle: PropTypes.func
};

export default Header;
