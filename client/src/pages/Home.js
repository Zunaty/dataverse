// importing React
import * as React from 'react';

// Importing MUI components
import { 
    Button, 
    Box, 
    Typography,
    Grid
} from '@mui/material';
import { blueGrey } from '@mui/material/colors';



export default function Home() {
    const bg = blueGrey[500];
    
    return (
        <Box sx={{
            height: '100vh',
            flexGrow: 1
        }}>
            <Grid container spacing={3}>
                <Grid sx={12} md={12}>
                    <Typography
                        variant="h2"
                        sx={{
                            my: 10,
                            ml: 5,
                        }}
                    >
                        {"Welcome to Dataverse!"}
                    </Typography>
                </Grid>

                <Grid sx={12} md={8}>
                    <Box 
                        sx={{
                            ml: 5,
                            mt: 5,
                        }}
                    >
                        <Typography variant="h4">
                            {"Your small business & personal inventory management solution"}
                        </Typography>

                        <Typography variant="h6">
                            {"Keep track of all your lists and inventories on one app, and items within those lists/inventories"}
                        </Typography>
                    </Box>
                </Grid>

                <Grid sx={12} md={4}>
                    {/* Signup button and push */}
                    <Box
                        sx={{
                            height: 200,
                            m: 3,
                            ml: 6,
                            bgcolor: bg,
                            alignItems: 'center'
                        }}
                    >
                        <Typography variant='h6' sx={{ color: 'white', p: 3, textAlign: 'center' }}>
                            {"To get started sign up or login"}
                        </Typography>

                        <Box 
                            sx={{
                                p: 3,
                                alignContent: 'center'
                            }}
                        >
                            <Button
                                href="/signup"
                                variant="contained"
                                sx={{
                                    ml: 3,
                                    mr: 1
                                }}
                            >
                                {"Sign Up"}
                            </Button>

                            <Button
                                href="/login"
                                variant="contained"
                                sx={{
                                    mr: 3,
                                    ml: 1
                                }}
                            >
                                {"Login"}
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>


        </Box>
    );
};