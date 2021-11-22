// React
import * as React from "react";
import { useState } from 'react';

// Styling
import { startCase } from "lodash"
import { TableRow, TableCell, Button, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

// Server, Utils, Item Row
import { useMutation } from '@apollo/client';
import { REMOVE_ITEM, UPDATE_ITEM } from '../../utils/mutations';

export default function ItemRow({ name, description, qty, price, itemID, listID }) {
    const [removeItem] = useMutation(REMOVE_ITEM);
    const [updateItem] = useMutation(UPDATE_ITEM);
    const [editClick, setEditClick] = useState(false);
    const [formState, setFormState] = useState({
        itemName: '',
        itemDescription: '',
        itemPrice: '',
        itemQuantity: ''
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

    return (
        <TableRow>
            {!editClick ? (
                <>
                    <TableCell>{startCase(name)}</TableCell>
                    <TableCell>{description}</TableCell>
                    <TableCell>{qty}</TableCell>
                    <TableCell>{price}</TableCell>

                    {/* Edit Button */}
                    <TableCell align="center">
                        <Button variant="contained" id={itemID} onClick={setEditClick(true)}>
                            Edit
                        </Button>
                    </TableCell>
                </>
            ) : (
                <>
                    {/* Edit Name Textfield */}
                    <TableCell>
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
                    </TableCell>

                    {/* Edit Description Textfield */}
                    <TableCell>
                        <TextField
                            sx={{ m: 2 }}
                            margin="normal"
                            id="itemDescription"
                            label="Item Description"
                            name="itemDescription"
                            value={formState.itemDescription}
                            onChange={handleChange}
                        />
                    </TableCell>

                    {/* Edit Quantity Textfield */}
                    <TableCell>
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
                    </TableCell>

                    {/* Edit Price Textfield */}
                    <TableCell>
                        <TextField
                            sx={{ m: 2 }}
                            margin="normal"
                            id="itemPrice"
                            label="Item Price"
                            name="itemPrice"
                            value={formState.itemPrice}
                            onChange={handleChange}
                        />
                    </TableCell>

                    {/* Edit Button */}
                    <TableCell align="center">
                        <Button variant="contained" id={itemID} onClick={setEditClick(false)}>
                            Edit
                        </Button>
                    </TableCell>
                </>
            )}

            {/* Delete Button */}
            <TableCell align="center">
                <IconButton id={itemID} onClick={handleItemDelete}>
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}