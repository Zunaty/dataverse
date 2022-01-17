// Importing React
import * as React from 'react';
import { useState } from 'react';

// Importing MUI Components
import {
    Box,
    Toolbar,
    Grid,
    Container,
    Paper,
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    Modal,
    Stack,
    TextField
} from '@mui/material';

// Importing Utils
import { useMutation } from '@apollo/client';
import { ADD_ITEM, UPDATE_ITEM, REMOVE_ITEM } from '../../utils/mutations';
import Chart from './chart';



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



export default function Content({ listName, listID, items }) {
    // Add, Edit, Remove Mutations
    const [addItem] = useMutation(ADD_ITEM);
    const [editItem] = useMutation(UPDATE_ITEM);
    const [removeItem] = useMutation(REMOVE_ITEM);

    // useState for current item, add form, and edit form
    const [currentItem, setCurrentItem] = useState({
        itemID: '',
        itemName: '',
        itemDescription: '',
        itemPrice: '',
        itemQuantity: ''
    });

    const [addForm, setAddForm] = useState({
        itemName: '',
        itemDescription: '',
        itemPrice: '',
        itemQuantity: ''
    });

    const [editForm, setEditForm] = useState({
        itemName: '',
        itemDescription: '',
        itemPrice: '',
        itemQuantity: ''
    })

    // Initial state of modals is false
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

    // Add Item modal handle
    const handleAddModalOpen = () => setAddModal(true);
    const handleAddModalClose = (event) => {
        event.stopPropagation();
        setAddModal(false);
    };

    // Edit Item modal handle
    const handleEditModalOpen = () => setEditModal(true);
    const handleEditModalClose = (event) => {
        event.stopPropagation();
        setEditModal(false);
    };

    // Add Form Change
    const handleAddChange = event => {
        const { name, value } = event.target;
        setAddForm({
            ...addForm,
            [name]: value
        });
    };

    // Edit Form Change
    const handleEditChange = event => {
        const { name, value } = event.target;
        setEditForm({
            ...editForm,
            [name]: value
        });
    };

    // Add submit
    const handleAddSubmit = async event => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        // Grabing qty number from string
        const qtyNumString = data.get('itemQuantity');
        const qtyNum = parseInt(qtyNumString);

        // Grabing price number from string
        const priceNumbString = data.get('itemPrice');
        const priceNum = parseFloat(priceNumbString);

        try {
            const mutationResponse = await addItem({
                variables: {
                    listId: listID,
                    itemName: data.get('itemName'),
                    itemDescription: data.get('itemDescription'),
                    itemQuantity: qtyNum,
                    itemPrice: priceNum
                }
            })

            console.log(mutationResponse.data.addItem);
        } catch (error) {
            console.log(error);
        }

        // Resetting form to be blank
        setAddForm({
            ...addForm,
            itemName: '',
            itemDescription: '',
            itemQuantity: '',
            itemPrice: ''
        });

        window.location.reload(false);
    };

    // Edit Submit
    const handleEditSubmit = async event => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        // Grabing qty number from string
        const qtyNumString = data.get('itemQuantity');
        const qtyNum = parseInt(qtyNumString);

        // Grabing price number from string
        const priceNumbString = data.get('itemPrice');
        const priceNum = parseFloat(priceNumbString);

        try {
            const mutationResponse = await editItem({
                variables: {
                    itemId: currentItem.itemID,
                    itemName: data.get('itemName'),
                    itemDescription: data.get('itemDescription'),
                    itemQuantity: qtyNum,
                    itemPrice: priceNum
                }
            })

            console.log(mutationResponse.data.addItem);
        } catch (error) {
            console.log(error);
        }

        // Resetting form to be blank
        setEditForm({
            ...editForm,
            itemName: '',
            itemDescription: '',
            itemQuantity: '',
            itemPrice: ''
        });

        window.location.reload(false);
    };

    const handleItemDelete = async () => {
        try {
            await removeItem({
                variables: {
                    listId: listID,
                    id: currentItem.itemID
                }
            });
        } catch (error) {
            console.log(error)
        }

        window.location.reload(false);
    };

    // When user clicks on an item in the list, that item is saved to state and 
    // that items info goes into the chart and item card
    const handleItemClick = (event) => {
        const { id } = event.currentTarget;
        setCurrentItem({
            ...currentItem,
            itemID: items[id]._id,
            itemName: items[id].itemName,
            itemDescription: items[id].itemDescription,
            itemPrice: items[id].itemPrice,
            itemQuantity: items[id].itemQuantity
        })
    };

    // This fills the table at the bottom with all items in this list
    const allItems = items.map((row, index) => (
        <TableRow
            key={index}
            id={index}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            onClick={handleItemClick}
        >
            <TableCell component="th" scope="row">
                {row.itemName}
            </TableCell>
            <TableCell align="right">{row.itemDescription}</TableCell>
            <TableCell align="right">{row.itemPrice}</TableCell>
            <TableCell align="right">{row.itemQuantity}</TableCell>
        </TableRow>
    ));

    return (
        <React.Fragment>
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

                        {/* List Title and Add Item */}
                        <Grid item xs={12}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'row' }}>
                                <Typography variant="h2">
                                    {listName + " Inventory"}
                                </Typography>

                                <Button
                                    variant="contained"
                                    sx={{
                                        ml: 'auto',
                                        height: 40,
                                        alignSelf: 'center'
                                    }}
                                    onClick={handleAddModalOpen}
                                >
                                    {"Add Item"}
                                    <Modal
                                        open={addModal}
                                        onClose={handleAddModalClose}
                                        aria-labelledby="add-item-modal"
                                        aria-describedby="adding-item"
                                    >
                                        <Box sx={modalStyle}>
                                            <Typography
                                                id="add-item-modal"
                                                variant='h5'
                                                sx={{
                                                    textAlign: 'center'
                                                }}
                                            >
                                                Add an Item
                                            </Typography>
                                            <Stack direction="row" spacing={2}>
                                                <Box component="form" onSubmit={handleAddSubmit}>

                                                    {/* Item Name textfield */}
                                                    <TextField
                                                        sx={{ m: 2 }}
                                                        margin="normal"
                                                        required
                                                        id="itemName"
                                                        label="Item Name"
                                                        name="itemName"
                                                        value={addForm.itemName}
                                                        onChange={handleAddChange}
                                                    />

                                                    {/* Description textfield */}
                                                    <TextField
                                                        sx={{ m: 2 }}
                                                        margin="normal"
                                                        id="itemDescription"
                                                        label="Item Description"
                                                        name="itemDescription"
                                                        value={addForm.itemDescription}
                                                        onChange={handleAddChange}
                                                    />

                                                    {/* Quantity textfield */}
                                                    <TextField
                                                        sx={{ m: 2 }}
                                                        margin="normal"
                                                        required
                                                        id="itemQuantity"
                                                        label="Item Quantity"
                                                        name="itemQuantity"
                                                        value={addForm.itemQuantity}
                                                        onChange={handleAddChange}
                                                    />

                                                    {/* Price textfield */}
                                                    <TextField
                                                        sx={{ m: 2 }}
                                                        margin="normal"
                                                        id="itemPrice"
                                                        label="Item Price"
                                                        name="itemPrice"
                                                        value={addForm.itemPrice}
                                                        onChange={handleAddChange}
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
                                </Button>
                            </Paper>
                        </Grid>

                        {/* Item Chart Box */}
                        <Grid item xs={12} md={7} lg={8}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 400,
                                }}
                            >
                                <Chart />
                            </Paper>
                        </Grid>

                        {/* Item Details */}
                        <Grid item xs={12} md={5} lg={4}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 400,
                                }}
                            >
                                {/* Item Name */}
                                <Typography variant='h4' sx={{ mb: 5 }}>
                                    {currentItem.itemName}
                                </Typography>

                                {/* Item Description */}
                                <Typography variant='h5'>
                                    {"Item Description:"}
                                </Typography>
                                <Typography variant='h6' sx={{ mb: 5 }}>
                                    {currentItem.itemDescription}
                                </Typography>

                                {/* Item Price */}
                                <Typography variant='h6' sx={{ mb: 5 }}>
                                    {"Price: " + currentItem.itemPrice}
                                </Typography>

                                {/* Box holding Edit and Delete Buttons */}
                                <Box sx={{ mt: 'auto', mx: 'auto' }}>
                                    {/* Edit Item */}
                                    <Button
                                        variant="contained"
                                        sx={{ mx: 3 }}
                                        onClick={handleEditModalOpen}
                                    >
                                        {"Edit Item"}
                                        <Modal
                                            open={editModal}
                                            onClose={handleEditModalClose}
                                            aria-labelledby="edit-item-modal"
                                            aria-describedby="edit-item"
                                        >
                                            <Box sx={modalStyle}>
                                                <Typography
                                                    id="edit-item-modal"
                                                    variant='h5'
                                                    sx={{
                                                        textAlign: 'center'
                                                    }}
                                                >
                                                    Edit / Update Item
                                                </Typography>
                                                <Stack direction="row" spacing={2}>
                                                    <Box component="form" onSubmit={handleEditSubmit}>

                                                        {/* Item Name textfield */}
                                                        <TextField
                                                            sx={{ m: 2 }}
                                                            margin="normal"
                                                            required
                                                            id="itemName"
                                                            label="Item Name"
                                                            name="itemName"
                                                            value={editForm.itemName}
                                                            onChange={handleEditChange}
                                                        />


                                                        {/* Description textfield */}
                                                        <TextField
                                                            sx={{ m: 2 }}
                                                            margin="normal"
                                                            id="itemDescription"
                                                            label="Item Description"
                                                            name="itemDescription"
                                                            value={editForm.itemDescription}
                                                            onChange={handleEditChange}
                                                        />

                                                        {/* Quantity textfield */}
                                                        <TextField
                                                            sx={{ m: 2 }}
                                                            margin="normal"
                                                            required
                                                            id="itemQuantity"
                                                            label="Item Quantity"
                                                            name="itemQuantity"
                                                            value={editForm.itemQuantity}
                                                            onChange={handleEditChange}
                                                        />

                                                        {/* Price textfield */}
                                                        <TextField
                                                            sx={{ m: 2 }}
                                                            margin="normal"
                                                            id="itemPrice"
                                                            label="Item Price"
                                                            name="itemPrice"
                                                            value={editForm.itemPrice}
                                                            onChange={handleEditChange}
                                                        />

                                                        <Button
                                                            sx={{ m: 3 }}
                                                            type="submit"
                                                            variant="contained">
                                                            Edit/Update
                                                        </Button>
                                                    </Box>
                                                </Stack>
                                            </Box>
                                        </Modal>
                                    </Button>

                                    {/* Delete Item */}
                                    <Button 
                                        variant="contained" 
                                        sx={{ bgcolor: 'red', mx: 3 }}
                                        onClick={handleItemDelete}
                                    >
                                        {"Delete"}
                                    </Button>
                                </Box>
                            </Paper>
                        </Grid>

                        {/* Showing all items in list */}
                        <Grid item xs={12}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                <TableContainer>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Item Name</TableCell>
                                                <TableCell align="right">Description</TableCell>
                                                <TableCell align="right">Price&nbsp;($)</TableCell>
                                                <TableCell align="right">Quantity</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {allItems}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </React.Fragment>
    )
}