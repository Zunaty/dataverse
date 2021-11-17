import React from "react"
import { Typography, Table, TableRow, TableHead, TableCell, Collapse, IconButton, Box, TableBody} from '@mui/material';

export default function ItemRow({name, description, qty, price, onEdit, onDelete}){

    return (
        <TableRow>
            <TableCell>{name}</TableCell>
            <TableCell>{description}</TableCell>
            <TableCell>{qty}</TableCell>
            <TableCell>{price}</TableCell>
            <TableCell onClick={onEdit}>Edit</TableCell>
            <TableCell onClick={onDelete}>Delete</TableCell>
        </TableRow>
    )
}