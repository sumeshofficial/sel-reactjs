import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../redux/ordersSlice";
import OrdersCard from "./OrdersCard";
import { ArrowLeft, Loader } from "react-feather";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const { currentUser } = useSelector((store) => store.auth);
  const { orders, loading } = useSelector((store) => store.orders);
  const userId = currentUser?.userId;

  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(fetchOrders(userId));
    }
  }, [userId]);

  return (
    <div>
      <div className="p-5 w-full mb-5 border-b-2 border-b-gray-200 bg-gray-200 flex">
        <Link to={"/"}>
          <ArrowLeft className="w-10 h-10 p-1 text-black-600 bg-white rounded-full" />
        </Link>
      </div>
      {loading ? (
        <div className="ml-auto flex justify-center items-center h-150">
          <Loader className="w-12 h-12 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="m-5 sm:m-10 sm:mx-20">
          <h2 className="text-3xl font-bold ">My Orders</h2>
          {orders.length ? (
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {orders.map((order) => (
                <OrdersCard key={order.id} order={order} />
              ))}
            </div>
          ) : (
            <div className="mt-10">
              <p className="text-2xl">No Orders.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
