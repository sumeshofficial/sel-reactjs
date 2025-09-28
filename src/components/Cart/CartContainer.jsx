import { useEffect } from "react";
import CartField from "./CartField";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../redux/cartSlice";
import { Loader } from "react-feather";
import { useNavigate } from "react-router-dom";

const CartContainer = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((store) => store.auth);
  const { cart, loading } = useSelector((store) => store.cart);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchCart(currentUser.userId));
    }
  }, [currentUser]);

  return (
    <div>
      {loading ? (
        <div className="ml-auto flex items-center">
          <Loader className="hidden md:block md:w-8 md:h-8 md:rounded-full md:animate-spin" />
        </div>
      ) : cart?.products.length ? (
        <div className="flex flex-col h-150">
          {/* cart products */}
          <div className="flex-1 overflow-y-auto">
            {cart?.products?.map((product) => (
              <CartField key={product.id} product={product} />
            ))}
          </div>

          {/* checkout button fixed at bottom */}
          <button
            onClick={() => navigate(`/checkout/${cart?.userId}`)}
            className="bg-black px-5 py-2 text-white w-full sticky bottom-0 rounded-md"
          >
            Checkout
          </button>
        </div>
      ) : (
        <p>Cart is empty</p>
      )}
    </div>
  );
};

export default CartContainer;
