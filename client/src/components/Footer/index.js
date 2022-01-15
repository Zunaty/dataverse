// Importing React
import * as React from 'react';

// Importing MUI Components
import {
    CssBaseline,
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
                minHeight: '100vh',
            }}
        >
            <CssBaseline />
            <Box
                component="footer"
                sx={{
                    py: 3,
                    px: 2,
                    mt: 'auto',
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[200]
                            : theme.palette.grey[800],
                }}
            >
                <Container maxWidth="sm">
                    <Typography variant="body1">
                        This app was created with
                        ReactJS and MUI
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
};

export default Footer;