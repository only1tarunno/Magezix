import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";
import Loader from "../components/shared/Loader";

const AdminRoute = ({ children }) => {
  const [isAdmin, isAdminloading] = useAdmin();
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading || isAdminloading) {
    return <Loader></Loader>;
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
