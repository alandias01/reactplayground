import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Card, CardContent, Typography, CardActions, Button, Box, Grid } from '@mui/material';


const dashboard_rightcolor = "rgb(57,72,145)";
export function Dashboard() {
  return (
    <div>
      <Grid container spacing={2} sx={{ alignContent: "flex-start" }}>
        <Grid item xs={12} sm={'auto'} >
          <Card sx={{ display: 'flex', width: 300 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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
            <Box sx={{ bgcolor: dashboard_rightcolor, width: "100%" }}>
              <Typography variant='h1'>3</Typography>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} sm={'auto'} >
          <Card sx={{ display: 'flex', width: 300 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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
            <Box justifyContent={'center'} sx={{ bgcolor: dashboard_rightcolor, width: "100%" }}>
              <Typography variant='h1'>3</Typography>
            </Box>
          </Card>

        </Grid>
      </Grid>
      <br />

      <Grid container spacing={2} sx={{ alignContent: "flex-start" }}>
        <Grid item xs={12} sm={'auto'}>
          <Card sx={{ width: 275, height: 240 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Application
              </Typography>
              <Typography variant="h5" component="div">
                GMRT Collateral Visualizer
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Description
              </Typography>
              <Typography variant="body2">
                Firm wide inventory viewer across different lines of business
                <br />

              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} sm={'auto'}>
          <Card sx={{ width: 275, height: 240 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Application
              </Typography>
              <Typography variant="h5" component="div">
                Centralized Log Viewer
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Description
              </Typography>
              <Typography variant="body2">
                View logs from all applications in one place
                <br />

              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>

        </Grid>

        <Grid item xs={12} sm={'auto'}>
          <Card sx={{ width: 275, height: 240 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Application
              </Typography>
              <Typography variant="h5" component="div">
                Position Viewer
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Description
              </Typography>
              <Typography variant="body2">
                View positions for GSL
                <br />

              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>

        </Grid>
      </Grid>





    </div>
  )
}