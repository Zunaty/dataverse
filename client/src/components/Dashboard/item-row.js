import React from "react"
import {startCase} from "lodash"
import { TableRow, TableCell, Button} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ItemRow({name, description, qty, price, onEdit, onDelete}){

    return (
        <TableRow>
            <TableCell>{startCase(name)}</TableCell>

            <TableCell>{description}</TableCell>
            <TableCell>{qty}</TableCell>
            <TableCell>{price}</TableCell>

            {/* Edit Button */}
            <TableCell align="center">
                <Button variant="contained" onClick={onEdit}>
                    Edit
                </Button>
            </TableCell>

            {/* Delete Button */}
            <TableCell align="center">
                <IconButton onClick={onDelete}>
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}