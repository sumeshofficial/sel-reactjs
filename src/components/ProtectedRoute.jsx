import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useModal } from "../Context/Modal/ModalContext";
import { Loader } from "react-feather";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { userLoggedIn, loading } = useSelector((store) => store.auth);
  const { openModal } = useModal();

  useEffect(() => {
    if (!userLoggedIn) {
      openModal("login"); // open login modal on home
    }
  }, [userLoggedIn]);

  if (loading) {
    return <Loader />;
  }

  if (!userLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;