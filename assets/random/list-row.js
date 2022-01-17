//  React
import * as React from 'react';
import { useState } from 'react';

// Styling
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography, Table, TableRow, TableHead, TableCell, Collapse, Box, TableBody, Button, TextField } from '@mui/material';
import { startCase } from "lodash"

// Server, Utils, Item Row
import { useMutation } from '@apollo/client';
import { ADD_ITEM, REMOVE_LIST } from '../../utils/mutations';
import ItemRow from './item-row';

export default function ListTableRow({ name, items, onDelete }) {
    const [formState, setFormState] = useState({
        itemName: '',
        itemDescription: '',
        itemPrice: '',
        itemQuantity: ''
    });

    const [removeList] = useMutation(REMOVE_LIST);
    const [addItem] = useMutation(ADD_ITEM);
    const [open, setOpen] = useState(false);
    
    const itemRows = items.map((item, i) => {
        return <ItemRow
            key = {i}
            name = {item.itemName}
            description = {item.itemDescription}
            price = {item.itemPrice}
            qty = {item.itemQuantity}
            itemID = {item._id}
            listID = {onDelete}
        />
    });

    // List delete button pressed
    const handleDelete = async event => {
        const data = event.currentTarget.id;
        console.log(data)
        try {
            await removeList({
                variables: {
                    id: data
                }
            });

        } catch (error) {
            console.log(error)
        }
    };

    const handleSubmit = async event => {
        // event.preventDefault();
        const id = event.currentTarget.id;
        const data = new FormData(event.currentTarget);

        // Grabing qty number from string
        const qtyNumString = data.get('itemQuantity');
        const qtyNum = parseInt(qtyNumString);

        // Grabing price number from string
        const priceNumbString = data.get('itemPrice');
        const priceNum = parseInt(priceNumbString);

        console.log(qtyNum, priceNum);
        
        try {
            const mutationResponse = await addItem({
                variables: {
                    listId: id,
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
        setFormState({
            ...formState,
            itemName: '',
            itemDescription: '',
            itemQuantity: '',
            itemPrice: ''
        });
    };

    const handleChange = event => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    itemRows.push(
        <TableRow>
            <TableCell colSpan={6}>
                <Box
                    id={onDelete}
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }}
                >

                    {/* Item Name textfield */}
                    <TextField
                        sx={{ m: 2 }}
                        margin="normal"
                        required
                        id="itemName"
                        label="Item Name"
                        name="itemName"
                        value={formState.itemName}
                        onChange={handleChange}
                    />

                    {/* Description textfield */}
                    <TextField
                        sx={{ m: 2 }}
                        margin="normal"
                        id="itemDescription"
                        label="Item Description"
                        name="itemDescription"
                        value={formState.itemDescription}
                        onChange={handleChange}
                    />

                    {/* Quantity textfield */}
                    <TextField
                        sx={{ m: 2 }}
                        margin="normal"
                        required
                        id="itemQuantity"
                        label="Item Quantity"
                        name="itemQuantity"
                        value={formState.itemQuantity}
                        onChange={handleChange}
                    />

                    {/* Price textfield */}
                    <TextField
                        sx={{ m: 2 }}
                        margin="normal"
                        id="itemPrice"
                        label="Item Price"
                        name="itemPrice"
                        value={formState.itemPrice}
                        onChange={handleChange}
                    />

                    {/* Form submit button */}
                    <Button 
                        sx={{ m: 3 }} 
                        type="submit" 
                        variant="contained">
                            Add
                    </Button>
                </Box>
            </TableCell>
        </TableRow>
    );

    return (
        <>
            <TableRow>

                {/* The Up and Down arrow on the left side */}
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>

                {/* The name of the list/inv */}
                <TableCell>
                    <Typography variant="h6" component="div">
                        {startCase(name)}
                    </Typography>
                </TableCell>

                {/* Delete button for list */}
                <TableCell>
                    <IconButton id={onDelete} onClick={handleDelete}>
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            </TableRow>

            {/* When you open up the collapsible */}
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell>Qty</TableCell>
                                        <TableCell>Price ($)</TableCell>
                                        <TableCell align="center">Edit</TableCell>
                                        <TableCell align="center">Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {itemRows}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}
