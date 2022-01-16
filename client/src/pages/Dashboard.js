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
    Modal
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
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_LIST } from '../utils/queries';
import { ADD_LIST } from '../utils/mutations';
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

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

function Dashboard() {
    // Inventory add and state
    const [modalOpen, setModalOpen] = useState(false);
    const [formState, setFormState] = useState({ listName: '' });
    const [addList] = useMutation(ADD_LIST);
    const handleMOpen = () => setModalOpen(true);
    const handleMClose = (e) => {
        e.stopPropagation();
        setModalOpen(false);
    };

    // Left Menu state
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    // Grabing User lists
    const username = Auth.getProfile().data.username;
    const { loading, data } = useQuery(QUERY_LIST, {
        variables: { username: username }
    });
    const lists = data?.lists || [];
    if (loading) {
        return <div>Loading...</div>
    }
    console.log(lists)


    const handleChange = event => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const handleSubmit = async event => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        try {
            const mutationResponse = await addList({
                variables: {
                    listName: data.get('listName'),
                }
            })

            console.log(mutationResponse.data.addList);
        } catch (error) {
            console.log(error);
        }

        // Reseting form to be blank
        setFormState({
            listName: ''
        });
    };


    // Full list name when left menu open
    const userListNames = lists.map((list, index) =>
        <ListItem key={index} disableGutters>
            <ListItemButton>
                <ListItemText primary={list.listName} sx={{
                    textAlign: 'center'
                }} />
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
                                sx={{ '&:hover': { color: 'green' } }}
                                onClick={handleMOpen}
                            >
                                <Modal
                                    open={modalOpen}
                                    onClose={handleMClose}
                                    aria-labelledby="add-inv-modal"
                                    aria-describedby="adding-list"
                                >
                                    <Box sx={modalStyle}>
                                        <Typography id="add-inv-modal" variant='h5'>
                                            Add an Inventory
                                        </Typography>
                                        <Typography id="adding-list">
                                            lkdjflksjdf
                                        </Typography>
                                    </Box>
                                </Modal>
                                <AddRoundedIcon />
                            </IconButton>
                        </>
                    ) : (
                        <>
                            <Typography variant="h6">
                                Add List
                            </Typography>
                            <IconButton
                                sx={{ '&:hover': { color: 'green' } }}
                                onClick={handleMOpen}
                            >
                                <Modal
                                    open={modalOpen}
                                    onClose={handleMClose}
                                    aria-labelledby="add-inv-modal"
                                    aria-describedby="adding-list"
                                >
                                    <Box sx={modalStyle}>
                                        <Typography id="add-inv-modal" variant='h5'>
                                            Add an Inventory
                                        </Typography>
                                        <Typography id="adding-list">
                                            lkdjflksjdf
                                        </Typography>
                                    </Box>
                                </Modal>
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