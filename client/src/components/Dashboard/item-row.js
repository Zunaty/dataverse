import React from "react"
import {startCase} from "lodash"
import { Typography, TableRow, TableCell, Button} from '@mui/material';

export default function ItemRow({name, description, qty, price, onEdit, onDelete}){

    return (
        <TableRow>
            <TableCell>{startCase(name)}</TableCell>

            <TableCell>{description}</TableCell>
            <TableCell>{qty}</TableCell>
            <TableCell>{price}</TableCell>
            <TableCell align="center"><Button onClick={onEdit}>Edit</Button></TableCell>
            <TableCell align="center"><Button onClick={onDelete}>Delete</Button></TableCell>
        </TableRow>
    )
}