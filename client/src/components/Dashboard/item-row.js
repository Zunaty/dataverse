// React
import * as React from "react"

// Styling
import {startCase} from "lodash"
import { TableRow, TableCell, Button} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

// Server, Utils, Item Row
import { useMutation } from '@apollo/client';
import { REMOVE_ITEM } from '../../utils/mutations';

export default function ItemRow({name, description, qty, price, itemID, listID}){
    const [removeItem] = useMutation(REMOVE_ITEM);

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

    };

    return (
        <TableRow>
            <TableCell>{startCase(name)}</TableCell>

            <TableCell>{description}</TableCell>
            <TableCell>{qty}</TableCell>
            <TableCell>{price}</TableCell>

            {/* Edit Button */}
            <TableCell align="center">
                <Button variant="contained" id={itemID} onClick={handleEdit}>
                    Edit
                </Button>
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