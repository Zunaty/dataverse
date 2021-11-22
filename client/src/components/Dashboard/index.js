// React
import * as React from 'react';
import { useState } from 'react';

// Styling
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Button, TextField, Box, Popover, Stack } from '@mui/material';
import MediaQuery from 'react-responsive';

// Server, Utils, List Row
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_LIST } from '../../utils/queries';
import { ADD_LIST } from '../../utils/mutations';
import Auth from '../../utils/auth';
import ListTableRow from "./list-row"


export default function Dashboard() {
    const [invAdd, setInvAdd] = useState(null);
    const [formState, setFormState] = useState({ listName: '' });
    const [addList] = useMutation(ADD_LIST);
    const username = Auth.getProfile().data.username;

    const responsive = () => (
        <div>

            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">

                    {/* Top of table */}
                    <TableHead>
                        <TableRow>

                            {/* Blank table cell */}
                            <TableCell />

                            {/* Inventory Name Title */}
                            <TableCell>
                                <Typography variant="h6" component="div">
                                    Inventory Name
                                </Typography>
                            </TableCell>

                            {/* Button to open popover with form */}

                            <TableCell>
                                <Button aria-describedby={id} variant="contained" onClick={handlePop}>
                                    Create Inventory
                                </Button>

                                <Popover
                                    id={id}
                                    open={open}
                                    anchorEl={invAdd}
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
                                    <Stack direction="row" spacing={2}>
                                        <Box component="form" onSubmit={handleSubmit}>

                                            {/* Temporary list input */}
                                            <TextField
                                                sx={{ m: 2 }}
                                                margin="normal"
                                                required
                                                id="listName"
                                                label="New Inventory"
                                                name="listName"
                                                autoComplete="listName"
                                                autoFocus
                                                value={formState.listName}
                                                onChange={handleChange}
                                            />

                                            <Button
                                                sx={{ m: 3 }}
                                                type="submit"
                                                variant="contained">
                                                Add Inv
                                            </Button>
                                        </Box>
                                    </Stack>
                                </Popover>
                            </TableCell>

                        </TableRow>
                    </TableHead>

                    {/* Table body holding lists (inventories) from the database */}
                    <TableBody>
                        {listRows}
                    </TableBody>
                </Table>
            </TableContainer> 

        </div>
    )

    const { loading, data } = useQuery(QUERY_LIST, {
        variables: { username: username }
    });

    const lists = data?.lists || [];

    if (loading) {
        return <div>Loading...</div>
    }

    const listRows = lists.map((el, i) => {
        return <ListTableRow key={i} name={el.listName} items={el.items} onDelete={el._id} />
    });

    const handleSubmit = async event => {
        // event.preventDefault();
        const data = new FormData(event.currentTarget);
        try {
            const mutationResponse = await addList({
                variables: {
                    listName: data.get('listName'),
                }
            })

            console.log(mutationResponse.data.addList);
        } catch (error) {
            console.log(error);
        }

        // Reseting form to be blank
        setFormState({
            listName: ''
        });
    };

    const handleChange = event => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    // Opens the popover which holds the add inv form
    const handlePop = (event) => {
        setInvAdd(event.currentTarget);
    };

    // Sets state when popover is closed
    const handleClose = () => {
        setInvAdd(null);
    };

    const open = Boolean(invAdd);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>

            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">

                    {/* Top of table */}
                    <TableHead>
                        <TableRow>

                            {/* Blank table cell */}
                            <TableCell />

                            {/* Inventory Name Title */}
                            <TableCell>
                                <Typography variant="h6" component="div">
                                    Inventory Name
                                </Typography>
                            </TableCell>

                            {/* Button to open popover with form */}

                            <TableCell>
                                <Button aria-describedby={id} variant="contained" onClick={handlePop}>
                                    Create Inventory
                                </Button>

                                <Popover
                                    id={id}
                                    open={open}
                                    anchorEl={invAdd}
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
                                    <Stack direction="row" spacing={2}>
                                        <Box component="form" onSubmit={handleSubmit}>

                                            {/* Temporary list input */}
                                            <TextField
                                                sx={{ m: 2 }}
                                                margin="normal"
                                                required
                                                id="listName"
                                                label="New Inventory"
                                                name="listName"
                                                autoComplete="listName"
                                                autoFocus
                                                value={formState.listName}
                                                onChange={handleChange}
                                            />

                                            <Button
                                                sx={{ m: 3 }}
                                                type="submit"
                                                variant="contained">
                                                Add Inv
                                            </Button>
                                        </Box>
                                    </Stack>
                                </Popover>
                            </TableCell>

                        </TableRow>
                    </TableHead>

                    {/* Table body holding lists (inventories) from the database */}
                    <TableBody>
                        {listRows}
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    );
};