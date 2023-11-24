import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import useAdmin from "../hooks/useAmin";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({ children }) => {
  const [isAdmin, isAdminloading] = useAdmin();
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading || isAdminloading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }
  if (user && isAdmin) {
    return children;
  }
  return <Navigate state={{ from: location }} to="/" replace></Navigate>;
};

export default AdminRoute;
AdminRoute.propTypes = {
  children: PropTypes.node,
};
