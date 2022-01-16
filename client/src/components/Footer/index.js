// Importing React
import * as React from 'react';

// Importing MUI Components
import {
    Box,
    Typography,
    Container
} from '@mui/material';

function Footer() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'primary.main'
            }}
        >
            <Box
                component="footer"
                sx={{
                    py: 3,
                    px: 2,
                    mt: 'auto'
                }}
            >
                <Container maxWidth="sm">
                    <Typography sx={{
                        color: 'white'
                    }}>
                        {"This app was created with ReactJS and MUI"}
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
};

export default Footer;