// React
import * as React from "react";
import { useState } from 'react';

// Styling
import { startCase } from "lodash"
import { TableRow, TableCell, Button, TextField, Popover, Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

// Server, Utils, Item Row
import { useMutation } from '@apollo/client';
import { REMOVE_ITEM, UPDATE_ITEM } from '../../utils/mutations';

export default function ItemRow({ name, description, qty, price, itemID, listID }) {
    const [removeItem] = useMutation(REMOVE_ITEM);
    const [updateItem] = useMutation(UPDATE_ITEM);
    const [formState, setFormState] = useState({
        itemName: name,
        itemDescription: description,
        itemPrice: price,
        itemQuantity: qty
    });

    // Item delete Button
    const handleItemDelete = async event => {
        const data = event.currentTarget.id;
        try {
            await removeItem({
                variables: {
                    listId: listID,
                    id: data
                }
            });

        } catch (error) {
            console.log(error)
        }
    };

    // Item Edit Button
    const handleEdit = async event => {
        const id = itemID;
        const data = new FormData(event.currentTarget);

        // Grabing qty number from string
        const qtyNumString = formState.itemQuantity;
        const qtyNum = parseInt(qtyNumString);

        // Grabing price number from string
        const priceNumbString = formState.itemPrice;
        const priceNum = parseInt(priceNumbString);

        try {
            const mutationResponse = await updateItem({
                variables: {
                    itemId: id,
                    itemName: data.get('itemName'),
                    itemDescription: data.get('itemDescription'),
                    itemQuantity: qtyNum,
                    itemPrice: priceNum
                }
            })

            console.log(mutationResponse);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = event => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const [editAdd, setEditAdd] = useState(null);

    // Opens the popover which holds the add inv form
    const handlePop = (event) => {
        setEditAdd(event.currentTarget);
    };

    // Sets state when popover is closed
    const handleClose = () => {
        setEditAdd(null);
    };

    const open = Boolean(editAdd);
    const id = open ? 'simple-popover' : undefined;

    return (
        <TableRow>

            <TableCell>{startCase(name)}</TableCell>
            <TableCell>{description}</TableCell>
            <TableCell>{qty}</TableCell>
            <TableCell>{price}</TableCell>

            {/* Edit Button */}
            <TableCell align="center">
                <Button variant="contained" aria-describedby={id} id={itemID} onClick={handlePop}>
                    Edit
                </Button>

                <Popover
                    id={id}
                    open={open}
                    anchorEl={editAdd}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <Box component="form" onSubmit={handleEdit}>

                        {/* Temporary list input */}
                        <TextField
                            sx={{ m: 2 }}
                            margin="normal"
                            required
                            id="itemName"
                            name="itemName"
                            autoComplete="itemName"
                            autoFocus
                            value={formState.itemName}
                            onChange={handleChange}
                        />
                        {/* Temporary list input */}
                        <TextField
                            sx={{ m: 2 }}
                            margin="normal"
                            id="itemDescription"
                            name="itemDescription"
                            autoComplete="itemDescription"
                            
                            value={formState.itemDescription}
                            onChange={handleChange}
                        />
                        {/* Temporary list input */}
                        <TextField
                            sx={{ m: 2 }}
                            margin="normal"
                            required
                            id="itemQuantity"
                            name="itemQuantity"
                            autoComplete="itemQuantity"
                            
                            value={formState.itemQuantity}
                            onChange={handleChange}
                        />
                        {/* Temporary list input */}
                        <TextField
                            sx={{ m: 2 }}
                            margin="normal"
                            id="itemPrice"
                            name="itemPrice"
                            autoComplete="itemPrice"
                            value={formState.itemPrice}
                            onChange={handleChange}
                        />

                        <Button
                            sx={{ m: 3 }}
                            type="submit"
                            variant="contained">
                            Done
                        </Button>
                    </Box>
                </Popover>
            </TableCell>

            {/* Delete Button */}
            <TableCell align="center">
                <IconButton id={itemID} onClick={handleItemDelete}>
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}