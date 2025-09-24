import { Trash } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import {
  checkoutProduct,
  deleteCartItem,
  deleteCartProduct,
} from "../../redux/cartSlice";
import toast from "react-hot-toast";

const CartField = ({ product }) => {
  const { currentUser } = useSelector((store) => store.auth);
  const productId = product.id;
  const userId = currentUser?.userId;

  const dispatch = useDispatch();

  const handleDeleteCartItem = () => {
    dispatch(deleteCartItem({ productId, userId }));
    dispatch(deleteCartProduct(product.id));

    toast.dismiss();
    toast.success("Product removed");
  };

  const handleCheckout = () => {
    dispatch(checkoutProduct({ productId, userId }));
  };

  return (
    <div className="border-b-3 pb-5 border-b-gray-300 mt-7 flex flex-col items-end">
      <div className="w-full flex justify-between">
        <div className="flex gap-2">
          <div className="w-16 h-16 relative">
            <img className="w-full h-auto rounded-md" src={product.image} />
            {product.sold && (
              <div className="absolute top-1 left-0.5 bg-red-500/30 text-white px-4 py-1 rounded z-20 text-sm">
                Sold
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-md font-bold line-clamp-1">
              {product.productName}
            </p>
            <p className="text-gray-500 text-sm">{product.category}</p>
            <p className="text-sm font-bold">₹{product.price}</p>
          </div>
        </div>
        <div>
          <button onClick={handleDeleteCartItem}>
            <Trash />
          </button>
        </div>
      </div>
      <div>
        {!product.sold && product.deleted ? (
          product.deleted && (
            <button
              type="button"
              className="bg-red-500 text-white py-2 px-3 rounded-md "
            >
              Unavailable
            </button>
          )
        ) : (
          <button
            type="button"
            onClick={handleCheckout}
            className="bg-black text-white py-2 px-3 rounded-md "
          >
            Checkout
          </button>
        )}
      </div>
    </div>
  );
};

export default CartField;
