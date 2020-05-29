import React, { useState } from 'react'
import { CssBaseline, AppBar, Toolbar, IconButton, Typography, Button, Grid, makeStyles, CircularProgress, Divider, Chip, Theme, Card, CardContent, CardActions, CardActionArea, CardHeader, CardMedia, Drawer, List, ListItem, ListItemIcon, ListItemText, Paper } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Inbox, Mail, ChevronLeft } from '@material-ui/icons';

//To change theme
import { createMuiTheme } from '@material-ui/core'
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  palette: {
    type: "light"
  }
});

export function MUITheming() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <TopBar2 setDrawerOpen={setDrawerOpen} />
      </ThemeProvider>
    </div>
  );
}

type TopBarProps = {
  setDrawerOpen: (drawerOpen: boolean) => any
}

const useStylesTopBar = makeStyles((theme: Theme) => ({
  menuButton: {
    marginRight: theme.spacing(5),
  },
  title: {
    flexGrow: 1,
  }
}));

const TopBar2 = ({ setDrawerOpen }: TopBarProps) => {
  const classes = useStylesTopBar();
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" className={classes.menuButton} onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" className={classes.title} >
            News
          </Typography>


          <Button color="inherit">Login</Button>

        </Toolbar>
      </AppBar >
    </div >
  );
}



function TopBar(props: { setDrawerOpen: (val: boolean) => void }) {
  const classes = useStylesTopBar();
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => props.setDrawerOpen(true)}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" >
          News
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
}