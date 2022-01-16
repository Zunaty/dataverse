// Importing React
import * as React from 'react';
import { useState } from 'react';

// Importing MUI Components
import {
    Typography,
    Box,
    Toolbar,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Divider,
    IconButton,
    Container,
    Grid,
    Paper,
    Popover
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';

// Importing MUI Icons
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

// Importing Utils
import Chart from '../components/Dashboard/chart';
import { useQuery } from '@apollo/client';
import { QUERY_LIST } from '../utils/queries';
import Auth from '../utils/auth';

// Left Menu Animation/Styling
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: 240,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

function Dashboard() {
    const [invAdd, setInvAdd] = useState(null);
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const username = Auth.getProfile().data.username;
    const { loading, data } = useQuery(QUERY_LIST, {
        variables: { username: username }
    });

    const lists = data?.lists || [];

    if (loading) {
        return <div>Loading...</div>
    }

    console.log(lists)

    // Full list name when left menu open
    const userListNames = lists.map((list, index) =>
        <ListItem key={index} disableGutters>
            <ListItemButton>
                <ListItemText primary={list.listName} sx={{
                    textAlign: 'center'
                }}/>
                <IconButton sx={{
                    '&:hover': {
                        color: 'red'
                    }
                }}>
                    <DeleteForeverRoundedIcon />
                </IconButton>
            </ListItemButton>
        </ListItem>
    );

    // Number for list when left menu is closed
    const userListID = lists.map((list, index) =>
        <ListItem key={index} disableGutters>
            <ListItemButton disableGutters>
                <ListItemText primary={index + 1} sx={{
                    textAlign: 'center'
                }} />
            </ListItemButton>
        </ListItem>
    );

    const handleAddPoP = (event) => {
        setInvAdd(event.currentTarget);
    };

    const handleAddClose = () => {
        setInvAdd(null);
    };

    const popOpen = Boolean(invAdd);
    const popID = popOpen ? 'simple-popover' : undefined;

    // const [itemsState, setItemsState] = useState({ itemName: '', itemDes: '', itemPrice: 0, itemQuantity: 0, itemID: ''  })

    return (
        <Box sx={{ display: 'flex' }}>

            {/* This is the left side menu */}
            <Drawer variant="permanent" open={open}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        px: [1],
                    }}
                >
                    <IconButton onClick={toggleDrawer}>
                        {open ? (
                            <>
                                <ChevronLeftRoundedIcon />
                            </>
                        ) : (
                            <>
                                <ChevronRightRoundedIcon />
                            </>
                        )}
                    </IconButton>
                </Toolbar>

                <Divider />

                {/* Add New List/Inv */}
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        px: [1],
                    }}
                >
                    {!open ? (
                        <>
                            <IconButton 
                                sx={{ '&:hover': {color: 'green'}}}
                                aria-describedby={popID}
                                onClick={handleAddPoP}
                            >
                                <Popover
                                    id={popID}
                                    open={popOpen}
                                    anchorEl={invAdd}
                                    onClose={handleAddClose}
                                    anchorOrigin={{
                                        vertical: 'center',
                                        horizontal: 'center'
                                    }}
                                    transformOrigin={{
                                        vertical: 'center',
                                        horizontal: 'center'
                                    }}
                                >

                                </Popover>
                                <AddRoundedIcon />
                            </IconButton>
                        </>
                    ) : (
                        <>
                            <Typography variant="h6">
                                Add List
                            </Typography>
                            <IconButton sx={{ '&:hover': {color: 'green'}}}>
                                <AddRoundedIcon />
                            </IconButton>
                        </>
                    )}
                </Toolbar>

                <Divider />

                {/* Current lists for user */}
                <List>
                    <Toolbar
                        sx={{
                            display: 'block',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {!open ? (
                            <>
                                <FormatListBulletedRoundedIcon />
                                {userListID}
                            </>
                        ) : (
                            <>
                                {/* <Typography variant="h6" mr={1}>
                                    {"Current Inventories"}
                                </Typography> */}
                                {userListNames}
                            </>
                        )}
                    </Toolbar>
                </List>
            </Drawer>

            {/* This box is the back of main view */}
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[200]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar />
                <Container maxWidth="lg" sx={{ mb: 4 }}>
                    <Grid container spacing={3}>

                        {/* Item Chart Box */}
                        <Grid item xs={12} md={8} lg={9}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 400,
                                }}
                            >
                                {/* Graph / Chart */}
                                <Chart />
                            </Paper>
                        </Grid>

                        {/* Item Details */}
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 400,
                                }}
                            >
                                Item Name

                                <br />
                                <br />
                                <br />
                                Item Des

                                <br />
                                <br />
                                <br />
                                <br />
                                edit item / delete item buttons

                            </Paper>
                        </Grid>

                        {/* Showing all items in list */}
                        <Grid item xs={12}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                All items that are part of this list show here
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}

export default Dashboard;