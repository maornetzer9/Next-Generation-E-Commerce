import React, { memo } from "react";
import { Box, FormLabel, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useDarkMode } from "../../hooks/darkMode";
import { motion } from "framer-motion";
import { headContentAnimation } from "../../utils/motion";

function Product({ product = {}, isEditing  = false, setIsEditing = () => {}, editData = false, setEditData = () => {} }) {

    const [ darkMode ] = useDarkMode();


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
        <Box component={"div"}>
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

               
            </Box>

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
                        width={200}
                        margin={'auto'}
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
                            style={{ color: '#4c9cd4' }}
                        >
                            {product.thumbnail}
                        </Link>
                    )}
                </Box>
                
                <motion.div {...headContentAnimation}>
                    {product.purchases.length > 0 && (
                        <TableContainer
                            component={Paper}
                            className="table-container"
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
                </motion.div>
            </Box>
        </Box>
    );
}

export default memo(Product);