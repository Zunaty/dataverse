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


const database = [
    {
        name: "testing name", 
        username: 0, 
        items:[
            {name: "first item", description: "Working item", qty: 100, price: 1},
            {name: "second item", description: "notw orking item", qty: 400, price: 4},
        ]},
        {
            name: "another test name", 
            username: 0, 
            items:[
                {name: "first item", description: "Working item", qty: 100, price: 1},
                {name: "second item", description: "notw orking item", qty: 400, price: 4},
            ]},
] 
export default function Dashboard(){
    const listRows = database.map((el, i) => {
        return <ListTableRow key={i} name={el.name} onDelete={()=>{}} items={el.items}/>
    })


    return (
        <>
         {/* Working on submission for title box  */}
        {/* <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow><TableCell/><TableCell/><TableCell/><TableCell/></TableRow>
                </TableHead>
                <TableBody>
                    <Box component="form"sx={{'& > :not(style)': { m: 1, width: '25ch' },}}autoComplete="off">
                        <TableRow>
                            <TableCell spanCol={3}>
                                <TextField type="input"/>
                            </TableCell>
                            <TableCell><Button onClick={()=>{}}>Add</Button></TableCell>
                        </TableRow>
                    </Box>
                </TableBody>
            </Table>
        </TableContainer> */}
        {/* <Box component="form">
            <Grid container spacing={2}>
                <Grid item xs={6} md={8}>
                    <TextField type="input"/>
                </Grid>
                <Grid item xs={6} md={8}>
                    <Button>Add</Button>
                </Grid>
            </Grid>
        </Box> */}
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>List Name</TableCell>
                        <TableCell/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listRows}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    );
}