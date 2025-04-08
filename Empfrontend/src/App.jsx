import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import UserLoginForm from './components/UserLoginForm';
import AdminLoginForm from './components/AdminLoginForm';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import Navbar from './components/Navbar';

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/user-login" />;
};

const AdminRoute = ({ children }) => {
  const { token, role } = useAuth();
  return token && role === 'admin' ? children : <Navigate to="/employees" />;
};

const AppRoutes = () => {
  const { token, role } = useAuth();

  return (
    <Routes>
      <Route path="/user-login" element={token && role === 'user' ? <Navigate to="/employees" /> : <UserLoginForm />} />
      <Route path="/admin-login" element={token && role === 'admin' ? <Navigate to="/employees" /> : <AdminLoginForm />} />
      <Route path="/employees" element={<ProtectedRoute><EmployeeList /></ProtectedRoute>} />
      <Route path="/add" element={<AdminRoute><EmployeeForm /></AdminRoute>} />
      <Route path="*" element={<Navigate to={token ? "/employees" : "/user-login"} />} />
    </Routes>
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <MainLayout />
    </Router>
  </AuthProvider>
);

const MainLayout = () => {
  const { token } = useAuth();
  const isLoginPage = ['/user-login', '/admin-login'].includes(window.location.pathname);
  return (
    <>
      {!isLoginPage && token && <Navbar />}
      <AppRoutes />
    </>
  );
};

export default App;

