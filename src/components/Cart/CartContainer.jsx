import { useEffect } from "react";
import CartField from "./CartField";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../redux/cartSlice";
import { Loader } from "react-feather";

const CartContainer = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((store) => store.auth);
  const { cart, loading } = useSelector((store) => store.cart);

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
      ) : (
        cart?.products.length ? cart?.products?.map((product) => (
          <CartField key={product.id} product={product} />
        )) : <p>Cart is empty</p>
      )}
    </div>
  );
};

export default CartContainer;
