import React, {useState} from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography, Table, TableRow, TableHead, TableCell, Collapse, Box, TableBody, Button, TextField} from '@mui/material';
import ItemRow from './item-row';
import {startCase} from "lodash"

export default function ListTableRow({name, onDelete, items}){
    const [open, setOpen] = useState(false)

    const itemRows = items.map((item, i)=>{
        return <ItemRow 
            key={i}
            name={item.name} 
            description={item.description} 
            price={item.price} 
            qty={item.qty}
            onEdit={(()=>{})}
            onDelete={()=>{}}
            /> 
    })

    itemRows.push(
        <TableRow>
            <TableCell colSpan={6}>
                <Box
                    component="form"
                    sx={{'& > :not(style)': { m: 1, width: '25ch' },}}
                    autoComplete="off"
                    >
                    <TextField
                        required 
                        label="Item Name"
                        size="small"
                    />
                     <TextField
                        required 
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
                        required 
                        type="number"
                        label="Price"
                        size="small"
                    />
                    <Button variant="contained">Add</Button>
                </Box>
            </TableCell>
        </TableRow>
    )


    return (
        <>
            <TableRow>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                <TableCell>
                    <Typography variant="h6" component="div">
                        {startCase(name)}
                    </Typography>
                </TableCell>

                {/* Delete button for list */}
                <TableCell onClick={onDelete}>
                    <IconButton onClick={onDelete}>
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                               {startCase(name)}
                           </Typography>
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
