/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/FakeUserContext";

function ProtectedRoute({ children }) {
  const { isAuth } = useAuth();
  // const navigate = useNavigate();
  return isAuth ? children : <Navigate to="/" />;
}

export default ProtectedRoute;
