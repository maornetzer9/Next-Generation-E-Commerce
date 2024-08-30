import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import Loader from "../../UI/Loader";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import "../../layout/product.css";

export default function Product({ index = 1, item = {}, quantity = 0, addToCart= () => {}, removeFromCart = () => {} }) {

    if (!item) return <Loader />;
    
    return (
        <Box component={"div"}>
            <Box 
                component={"div"} 
                className="product_content_form"
            >

            <Box 
                component={"div"} 
                className="product_content"
            >
                <Typography variant="h4">Title: {item.title}</Typography>

                <Typography variant="body3">
                    Description: {item.description}
                </Typography>

                <Typography variant="body1">Price: ${item.price}</Typography>

                <Typography variant="body1">In Stock: {item.stock}</Typography>

                <Box
                    component={'div'} 
                    className="product_amount_form"
                >
                    <IconButton 
                        color="primary"
                        onClick={ () => addToCart( item, index ) }
                        sx={{
                            fontWeight: 900, 
                            fontSize: 20, 
                            borderRadius:'10px',
                            '&:focus': {
                                outline: 'none',
                                boxShadow: 'none'
                            },
                        }}
                    > 
                        <Add
                            className="cart_buttons"
                            sx={{ borderRadius:'20px',  padding: '5px' }} 
                        />
                    </IconButton>

                    <Typography 
                        variant="body3"
                        sx={{
                            margin:'auto',
                            borderRadius:'10px', 
                            padding: '5px 20px', 
                            boxShadow: '1px 1px 2px 1px #999999', 
                        }}
                    >
                        { quantity }
                    </Typography>

                    <IconButton 
                        color="error" 
                        onClick={ () => removeFromCart( item, index ) }
                        sx={{ 
                            fontWeight: 900, 
                            fontSize: 20, 
                            borderRadius:'10px', 
                            '&:focus': {
                                outline: 'none',
                                boxShadow: 'none'
                            },
                    }}
                    >
                        <Remove sx={{outline:'none', borderRadius:'20px', padding: '5px'}} className="cart_buttons"/>
                    </IconButton>
                </Box>
                
            </Box>

            <Box 
                component={"div"} 
                className="product_sub_content"
            >
                <Box
                    component={"img"}
                    src={item.thumbnail}
                    alt={item.title}
                ></Box>
                 <Typography variant="h3">
                    Bought: {item.bought}
                </Typography>
            </Box>

            </Box>
        </Box>
    );
}