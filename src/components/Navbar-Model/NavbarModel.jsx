import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, Divider, Typography, Box, Toolbar, FormControlLabel, Switch, Alert, AlertTitle } from '@mui/material';
import { RiMenuFold2Line } from "react-icons/ri";
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ManageAccountsTwoToneIcon from '@mui/icons-material/ManageAccountsTwoTone';
import DvrTwoToneIcon from '@mui/icons-material/DvrTwoTone';
import ExitToAppTwoToneIcon from '@mui/icons-material/ExitToAppTwoTone';
import ShoppingBagTwoToneIcon from '@mui/icons-material/ShoppingBagTwoTone';
import BarChartTwoToneIcon from '@mui/icons-material/BarChartTwoTone';
import CategoryTwoToneIcon from '@mui/icons-material/CategoryTwoTone';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import FallingStars from '../../UI/FallingStars';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { useDarkMode } from '../../hooks/darkMode';
import { pageTransition, slideAnimation } from '../../utils/motion';
import { disconnectAction } from '../../actions/userActions';
import { ORIGIN } from '../../App';

const NavbarModel = (({ menuHeader }) => {
    
    const drawerWidth = 240;
    const USER_DISCONNECT_URL = `${ORIGIN}/user/disconnect`;

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.userReducer);

    const [ menu, setMenu ] = useState([]);
    const [ preview, setPreview ] = useState(false);
    const [ showInfo, setShowInfo ] = useState(false);
    const [ darkMode, toggleDarkMode ] = useDarkMode();

    const handleMenuToggle = useCallback(() => setPreview(prevState => !prevState), []); 

    const handleDisconnect = useCallback(async () => {
        try
        {
            if( !user.token ) return <div> Error: User Not Found </div>
            await dispatch( disconnectAction( user.token, USER_DISCONNECT_URL ) )
        }
        catch(error)
        {
            console.error('Failed To Disconnect Admin', error.message);
        }
    }, [ user.token, dispatch ])

    const ADMIN_NAVIGATION = useMemo(() =>  [
        {
            label: "Categories",
            page: "categories",
            icon: <CategoryTwoToneIcon />,
        },
        { 
            label: "Customers", 
            page: "customers", 
            icon: <DvrTwoToneIcon /> 
        },
        {
            label: "Products",
            page: "products",
            icon: <ShoppingBagTwoToneIcon />,
        },
        {
            label: "Statistics",
            page: "statistics",
            icon: <BarChartTwoToneIcon />,
        },
        { 
            label: "Logout", 
            page: "/", 
            icon: <ExitToAppTwoToneIcon />,
            handler: handleDisconnect
        },
    ], [ handleDisconnect ]);

    const CUSTOMER_NAVIGATION = useMemo(() => [
        { 
            label: 'My Account', page: 'account',  
            buttonLabels: ['Update', 'Delete'], 
            icon: <ManageAccountsTwoToneIcon/>
        },
        { 
            label: 'My Orders', page: 'orders',    
            buttonLabels: ['Update', 'Delete'], 
            icon: <DvrTwoToneIcon/> 
        },
        { 
            label: 'Products', page: 'products',   
            buttonLabels: ['Update', 'Delete'], 
            icon: <ShoppingBagTwoToneIcon/> 
        },
        { 
            label: 'Logout', page: '/',            
            buttonLabels: ['Update', 'Delete'], 
            icon: <ExitToAppTwoToneIcon/>, 
            handler: handleDisconnect
        }
      ], [ handleDisconnect ]);

      useEffect(() => {
        const { role } = JSON.parse(localStorage.getItem('user'));

        role === 'Admin' 
        ? setMenu(ADMIN_NAVIGATION) 
        : setMenu(CUSTOMER_NAVIGATION);

    }, [ ADMIN_NAVIGATION, CUSTOMER_NAVIGATION ])

return (
    <motion.div 
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageTransition}
        style={{ 
            display: 'flex', 
            color: darkMode ? 'white' : 'black'
        }}>

      { darkMode && <FallingStars/> }

      { !preview ? 
        <Box 
          component="div"
        >
          <motion.div
              style={{
                  top: 1,
                  right: 0,
                  position: 'absolute',
                  zIndex: 1
              }}
              {...slideAnimation('right')}
          >
              <Alert
                  severity="info"
                  icon={<InfoTwoToneIcon />}
                  onMouseEnter={()  => setShowInfo(true)}
                  onMouseLeave={()  => setShowInfo(false)}
                  sx={{ padding: '0px 10px', borderRadius: '0px', borderTopLeftRadius: '10px'}}
              >
                  <AlertTitle
                      sx={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',     
                          width: showInfo ? '175px' : '0px', 
                          transition: 'width 0.5s ease-out', 
                      }}
                  >
                      { 'Dashboard on Left Side' }
                  </AlertTitle>
              </Alert>
          </motion.div>


          <RiMenuFold2Line 
            size={25} 
            onClick={handleMenuToggle} 
            style={{ 
                cursor: 'pointer', 
                position:'fixed', 
                boxShadow: '1px 1px 1px 1px gray',
                borderTopRightRadius:'5px', 
                padding: '5px 9px',
                zIndex: 1
            }} 
        />
        </Box>
      : null }

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
            { menuHeader }
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

          {menu.map((option, index) => (
            <ListItem button key={index}>
             <Link 
                   to={option.page} 
                   style={{ 
                       textDecoration: 'none', 
                       color: 'inherit', 
                       display: 'flex', 
                       alignItems: 'center', 
                       width: '100%' 
                   }}
               >
              <ListItemText 
                primary={option.label} 
                onClick={option?.handler}
              />
              <ListItemSecondaryAction>
                {option.icon}
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
          overflow:'hidden',
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          marginLeft: { sm: `${drawerWidth}px` },
        }}
      >

            <Outlet />
        <Toolbar />
      </Box>

    </motion.div>
  )
});

export default NavbarModel