//  React
import React, { useState } from 'react';

// Styling
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography, Table, TableRow, TableHead, TableCell, Collapse, Box, TableBody, Button, TextField } from '@mui/material';
import { startCase } from "lodash"

// Server, Utils, Item Row
import { useQuery, useMutation } from '@apollo/client';
import { ADD_ITEM, REMOVE_LIST } from '../../utils/mutations';
import Auth from '../../utils/auth';
import ItemRow from './item-row';

export default function ListTableRow({ name, items, onDelete }) {
    // const [addItem] = useMutation(ADD_ITEM);
    const [open, setOpen] = useState(false);
    
    const itemRows = items.map((item, i) => {
        return <ItemRow
            key={i}
            name={item.itemName}
            description={item.itemDescription}
            price={item.itemPrice}
            qty={item.itemQuantity}
            onEdit={item._id}
            onDelete={item._id}
        />
    })

    // Delete List
    const [removeList] = useMutation(REMOVE_LIST);
    
    
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
    
    itemRows.push(
        <TableRow>
            <TableCell colSpan={6}>
                <Box
                    component="form"
                    sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }}
                    autoComplete="off"
                >
                    <TextField
                        required
                        label="Item Name"
                        size="small"
                    />
                    <TextField
                        label="Description"
                        size="small"
                    />
                    <TextField
                        required
                        type="number"
                        label="Qty"
                        size="small"
                    />
                    <TextField
                        type="number"
                        label="Price"
                        size="small"
                    />
                    <Button variant="contained">Add</Button>
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
