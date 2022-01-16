// importing React
import * as React from 'react';

// Importing MUI components
import { Button, Box, Typography } from '@mui/material';

function Home() {
    return (
        <Box sx={{
            height: '100vh'
        }}>
            <Typography variant="h2">
                {"Welcome to Dataverse!"}
            </Typography>

            <Typography variant="h4">
                {"Your small business & personal inventory management solution"}
            </Typography>

            <Typography variant="h6">
                {"Keep track of all your lists and inventories on one app, and items within those lists/inventories"}
            </Typography>

            {/* Signup button and push */}
            <Typography>
                {"To get started sign up or login"}
            </Typography>
            <Box>
                <Button href="/signup" variant="contained">
                    {"Sign Up"}
                </Button>

                <Button href="/login" variant="contained">
                    {"Login"}
                </Button>

            </Box>
        </Box>
    );
};

export default Home;