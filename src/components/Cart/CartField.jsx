import { Trash } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem } from "../../redux/cartSlice";
import toast from "react-hot-toast";

const CartField = ({ product }) => {
  const { currentUser } = useSelector((store) => store.auth);
  const productId = product.id;
  const userId = currentUser?.userId;

  const dispatch = useDispatch();

  const handleDeleteCartItem = () => {
    dispatch(deleteCartItem({ productId, userId }));

    toast.dismiss();
    toast.success("Product removed");
  };

  return (
    <div className="border-b-3 pb-7 border-b-gray-300 mt-7 flex flex-col items-end">
      <div className="w-full flex justify-between">
        <div className="flex gap-2">
          <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
            <img
              src={product.image}
              alt="product-img"
              className="w-full h-full object-contain"
            />
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
        {(product.sold || product.deleted) && (
          <button
            type="button"
            className="bg-red-500 text-white py-2 px-3 rounded-md"
          >
            {(product.sold && "Sold") || (product.deleted && "Unavailable")}
          </button>
        )}
      </div>
    </div>
  );
};

export default CartField;
