import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { token, logout, role } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/user-login');
  };

  return (
    <AppBar position="static">
      <Toolbar  style={{backgroundColor:'green',fontFamily:'sans-serif'}}>
        <Typography variant="overline" style={{fontFamily: "'Montserrat', sans-serif"}}component="div" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/employees')}>
          Employee App
        </Typography>
        {token && (
          <Box>
            {role === 'admin' && (
              <Button color="inherit" onClick={() => navigate('/add')}>Add</Button>
            )}
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;