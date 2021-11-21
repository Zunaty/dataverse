import * as React from 'react';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import ListTableRow from "./list-row"
import { Button, TextField, Box } from '@mui/material';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_LIST } from '../../utils/queries';
import { ADD_LIST } from '../../utils/mutations';
import Auth from '../../utils/auth';


export default function Dashboard() {
    const [formState, setFormState] = useState({ listName: '' });
    const [addList, { error }] = useMutation(ADD_LIST);
    const username = Auth.getProfile().data.username;
    const { loading, data } = useQuery(QUERY_LIST, {
        variables: { username: username }
    });

    const lists = data?.lists || [];

    if (loading) {
        return <div>Loading...</div>
    }

    const listRows = lists.map((el, i) => {
        return <ListTableRow key={i} name={el.listName} onDelete={() => { }} items={el.items} />
    });

    const handleSubmit = async event => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data, "btn click heard");
        try {
            const mutationResponse = await addList({
                variables: {
                    listName: data.get('listName'),
                }
            })

            console.log(mutationResponse);
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
                                <Typography variant="h4" component="div">
                                    Inventory Name
                                </Typography>
                            </TableCell>

                            {/* Holding add / Remove List Buttons */}
                            <TableCell>
                                <Box component="form" onSubmit={handleSubmit}>
                                    <Button
                                        type="submit"
                                        variant="contained">
                                        Add Inv
                                    </Button>
                                    {/* Temporary list input */}
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="listName"
                                        label="List Name"
                                        name="listName"
                                        autoComplete="listName"
                                        autoFocus
                                        value={formState.listName}
                                        onChange={handleChange}
                                    />
                                </Box>
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

// Extra code for now

// {/* Working on submission for title box  */}
//             {/* <TableContainer component={Paper}>
//                 <Table>
//                     <TableHead>
//                         <TableRow><TableCell/><TableCell/><TableCell/><TableCell/></TableRow>
//                     </TableHead>
//                     <TableBody>
//                         <Box component="form"sx={{'& > :not(style)': { m: 1, width: '25ch' },}}autoComplete="off">
//                             <TableRow>
//                                 <TableCell spanCol={3}>
//                                     <TextField type="input"/>
//                                 </TableCell>
//                                 <TableCell><Button onClick={()=>{}}>Add</Button></TableCell>
//                             </TableRow>
//                         </Box>
//                     </TableBody>
//                 </Table>
//             </TableContainer> */}
//             {/* <Box component="form">
//                 <Grid container spacing={2}>
//                     <Grid item xs={6} md={8}>
//                         <TextField type="input"/>
//                     </Grid>
//                     <Grid item xs={6} md={8}>
//                         <Button>Add</Button>
//                     </Grid>
//                 </Grid>
//             </Box> */}