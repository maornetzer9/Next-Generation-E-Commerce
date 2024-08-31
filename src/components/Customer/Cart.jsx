import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemText, Divider, Typography, Box, Toolbar, ListItemSecondaryAction, IconButton } from "@mui/material";
import { IoIosCart } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCartAction } from "../../actions/cartActions";
import { newOrderAction } from "../../actions/orderActions";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import Delete from "@mui/icons-material/Delete";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ShopTwoIcon from '@mui/icons-material/ShopTwo';
import { useNavigate } from 'react-router-dom';
import "../../layout/cart.css";

// TODO: Separate the logic and the styles
export default function Cart({ user = {}, addToTheCart = () => {}, removeFromCart = () => {} }) {

    const { cart } = useSelector((state) => state.cartReducer.user);
    const { loading } = useSelector((state) => state.cartReducer);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const NEW_ORDER_URL = 'http://localhost:3000/orders/add';
    const CART_URL_DELETE = 'http://localhost:3000/cart/delete';

    const [preview, setPreview] = useState(false);
    const [cartWidth, setCartWidth] = useState(370);
    const [isFlipped, setIsFlipped] = useState(false);
    
    const handleMenuToggle = () => setPreview((prevState) => !prevState);

    const handleDeleteFromCart = async ( id ) => 
    {
        try
        {
            await dispatch( deleteFromCartAction( id, user._id, CART_URL_DELETE ) );
        }
        catch(error)
        {
            console.error('Failed To Delete From Cart', error.message);
            
        }
    }

    const handleCartFullWidth = () => {
        cartWidth === 370 ? setCartWidth('100%') : setCartWidth(370);
        setIsFlipped(prev => !prev);
    }

    const handleNewOrder = async () => {
        try
        {
            const response = await dispatch( newOrderAction( user._id, NEW_ORDER_URL  ) )
            const { code, message } = response;

            if( code !== 200 ) return alert(message);

            navigate('/customer/orders')
        }
        catch(error)
        {
            console.error('Failed To Handle New Order', error.message);
        }

    }
    
    return (
        <Box sx={{ display: "flex" }}>
            <IoIosCart
                size={15}
                onClick={handleMenuToggle}
                style={{ 
                    top: 36,
                    left: -2,
                    cursor: "pointer",
                    position: "fixed",
                    border: "2px solid #999999",
                    borderBottomRightRadius: "5px",
                    padding: "10px 15px",
                }}
            />

            <Drawer
                anchor="left"
                variant="persistent"
                open={preview}
                onClose={handleMenuToggle}
                // disableRestoreFocus
                // disableEnforceFocus
                sx={{
                    width: cartWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: cartWidth,
                        boxSizing: "border-box",
                        transition: "width 0.7s ease-in-out",
                    },
                }}
            >
                <Typography 
                    variant="h6" 
                    sx={{ padding: "16px" }}
                >
                    Cart
                </Typography>

                <Divider />

                <List>
                    <IconButton
                        disabled={loading}
                        onClick={handleCartFullWidth}
                        style={{ 
                            cursor: "pointer", 
                            position: "fixed",
                            top: 0,
                            left: cartWidth === 370 ? '370px' : 'calc(100% - 43px)', 
                            boxShadow: "1px 1px 2px 2px #999999 ",
                            borderTopLeftRadius: "1px",
                            // borderBottomLeftRadius: "1px",
                            background: 'white',
                            zIndex: 1000,
                            transform: isFlipped ? "scaleX(-1)" : "scaleX(1)", 
                            transition: "left 1s ease, transform 1s ease",
                            outline: "none"
                        }}
                    >
                       <KeyboardArrowRightIcon color="primary" /> 

                    </IconButton>
                    {cart?.items.length
                        ? cart.items.map((item, index) => (
                              <Box component={"div"} key={index}>
                                  <ListItem >
                                      <ListItemText
                                          style={{ width: "45%" }}
                                          onClick={handleMenuToggle}
                                          primary={"Product"}
                                          secondary={`${item.title}`}
                                      />
                                      <ListItemText
                                          style={{ width: "35%", height: '40px', marginRight: '5px'}}
                                          primary={"Price"}
                                          onClick={handleMenuToggle}
                                          secondary={`${item.price}`}
                                      />
                                      <ListItemSecondaryAction className="cart_actions">
                                          <IconButton 
                                            disabled={loading}
                                            className="cart_buttons"
                                            onClick={() => removeFromCart(item, index)}
                                          >
                                              <Remove sx={{ fontSize:'15px' }} color={loading ? "disabled" : "warning"} />
                                          </IconButton>
                                          <Typography sx={{margin:'0px 10px', outline: 'none'}} variant="body2">
                                              {item.quantity}
                                          </Typography>
                                          <IconButton
                                            disabled={loading}
                                            className="cart_buttons"
                                            onClick={() => addToTheCart(item, index)}
                                          >
                                              <Add sx={{ fontSize:'15px' }} color={loading ? "disabled" : "primary"} />
                                          </IconButton>
                                          <IconButton 
                                            edge="end" 
                                            style={{outline: 'none'}}
                                            onClick={() => handleDeleteFromCart( item.id, index)}
                                          >
                                              <Delete color="error" />
                                          </IconButton>
                                      </ListItemSecondaryAction>
                                  </ListItem>
                                  {index < cart.length - 1 && <Divider />}
                              </Box>
                          ))
                    : null}
                        <IconButton 
                            className="cart_buttons"
                            onClick={handleNewOrder}
                            sx={{ 
                                padding: '12px', 
                                borderRadius:'10px', 
                                gap: '10px', 
                                display:'flex', 
                                margin:'auto',
                                marginTop:'10%',
                                marginBottom:'5%',
                                background: '', 
                                color: 'green',
                                ":hover" : {
                                    background:'#82e6a8',
                                    color: '#f2f2f2',
                                    transition: '1s ease'
                                }
                            }}
                        >
                            Order
                            {" "}
                            {cart?.total.toFixed(2)}
                            <ShopTwoIcon color="success" />
                        </IconButton>
                </List>
            </Drawer>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    marginLeft: preview ? `${cartWidth}px` : "0", 
                    transition: "margin-left 0.5s ease",
                }}
            >
                <Toolbar />
            </Box>
        </Box>
    );
}