import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import ListTableRow from "./list-row"
import { Button } from '@mui/material';
import { useQuery } from '@apollo/client';
import { QUERY_LIST } from '../../utils/queries';
import Auth from '../../utils/auth';


export default function Dashboard(){

    const username = Auth.getProfile().data.username;
    console.log(username);
    const { loading, data } = useQuery(QUERY_LIST, {
        variables: { username: username }
    });

    if (loading) {
        console.log("loading")
    }
    const lists = data?.lists || [];
    
    console.log(lists);


    const listRows = lists.map((el, i) => {
        return <ListTableRow key={i} name={el.listName} onDelete={()=>{}} items={el.items}/>
    });

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
                                <Button variant="contained">Add Inv</Button>
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