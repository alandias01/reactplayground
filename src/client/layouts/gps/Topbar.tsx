import * as React from 'react';
import { AppBar, CssBaseline, Typography, Button, Box, Grid, Toolbar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export function Topbar() {
  return (
    <AppBar position='static'>
      <Toolbar >
        <IconButton size='small'>
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}