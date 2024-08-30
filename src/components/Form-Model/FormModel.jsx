import React from "react";
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { Box, Button, Checkbox, FormControl, FormLabel, TextField, Typography, FormControlLabel } from "@mui/material";
import './form-model.css'

export default function FormModel({
    formTitle,
    fields,
    formValues,
    handleFormChange,
    handleSubmit,
    checkboxLabel,
    checkboxName,
    checkboxChecked,
    onCheckboxChange,
    submitButtonLabel,
    redirectText,
    redirectLink,
    redirectLabel,
    showIcon,
    editMode,
    handleEditMode,
    edit,
}) {

    return (
        <FormControl component="fieldset" id="register_form">
            <Box component="div" id="register_inner_form">
                {
                 showIcon &&
                    <Box className="edit-button-container">
                        <Button
                            variant="outlined"
                            onClick={handleEditMode}
                            className="edit-button"
                            
                        >
                            <FaEdit size={30} cursor={'pointer'} />
                        </Button>
                    </Box>
                }

                <Typography variant="h4" textAlign="center">
                    {formTitle}
                </Typography>

                {fields.map((item, index) => (
                    <Box
                        key={index}
                        component={"div"}
                        className="form-item-container"
                    >
                        <FormLabel
                            component="legend"
                            className="form-label"
                        >
                            {item.label}
                        </FormLabel>
                        <TextField
                            className="text-field"
                            style={{ display: !editMode || edit ? 'flex' : 'none' }}
                            onChange={handleFormChange}
                            type={item.type}
                            name={item.name}
                            label={item.placeholder}
                            value={formValues[item.name] || ""}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                        />
                        <Typography
                            variant="h6"
                            style={{ display: editMode && !edit ? 'flex' : 'none' }}
                        >
                            {formValues[item.name] || ""}
                        </Typography>
                    </Box>
                ))}

                {checkboxLabel && (
                    <FormControlLabel
                        label={checkboxLabel}
                        control={
                            <Checkbox
                                name={checkboxName}
                                checked={checkboxChecked}
                                onChange={onCheckboxChange}
                            />
                        }
                    />
                )}

                <Button
                    type="submit"
                    onClick={(e) => handleSubmit(e)}
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    endIcon={ submitButtonLabel === 'Register' ? <AppRegistrationIcon/> : <SaveAltIcon/>}
                    fullWidth
                >
                    {submitButtonLabel}
                </Button>

                {redirectText && redirectLink && (
                    <Typography
                        variant="body2"
                        textAlign="center"
                        sx={{ mt: 2 }}
                    >
                        {redirectText}
                        <Link
                            to={redirectLink}
                            className="redirect-link"
                        >
                            {redirectLabel}
                        </Link>
                    </Typography>
                )}
            </Box>
        </FormControl>
    );
}