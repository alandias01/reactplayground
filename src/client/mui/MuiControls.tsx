import React, { useState } from 'react';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
export function MuiControls() {

  return (
    <div>
      <TopBar />
      <br />
      <Button variant='contained'>Start</Button>
    </div>
  );
}

function TopBar() {

  function handleIconButtonClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    console.log(event);
  }



  return (
    <AppBar position='static'>
      {/* Toolbar has a media query.  This is how you override it */}
      <Toolbar sx={{ '@media (min-width: 600px)': { minHeight: '50px' } }}>
        <IconButton color='inherit' onClick={handleIconButtonClick}>  {/*Inherit allows the children to get the white color, otherwise it's black */}
          <MenuIcon />
        </IconButton>
        {/* Flexgrow allows this component to take up the whole space so the account icon is all the way to the right */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          MUI
        </Typography>
        <IconButton color='inherit'>
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}