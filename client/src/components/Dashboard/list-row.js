import React, {useState} from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Typography, Table, TableRow, TableHead, TableCell, Collapse, IconButton, Box, TableBody, Button} from '@mui/material';
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
                <TableCell>{startCase(name)}</TableCell>
                <TableCell onClick={onDelete}><Button onClick={onDelete}>Delete</Button></TableCell>
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
