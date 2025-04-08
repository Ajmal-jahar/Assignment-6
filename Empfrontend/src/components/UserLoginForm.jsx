import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Typography, Paper, TextField, Button, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const UserLoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    const success = await login(email, password, 'user');
    if (success) navigate('/employees');
    else alert('Invalid credentials or role');
  };
  

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h4" style={{textAlign:"center",color:'green'}} gutterBottom>User Login</Typography>
        <Box mt={2}>
          <TextField fullWidth label="Email" value={email} onChange={e => setEmail(e.target.value)} margin="normal" />
          <TextField fullWidth label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} margin="normal" />
          <Button fullWidth variant="contained" color='success' sx={{ mt: 2 }} onClick={handleSubmit}>Login</Button>
        </Box>
        <Box mt={2} textAlign="center">
          <Typography variant="body2">Are you an Admin? <Link to="/admin-login">Click here</Link></Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default UserLoginForm;