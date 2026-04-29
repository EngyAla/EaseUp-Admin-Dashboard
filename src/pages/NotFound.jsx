import { Box, Button, Typography } from '@mui/material'
import React from 'react'

const NotFound = () => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100vh", alignItems: "center", gap: 2, textAlign: "center", }}>
            <Typography variant='h1'
            sx={{
                fontSize: "152px",
                fontWeight: "bold",
                backgroundImage: "linear-gradient(to right, #28a395, #0b8375)",
                WebkitBackgroundClip: "text",
                color: "transparent",
            }}
            >404</Typography>
            <Typography variant='h3' sx={{ color: "#0F172A" }}>OOOps...!</Typography>
            <Typography variant='h3' sx={{ color: "#0F172A" }}>Page Not Fount</Typography>
            <Typography variant='body1' sx={{ color: "#475569" }}>Sorry about that! Please visit our bome page <br /> to get where you need to ge.</Typography>
            <Button href='/dashboard' variant='contained'>Back to your dashboard</Button>
        </Box>
    )
}

export default NotFound;