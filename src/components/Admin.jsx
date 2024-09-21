import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Drawer, List, ListItem, ListItemText, Divider, Typography, Box, Toolbar, FormControlLabel, Switch } from "@mui/material";
import { RiMenuFold2Line } from "react-icons/ri";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ListAltRoundedIcon from "@mui/icons-material/ListAltRounded";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import FallingStars from "../UI/FallingStars";
import { useDarkMode } from "../hooks/darkMode";
import { useDispatch, useSelector } from "react-redux";
import { disconnectAction } from "../actions/userActions";
import { ORIGIN } from "../App";

export default function Admin() {
    const { user } = useSelector((state) => state.userReducer);

    const USER_DISCONNECT_URL = `${ORIGIN}/customers/disconnect`;

    const drawerWidth = 240;
    const dispatch = useDispatch();
    const [preview, setPreview] = useState(false);

    const [darkMode, toggleDarkMode] = useDarkMode();
    
    const handleDisconnect = async () => {
        try
        {
            if( !user.token ) return <div> Error: User Not Found </div>
            await dispatch( disconnectAction( user.token, USER_DISCONNECT_URL ) )
        }
        catch(error)
        {
            console.error('Failed To Disconnect Admin', error.message);
        }
    }

    const NAVIGATION_PAGE = [
        {
            label: "Categories",
            page: "categories",
            icon: <CategoryOutlinedIcon />,
        },
        { 
            label: "Customers", 
            page: "customers", 
            icon: <ListAltRoundedIcon /> 
        },
        {
            label: "Products",
            page: "products",
            icon: <Inventory2OutlinedIcon />,
        },
        {
            label: "Statistics",
            page: "statistics",
            icon: <BarChartRoundedIcon />,
        },
        { 
            label: "Logout", 
            page: "/", 
            icon: <ExitToAppRoundedIcon />,
            handler: handleDisconnect
        },
    ];

    const handleMenuToggle = () => setPreview((prevState) => !prevState);

    return (
        <Box 
            sx={{ 
                display: "flex", 
                color: darkMode ? "white" : "#000000" 
            }}
        >
            {darkMode && <FallingStars />}
            {!preview ? (
                <Box component="div">
                    <RiMenuFold2Line
                        size={30}
                        onClick={handleMenuToggle}
                        style={{
                            cursor: "pointer",
                            position: "fixed !important",
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
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        background: darkMode ? "black" : "",
                        boxShadow: "0px 0px 0px 0.5px white",
                        color: darkMode ? "white" : "",
                    },
                }}
            >
                <Typography variant="h6" sx={{ padding: "16px" }}>
                    Admin Menus
                </Typography>

                <Divider sx={{ background: darkMode ? "white" : "black" }} />

                <List>
                    <Box>
                        <FormControlLabel
                            sx={{ gap: "80px" }}
                            label="Dark Mode"
                            labelPlacement="start"
                            control={
                                <Switch
                                    checked={darkMode}
                                    onClick={toggleDarkMode}
                                />
                            }
                        />
                    </Box>

                    <Divider sx={{ background: darkMode ? "white" : "black" }} />

                    {NAVIGATION_PAGE.map((item, index) => (
                        <ListItem 
                            button 
                            key={index} 
                            onClick={item.handler ? item.handler : null}
                        >
                            <Link
                                to={item.page}
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                    display: "flex",
                                    alignItems: "center",
                                    width: "100%",
                                }}
                            >
                                <ListItemText primary={item.label}  />
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
            </Box>
        </Box>
    );
}