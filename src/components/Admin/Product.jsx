import React, { useState } from "react";
import { Box, Button, FormLabel, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { modifyProductsAction } from "../../actions/productActions";
import { useDarkMode } from "../../hooks/darkMode";
import _ from 'lodash'

export default function Product({ product }) {
    const MODIFY_PRODUCT_URL = "http://localhost:3000/products/modify";
    const [darkMode] = useDarkMode();

    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState(product);

    const dispatch = useDispatch();
    const handleEditClick = () => setIsEditing(true);

    const modifyProducts = async () => {
        if(_.isEqual(editData, product) && _.isEqual(editData.purchases, product.purchases)) 
        {
            return setIsEditing(false);
        }

        await dispatch(modifyProductsAction(editData, MODIFY_PRODUCT_URL));
        setIsEditing(false);
    };

    const handleChange = ({ target: { name, value } }) => {
        setEditData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const labelColor = isEditing
        ? darkMode
            ? 'lightgreen' 
            : 'darkgreen'  
        : darkMode
        ? 'white'
        : 'black';

    const dataColor = isEditing
        ? darkMode
            ? 'lightblue' 
            : 'blue'   
        : darkMode
        ? 'lightgray'
        : 'gray';

    return (
        <Box component={"div"} className="product-box">
            {/* Left Side: Category and Description */}
            <Box component={"div"} className="product-left">
                <FormLabel sx={{ color: labelColor, fontWeight: 700 }}>
                    Category:
                </FormLabel>
                {isEditing ? (
                    <TextField
                        name="category"
                        value={editData.category}
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                        fullWidth
                        InputProps={{
                            style: {
                                color: darkMode ? 'white' : 'black', 
                            },
                        }}
                    />
                ) : (
                    <Typography variant="body1" sx={{ color: dataColor }}>
                        {product.category}
                    </Typography>
                )}

                <FormLabel sx={{ color: labelColor, fontWeight: 700 }}>
                    Description:
                </FormLabel>
                {isEditing ? (
                    <TextField
                        name="description"
                        value={editData.description}
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                        fullWidth
                        multiline
                        InputProps={{
                            style: {
                                color: darkMode ? 'white' : 'black', 
                            },
                        }}
                    />
                ) : (
                    <Typography variant="body1" sx={{ color: dataColor }}>
                        {product.description}
                    </Typography>
                )}

                {isEditing ? (
                    <Button
                        variant="contained"
                        color="success"
                        endIcon={<SaveAltIcon />}
                        onClick={modifyProducts}
                        className="save-button"
                    >
                        Save
                    </Button>
                ) : (
                    <Button
                        endIcon={<EditIcon />}
                        variant="contained"
                        onClick={handleEditClick}
                        className="save-button"
                    >
                        Edit
                    </Button>
                )}

            </Box>

            {/* Right Side: Price, Link to Pic, and Orders Table */}
            <Box component={"div"} className="product-right">
                <Box component={"div"} className="product-right-content">
                    <Typography
                        sx={{ color: labelColor, fontWeight: 700 }}
                        variant="body2"
                    >
                        Price:
                    </Typography>
                    {isEditing ? (
                        <TextField
                            name="price"
                            value={editData.price}
                            onChange={handleChange}
                            variant="outlined"
                            size="small"
                            fullWidth
                            InputProps={{
                                style: {
                                    color: darkMode ? 'white' : 'black', 
                                },
                            }}
                        />
                    ) : (
                        <Typography variant="body2" sx={{ color: dataColor }}>
                            ${product.price}
                        </Typography>
                    )}

                    <Box
                        component={"img"}
                        src={product.thumbnail}
                        alt={product.title}
                        height={200}
                    />

                    <Typography
                        sx={{ color: labelColor, fontWeight: 700 }}
                        variant="body2"
                    >
                        Link To Pic:
                    </Typography>
                    {isEditing ? (
                        <TextField
                            name="thumbnail"
                            value={editData.thumbnail}
                            onChange={handleChange}
                            variant="outlined"
                            size="small"
                            fullWidth
                            InputProps={{
                                style: {
                                    color: darkMode ? 'white' : 'black',
                                },
                            }}
                        />
                    ) : (
                        <Link
                            target="_blank"
                            className="product-link"
                            to={product.thumbnail}
                            style={{ color: dataColor }}
                        >
                            {product.thumbnail}
                        </Link>
                    )}
                </Box>

                {product.purchases.length > 0 && (
                    <TableContainer
                        component={Paper}
                        sx={{
                            boxShadow: "1px 1px 2px 1px black",
                            borderRadius: "5px",
                            marginTop: "20px",
                            opacity: darkMode ? 0.7 : 1
                        }}
                    >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {product.purchases.map((purchase, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{purchase?.name}</TableCell>
                                        <TableCell>{purchase?.quantity}</TableCell>
                                        <TableCell>{purchase?.createAt}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Box>
        </Box>
    );
}