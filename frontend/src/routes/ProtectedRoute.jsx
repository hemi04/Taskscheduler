import { Navigate } from 'react-router-dom';

/**
 * Protected Route Component
 * Redirects to login if user is not authenticated
 * Checks for token in localStorage
 */
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

