import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ListTableRow from "./list-row"
import { Grid, TextField, Button } from '@mui/material';

// Test database
const database = [
    {
        name: "Cold Storage", 
        username: 0, 
        items:[
            {name: "Rib Eye", description: "Steak", qty: 10, price: 10.99},
            {name: "Milk", description: "Whole Milk", qty: 5, price: 1.99},
        ]
    },
    {
        name: "Dry Storage", 
        username: 0, 
        items:[
            {name: "Spaghetti", description: "Pasta Boxes", qty: 3, price: 5.99},
            {name: "Gloves", description: "Non-latex boxes", qty: 5, price: 9.99},
        ]
    },
];

export default function Dashboard(){
    const listRows = database.map((el, i) => {
        return <ListTableRow key={i} name={el.name} onDelete={()=>{}} items={el.items}/>
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