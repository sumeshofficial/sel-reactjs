import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../redux/cartSlice";
import { Loader } from "react-feather";

const ConfirmOrder = () => {
  const { currentUser } = useSelector((store) => store.auth);
  const { cart, loading } = useSelector((store) => store.cart);
  const userId = currentUser?.userId;
  const cartItems = cart
    ? cart?.products.filter((product) => !product.sold && !product.deleted)
    : [];

  const totalSubPrice = cart ? cartItems.reduce( (acc, curr) => acc += curr.price, 0) : 0;
  const totalTax = cart ? 5 * cartItems.length : 0;
  const totalPrice = totalSubPrice + totalTax + 80;

  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(fetchCart(userId));
    }
  }, [userId]);

  return (
    <div className="border-2 border-gray-300 p-6 rounded-2xl bg-white">
      <h2 className="text-2xl font-medium mb-4">Your Cart</h2>

      {loading ? (
        <div className="ml-auto flex items-center justify-center">
          <Loader className="hidden md:block md:w-8 md:h-8 md:rounded-full md:animate-spin" />
        </div>
      ) : (
        <div>
          {/* Cart Items */}
          <ul className="space-y-4">
            {cartItems.map((item, index) => (
              <li key={index} className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <img
                    src={item.image}
                    alt="product-img"
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div className="flex flex-col">
                    <p className="line-clamp-1 text-base">{item.productName}</p>
                    <p className="line-clamp-1 text-sm text-gray-500">
                      {item.category}
                    </p>
                  </div>
                </div>
                <p className="font-medium">₹{item.price}</p>
              </li>
            ))}
          </ul>

          {/* Order Summary */}
          <div className="mt-8 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-700">Subtotal</span>
              <span className="text-md text-gray-800">₹{totalSubPrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-700">Shipping</span>
              <span className="text-md text-gray-800">₹80</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-700">Estimated taxes</span>
              <span className="text-md text-gray-800">₹{totalTax}</span>
            </div>
          </div>

          <div className="border-t border-gray-300 my-5"></div>

          {/* Total */}
          <div className="flex justify-between items-center">
            <span className="text-xl font-medium">Total</span>
            <span className="text-xl font-bold">₹{totalPrice}</span>
          </div>

          {/* Confirm Button */}
          <button className="mt-8 w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition">
            Confirm Order
          </button>
        </div>
      )}
    </div>
  );
};

export default ConfirmOrder;
