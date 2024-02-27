import { Height } from '@mui/icons-material'
import { Box, Card, CardActions, CardContent, Grid, Typography } from '@mui/material'
import React, { Component } from 'react'

const LeftBarStyle = {
    padding: "10px 10px 10px 10px",
    // background: "white",
    width: '250px'
}

const RightMainStyle = {
    flexGrow: 1,
    height: "100vh",
    background: "linear-gradient( to bottom right,#8ce0f5, white)"
}

const RightMainContainerStyle = {
    padding: "10px 10px 10px 10px"
}
const dashboard_rightcolor = "rgb(57,72,145)";
const dashboard_rightcolor2 = "rgb(213,239, 249)";

export class Layout01 extends Component {
    render() {
        return (
            <div style={{ display: 'flex' }}>
                <div style={LeftBarStyle}>Left side</div>
                <div style={RightMainStyle}>
                    <div style={RightMainContainerStyle}>
                        <Typography variant='body1' sx={{ color: '#495057', fontWeight: 'bold' }} >
                            ANALYTICS
                        </Typography>

                        <Grid container spacing={2} sx={{ alignContent: "flex-start" }}>
                            <Grid item xs={12} sm={'auto'} >
                                <Card sx={{ display: 'flex', width: 350 }}>
                                    <Box sx={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
                                        <CardContent sx={{ flex: '1 0 auto' }}>
                                            <Typography component="div" variant="h5">
                                                Total Applications
                                            </Typography>
                                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                                Mac Miller
                                            </Typography>
                                        </CardContent>
                                        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                            $25,000
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: dashboard_rightcolor, width: "150px" }}>
                                        <Typography variant='h1'>3</Typography>
                                    </Box>
                                </Card>

                            </Grid>

                            <Grid item xs={12} sm={'auto'} >
                                <Card sx={{ display: 'flex', width: 350 }}>
                                    <Box sx={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
                                        <CardContent sx={{ flex: '1 0 auto' }}>
                                            <Typography component="div" variant="h5">
                                                Total Applications
                                            </Typography>
                                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                                Mac Miller
                                            </Typography>
                                        </CardContent>
                                        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                            $25,000
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: dashboard_rightcolor, width: "150px" }}>
                                        <Typography variant='h1'>3</Typography>
                                    </Box>
                                </Card>
                            </Grid>

                        </Grid>
                    </div >
                </div>
            </div>
        )
    }
}

export default Layout01
