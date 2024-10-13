import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Box, Button, FormControl, FormLabel, TextField, Typography } from '@mui/material';
import { loginAction } from '../actions/userActions';
import ErrorIcon from '@mui/icons-material/Error';
import LoginIcon from '@mui/icons-material/Login';
import { ORIGIN } from '../App';
import '../css/login.css';


export default function Login() {

  const LOGIN_URL = `${ORIGIN}/user/login`

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [form, setForm] = useState({});
  
  const error = useSelector((state) => state.userReducer.error);
  const handleForm = ({ target: { name, value } }) => setForm({ ...form, [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try
    {
        const { username, password } = form;
        if ( !username || !password ) return alert('Enter Username And Password');

        const { role } = await dispatch( loginAction( username, password , LOGIN_URL) );
                    
        role === "Admin" ? navigate('/admin') : navigate('/customer');
    }
    catch(err)
    {
        console.error('Failed to login:', err.message);
    }
  };
  

  return (
    <Box component={'div'}>
      <FormControl 
        component="form" 
        id="login_form" 
        onSubmit={handleSubmit}
      >
      <Box component="div" id="login_inner_form">
        <Typography variant="h4" textAlign="center">
          Next Generation E-Commerce
        </Typography>

        <FormLabel component="legend" sx={{ fontWeight: 600 }}>
          Username:
        </FormLabel>
        <TextField
          onChange={handleForm}
          type="text"
          name="username"
          label="Enter Username"
          variant="outlined"
          margin="normal"
          fullWidth
          required
        />

        <FormLabel component="legend" sx={{ fontWeight: 600 }}>
          Password:
        </FormLabel>
        <TextField
          onChange={handleForm}
          type="password"
          name="password"
          label="Enter Password"
          variant="outlined"
          margin="normal"
          fullWidth
          required
        />

        { error ? 
            <Alert 
                variant='standard'
                severity="error"
                icon={<ErrorIcon/>} 
            >
              {error}
            </Alert>
        : null }

        <Button
          endIcon={<LoginIcon/>}
          type="submit"
          variant="contained" 
          color="primary" 
          sx={{ mt: 2 }} 
          fullWidth 
        >
          Login
        </Button>

        <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
          Still No Have An Account?{' '}
          <Link to="/register" style={{ textDecoration: 'underline' }}>
            Register
          </Link>
        </Typography>
      </Box>
    </FormControl>
    </Box>
  );
}