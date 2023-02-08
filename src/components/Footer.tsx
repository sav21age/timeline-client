import { Box, Container, Typography } from "@mui/material";

export const Footer = () => (
    <Box
        component="footer"
        sx={{ pt: 3, mt: "auto" }}>
        <Container
            maxWidth={false}
            sx={{ py: 1, px: 1, backgroundColor: "primary.main" }}
        >
            <Typography variant="body2" color="#fff">
                {"Copyright © "} {new Date().getFullYear()}
            </Typography>
        </Container>
    </Box>
);
