import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemText, Divider, Typography, Box, Toolbar, ListItemSecondaryAction, IconButton, Badge } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCartAction } from "../../actions/cartActions";
import { newOrderAction } from "../../actions/orderActions";
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from "../../hooks/darkMode";
import { ORIGIN } from "../../App";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShopTwoIcon from '@mui/icons-material/ShopTwo';
import Delete from "@mui/icons-material/Delete";
import Remove from "@mui/icons-material/Remove";
import Add from "@mui/icons-material/Add";
import "../../css/cart.css";

export default function Cart({ user = {}, addToTheCart = () => {}, removeFromCart = () => {} }) {

    const { cart } = useSelector((state) => state.cartReducer.user);
    const { loading } = useSelector((state) => state.cartReducer);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ darkMode ] = useDarkMode();
    
    const NEW_ORDER_URL = `${ORIGIN}/orders/add`;
    const CART_URL_DELETE = `${ORIGIN}/cart/delete`;

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
    
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            top:  10,
            transform: 'translateX(90%)', 
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));
      
    return (
        <Box sx={{ display: "flex" }}>

            <IconButton aria-label="cart"
                onClick={handleMenuToggle}
                 style={{ 
                    top: 40,
                    left: -2,
                    cursor: "pointer",
                    position: "fixed",
                    border: "2px solid #999999",
                    borderRadius: 5,
                    padding: "10px 11px",
                }}
            >
              <StyledBadge badgeContent={cart?.items?.length} color="primary">
                <ShoppingCartIcon sx={{color: darkMode ? 'white' : '#727272'}}/>
              </StyledBadge>
            </IconButton>

            <Drawer
                anchor="left"
                variant="temporary"
                open={preview}
                onClose={handleMenuToggle}
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
                                color: 'green',
                                ":hover" : {
                                    color: '#f2f2f2',
                                    background:'#82e6a8',
                                    transition: '1s ease'
                                }
                            }}
                        >
                            Order
                            {cart?.total.toFixed(2)}
                            <ShopTwoIcon color="success" />
                        </IconButton>
                </List>
            </Drawer>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    marginLeft: preview ? `${cartWidth}px` : "0", 
                    transition: "margin-left 0.5s ease",
                }}
            >
                <Toolbar />
            </Box>
        </Box>
    );
}