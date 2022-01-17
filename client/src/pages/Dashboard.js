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
    Modal,
    Stack,
    TextField,
    Button
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
import Content from '../components/Dashboard/content';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_LIST } from '../utils/queries';
import { ADD_LIST, REMOVE_LIST } from '../utils/mutations';
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

// Styling of modal
const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}



export default function Dashboard() {
    // Inventory state and mutations
    const [modalOpen, setModalOpen] = useState(false);
    const [formState, setFormState] = useState({ listName: '' });
    const [listIndex, setListIndex] = useState({ index: 0 });
    const [addList] = useMutation(ADD_LIST);
    const [removeList] = useMutation(REMOVE_LIST);

    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = (e) => {
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
    // console.log(lists)

    // Checking and saving stuff added in the add inv textfield
    const handleChange = event => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    // Sending add inv data to server
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

        window.location.reload(false);
    };

    // List delete button pressed
    const handleDelete = async event => {
        const listID = event.currentTarget.id;
        try {
            await removeList({
                variables: {
                    id: listID
                }
            });

        } catch (error) {
            console.log(error)
        }

        window.location.reload(false);
    };

    const selectedListContent = (event) => {
        const { id } = event.currentTarget;
        setListIndex({
            ...listIndex,
            index: id
        });
    }

    // Full list name when left menu open
    const userListNames = lists.map((list, index) =>
        <ListItem key={index} disableGutters>
            <ListItemButton
                id={index}
                name={list.listName}
                onClick={selectedListContent}
            >
                <ListItemText primary={list.listName} sx={{
                    textAlign: 'center'
                }} />
                <IconButton
                    sx={{
                        '&:hover': {
                            color: 'red'
                        }
                    }}
                    id={list._id}
                    onClick={handleDelete}
                >
                    <DeleteForeverRoundedIcon />
                </IconButton>
            </ListItemButton>
        </ListItem>
    );

    // Number for list when left menu is closed
    const userListID = lists.map((list, index) =>
        <ListItem key={index} disableGutters>
            <ListItemButton
                disableGutters
                id={index}
                name={list.listName}
                onClick={selectedListContent}
            >
                <ListItemText primary={index + 1} sx={{
                    textAlign: 'center'
                }} />
            </ListItemButton>
        </ListItem>
    );

    // Displays the content for the selected list in the left menu
    const listItems = [
        <>
            <Content
                listName={lists[listIndex.index].listName}
                listID={lists[listIndex.index]._id}
                items={lists[listIndex.index].items}
            />
        </>
    ];

    return (
        <Box
            sx={{
                display: 'flex',
                height: '100vh'
            }}
        >

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
                                onClick={handleModalOpen}
                            >
                                <Modal
                                    open={modalOpen}
                                    onClose={handleModalClose}
                                    aria-labelledby="add-inv-modal"
                                    aria-describedby="adding-list"
                                >
                                    <Box sx={modalStyle}>
                                        <Typography
                                            id="add-inv-modal"
                                            variant='h5'
                                            sx={{
                                                textAlign: 'center'
                                            }}
                                        >
                                            Add an Inventory
                                        </Typography>
                                        <Stack direction="row" spacing={2}>
                                            <Box component="form" onSubmit={handleSubmit}>

                                                {/* Temporary list input */}
                                                <TextField
                                                    sx={{ m: 2 }}
                                                    margin="normal"
                                                    required
                                                    id="listName"
                                                    label="New Inventory"
                                                    name="listName"
                                                    autoComplete="listName"
                                                    autoFocus
                                                    value={formState.listName}
                                                    onChange={handleChange}
                                                />

                                                <Button
                                                    sx={{ m: 3 }}
                                                    type="submit"
                                                    variant="contained">
                                                    Add Inv
                                                </Button>
                                            </Box>
                                        </Stack>
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
                                onClick={handleModalOpen}
                            >
                                <Modal
                                    open={modalOpen}
                                    onClose={handleModalClose}
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

            {listItems}

        </Box>
    );
};