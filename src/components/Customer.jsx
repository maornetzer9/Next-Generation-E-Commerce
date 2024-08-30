import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, Divider, Typography, Box, Toolbar, FormControlLabel, Switch } from '@mui/material';
import { RiMenuFold2Line } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';

import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import FallingStars from '../UI/FallingStars';
import { useDarkMode } from '../hooks/darkMode';

// import { NAVIGATION_PAGE } from '../utils/textFieldForms';


export default function Customer() {

    const { user } = useSelector((state) => state.userReducer);

    const [ darkMode, toggleDarkMode ] = useDarkMode();

    const NAVIGATION_PAGE = [
        { label: 'My Account', page: 'account',  buttonLabels: ['Update', 'Delete'], icon: <AccountCircleOutlinedIcon/>},
        { label: 'My Orders', page: 'orders',    buttonLabels: ['Update', 'Delete'], icon: <ListAltRoundedIcon/> },
        { label: 'Products', page: 'products',   buttonLabels: ['Update', 'Delete'], icon: <Inventory2OutlinedIcon/> },
        { label: 'Logout', page: '/',            buttonLabels: ['Update', 'Delete'], icon: <ExitToAppRoundedIcon/> }
      ];

    const drawerWidth = 240;
    const dispatch = useDispatch();
    const [preview, setPreview] = useState(false);

    const handleMenuToggle = () => setPreview(prevState => !prevState);

 
return (
    <Box sx={{ display: 'flex', color: darkMode ? 'white' : 'black' }}>

      {darkMode && <FallingStars />}

      { !preview ? 
      (
        <Box 
          component="div"
        >
          <RiMenuFold2Line 
            size={25} 
            onClick={handleMenuToggle} 
            style={{ 
                cursor: 'pointer', 
                position:'fixed', 
                border: '2px solid #999999', 
                borderTopRightRadius:'5px', 
                padding: '5px 9px' 
            }} 
        />
        </Box>
      ) : null}

      <Drawer
        anchor="left"
        open={preview}
        onClick={handleMenuToggle}
        disableRestoreFocus
        disableEnforceFocus
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            background: darkMode ? 'black' : '',
            color: darkMode ? 'white' : 'black',
            boxShadow: '0px 0px 0px 0.5px white',
          },
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ padding: '16px' }}
        >
            Customer Menus
        </Typography>

        <Divider sx={{background: darkMode ? 'white' : 'black'}}/>

        <List>
            <Box >
              <FormControlLabel
                sx={{gap:'80px'}}
                label="Dark Mode" 
                labelPlacement='start'
                control={<Switch checked={darkMode} onChange={toggleDarkMode} />}
              />
            </Box>

        <Divider sx={{background: darkMode ? 'white' : 'black'}}/>

          {NAVIGATION_PAGE.map((item, index) => (
            <ListItem button key={index}>
             <Link 
                   to={item.page} 
                   style={{ 
                       textDecoration: 'none', 
                       color: 'inherit', 
                       display: 'flex', 
                       alignItems: 'center', 
                       width: '100%' 
                   }}
               >
              <ListItemText primary={item.label} />
              <ListItemSecondaryAction>
                {item.icon}
              </ListItemSecondaryAction>
            </Link>
          </ListItem>
          ))}
         
        </List>

      </Drawer>
       
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          marginLeft: { sm: `${drawerWidth}px` },
        }}
      >

        

        <Outlet />
        <Toolbar />
        {/* <Box 
            component={'div'}
        >
            <Typography variant='h1'>
                    Welcome
              </Typography>
            <Typography variant='h1'>
                    {user.firstName + " " + user.lastName}
            </Typography>
        </Box> */}
      </Box>

    </Box>
  )
}
