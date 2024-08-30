import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, FormControl, FormLabel, TextField, Typography } from '@mui/material';
import { loginAction } from '../actions/userActions';
import LoginIcon from '@mui/icons-material/Login';
import '../layout/login.css';


export default function Login() {

  const LOGIN_URL = 'http://localhost:3000/customers/login'

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [form, setForm] = useState({});
  
  const error = useSelector((state) => state.error);
  const handleForm = ({ target: { name, value } }) => setForm({ ...form, [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = form;
    if ( !username || !password ) return alert('Enter Username And Password');

    const response = await dispatch( loginAction( username, password , LOGIN_URL) );
    
    const { code, message, role } = response;

    if( code !== 200 ) return alert(message);
    
    if(role === "Admin")
    {
        navigate('/admin');
    }
    else
    {
        navigate('/customer')
    }
  };

  useEffect(() => { if (error !== undefined) return alert(error); }, [error])

  return (
    <Box component={'div'}>
      <FormControl component="form" id="login_form" onSubmit={handleSubmit}>
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
        />

        <FormLabel component="legend" sx={{ fontWeight: 600 }}>
          Password:
        </FormLabel>
        <TextField
          onChange={handleForm}
          type="password"
          name="password"
          label="Enter Username"
          variant="outlined"
          margin="normal"
          fullWidth
        />

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