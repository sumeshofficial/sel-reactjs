import { useParams, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CheckoutPage from "./CheckoutPage";
import { Loader } from "react-feather";

const CheckoutGuard = () => {
  const { id } = useParams();
  const { currentUser, loading } = useSelector((store) => store.auth);

  if (loading) {
    return (<div className="ml-auto flex items-center justify-center">
      <Loader className="hidden md:block md:w-8 md:h-8 md:rounded-full md:animate-spin" />
    </div>);
  }

  if (!currentUser) return <Navigate to="/" replace />;
  if (currentUser.userId !== id) return <Navigate to="/error" replace />;

  return <CheckoutPage />;
};

export default CheckoutGuard;
