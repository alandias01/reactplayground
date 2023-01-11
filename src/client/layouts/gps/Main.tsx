import React, { useState } from 'react'
import { Drawer, Button, CssBaseline, ThemeProvider, MenuItem, Paper, MenuList, ListItemText, ListItemIcon, Divider } from '@mui/material';
import { createTheme } from '@mui/material/styles'
import { green, purple, lime } from '@mui/material/colors';
import { Check, SafetyDivider } from '@mui/icons-material';
import { Typography } from '@material-ui/core';
import logo from '../../../resources/BAC_BIGD.png';
import { Dashboard } from './Dashboard';
import { Topbar } from './Topbar';
import './style.css';


const bgColor = "#161E43";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      paper: bgColor,
      default: bgColor
    }
  },
});

export function Main() {
  const [openDrawer, setOpenDrawer] = useState<boolean>(true);
  const drawerWidth = 250;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className='responsivetopmenu'><Topbar /></div>
      <div style={{ "display": "flex" }}>

        <div style={{ "marginLeft": "15px", "width": "300px" }} className="responsivesidemenu">
          <img src={logo} alt="Logo" style={{ "marginTop": "10px", "width": "90%" }} />

          <br />
          <br />
          <br />

          <Typography style={{ "color": "#a8c5ff" }} variant='subtitle1'>Applications</Typography>
          <MenuList>
            <MenuItem>
              <ListItemText>GMRT UI</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemText>Centralized Log Viewer</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemText>Positions Viewer</ListItemText>
            </MenuItem>
          </MenuList>

          <br />

          <Typography style={{ "color": "#a8c5ff" }} variant='subtitle1'>Microservices</Typography>
          <MenuList>
            <MenuItem>
              <ListItemText>Collateral api</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemText>Positions api</ListItemText>
            </MenuItem>
          </MenuList>

          <br />

          <Typography style={{ "color": "#a8c5ff" }} variant='subtitle1'>Monitoring</Typography>
          <MenuList>
            <MenuItem>
              <ListItemText>Health checks</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemText>Statistics</ListItemText>
            </MenuItem>
          </MenuList>



        </div>


        <div style={{ "width": "100%" }}>
          <div style={{
            "margin": "10px",
            "padding": "20px",
            "backgroundColor": "rgb(37,46,98)",
            "height": "95vh",
            "width": "calc(100% - 50px)"
          }}>
            <Typography style={{ "color": "#a8c5ff" }} variant='h6'>DASHBOARD</Typography>
            <Divider />
            <br />
            <Dashboard />
          </div>
        </div>

      </div>
    </ThemeProvider >)

}