import { useEffect, useState } from 'react';
import axiosInstance from '../axiosinterceptor';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grid,
  TextField,
  Box
} from '@mui/material';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const { token, role } = useAuth();
  const navigate = useNavigate();
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: '', position: '', location: '', image: '' });

  useEffect(() => {
    axiosInstance.get('/api/employees')
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  
  const handleDelete = (id) => {
    axiosInstance.delete(`/api/employees/${id}`)
      .then(() => {
        setEmployees(prev => prev.filter(emp => emp._id !== id));
      })
      .catch(err => console.log(err));
  };
  const handleEditClick = (emp) => {
    setEditingId(emp._id);
    setForm({ name: emp.name, position: emp.position, location: emp.location, image: emp.image });
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axiosInstance.put(`/api/employees/${editingId}`, form)
      .then(() => {
        setEditingId(null);
        return axiosInstance.get('/api/employees');
      })
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Grid container spacing={3}>
        {employees.map(emp => (
          <Grid item xs={12} sm={8} md={6} key={emp._id}>
            <Card sx={{ maxWidth: 350 }}>
              {emp.image && <CardMedia component="img" height="240" image={emp.image} alt={emp.name} />}
              <CardContent>
                {editingId === emp._id ? (
                  <form onSubmit={handleUpdate}>
                    <TextField label="Name" name="name" fullWidth margin="normal" value={form.name} onChange={handleInputChange} required />
                    <TextField label="Position" name="position" fullWidth margin="normal" value={form.position} onChange={handleInputChange} required />
                    <TextField label="Location" name="location" fullWidth margin="normal" value={form.location} onChange={handleInputChange} required />
                    <TextField label="Image URL" name="image" fullWidth margin="normal" value={form.image} onChange={handleInputChange} />
                    <Box display="flex" justifyContent="center" mt={2}>
                      <Button type="submit" variant="contained" color='success'>
                        Update
                      </Button>
                    </Box>
                  </form>
                ) : (
                  <>
                    <Typography variant="h6" gutterBottom>{emp.name}</Typography>
                    <Typography variant="body1">{emp.position}</Typography>
                    <Typography variant="body2" color="text.secondary">{emp.location}</Typography>
                    <br />
                    {role === 'admin' && (
                      <>
                        <Button variant="contained" color="warning" size='small' onClick={() => handleEditClick(emp)}>Update</Button>
                        <Button variant="contained" color="error" size='small' style={{ marginLeft: '10%' }} onClick={() => handleDelete(emp._id)}>Delete</Button>
                      </>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default EmployeeList;
