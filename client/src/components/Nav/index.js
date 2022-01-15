// Importing React
import * as React from 'react';

// Importing MUI Components
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Link,
    List,
    ListItem,
    ListItemButton,
    ListItemText
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

// Util Import
import Auth from '../../utils/auth';

function Nav() {
    // Menu open and close
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // Login, Signup, and Logout actions
    const login = () => {
        window.location.href="/login"
    };
    const signup = () => {
        window.location.href="/signup"
    };
    const logout = event => {
        event.preventDefault();
        Auth.logout();
    };

    // Menu
    const menuId = 'menu-pop';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'center',
                horizontal: 'center',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
            MenuListProps={{'aria-labelledby': 'basic-button'}}
        >
            <List>
                {Auth.loggedIn() ? (
                    <>
                        <ListItem disablePadding>
                            <ListItemButton onClick={logout}>
                                <ListItemText primary="Logout" />
                            </ListItemButton>
                        </ListItem>
                    </>
                ) : (
                    <>
                        <ListItem disablePadding>
                            <ListItemButton onClick={login}>
                                <ListItemText primary="Login" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={signup}>
                                <ListItemText primary="Signup" />
                            </ListItemButton>
                        </ListItem>
                    </>
                )}
            </List>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    {/* App Title */}
                    <Typography
                        variant="h5"
                        noWrap
                        component="div"
                    >
                        <Link href="/" underline="none" color="inherit">DataVerse</Link>
                    </Typography>

                    {/* Hidden box */}
                    <Box sx={{ flexGrow: 1 }} />

                    {/* Menu Button */}
                    <Box >
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="menu"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleMenuOpen}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </Box>
    );
};

export default Nav;