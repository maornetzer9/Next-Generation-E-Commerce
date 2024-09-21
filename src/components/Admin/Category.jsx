import React, { useState } from "react";
import { Box, Button, FormLabel, TextField } from "@mui/material";
import { useDispatch } from 'react-redux'
import { deleteCategoriesAction, updateCategoriesAction } from "../../actions/productActions";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import EditIcon from '@mui/icons-material/Edit';
import { ORIGIN } from "../../App";
import '../../layout/category.css';

export default function Category({ category }) {

    const UPDATE_CATEGORIES_URL = `${ORIGIN}/products/update`;
    const DELETE_CATEGORIES_URL = `${ORIGIN}/products/delete`;

    const dispatch = useDispatch()

    const [ edit, setEdit ] = useState( false );
    const [ newCategory , setNewCategory ] = useState( category );

    const handleEditMode = () => setEdit((prevState) => !prevState);
    const handleOnChange = ( { target: { value } } ) => setNewCategory( value );

    const handleDeleteCategories = async ( category ) => {
        try
        {
            await dispatch( deleteCategoriesAction( category, DELETE_CATEGORIES_URL ) );
        }
        catch(error)
        {
            console.error('Failed To Delete Category', error.message);
        }
    };

    const handleUpdateCategories = async ( category ) => {
        try
        {
            if (!newCategory.trim() || newCategory === category )  
            {
                alert("You Cannot Save It Without a Name or Save Under The Same Name.");
                return handleEditMode();
            }
                
            const categories = { old: category, new: newCategory }
            const response = await dispatch( updateCategoriesAction( categories, UPDATE_CATEGORIES_URL ) );
            const { code, message } = response;
        
            if( code !== 200) return alert(message);
        
            handleEditMode();
        }
        catch(error)
        {
            console.error('Failed To Update Category Name', error.message);
        }
    };

    return (
        <Box 
            component={"div"} 
            className="category_content"
        >
            { 
              edit ? 
                   <TextField
                   onChange={handleOnChange}
                   variant="outlined"
                   defaultValue={category}
                   name={category}
                  >
  
                  </TextField>
              : 
                <FormLabel 
                    color="secondary"
                > 
                    {category} 
                </FormLabel> 
            }

            <Box 
                component={'div'}
            >
            { 
              !edit ? 
                  <Button 
                    variant="text" 
                    color="primary"
                    sx={{outline:'none'}}
                    endIcon={<EditIcon/>}
                    onClick={handleEditMode}
                  >
                      Edit
                  </Button>
              :
                  <Button 
                      onClick={() => handleUpdateCategories(category)}
                      endIcon={<SaveAltIcon/>}
                      sx={{outline:'none'}}
                      variant="text" 
                      color="primary"
                  >
                      Save
                  </Button>
            }

                <Button 
                    variant="text" 
                    color="error"
                    sx={{outline:'none'}}
                    onClick={() => handleDeleteCategories(category)}
                    endIcon={<DeleteForeverIcon/>}
                >
                    Delete
                </Button>
            </Box>
        </Box>
    );
}