import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Container, TextField, Button, Typography, Paper } from '@mui/material';

const EmployeeForm = () => {
  const [employee, setEmployee] = useState({ name: '', position: '', location: '', image: '' });
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/employees', employee, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/employees');
    } catch {
      alert('Error creating employee');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom style={{textAlign:'center'}}> Employee Form</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Name" name="name" fullWidth margin="normal" onChange={handleChange} required />
          <TextField label="Position" name="position" fullWidth margin="normal" onChange={handleChange} required />
          <TextField label="Location" name="location" fullWidth margin="normal" onChange={handleChange} required />
          <TextField label="Image URL" name="image" fullWidth margin="normal" onChange={handleChange} />
          <Button type="submit" variant="contained" fullWidth color='success' sx={{ mt: 2 }}>Create</Button>
        </form>
      </Paper>
    </Container>
  );
};

export default EmployeeForm;