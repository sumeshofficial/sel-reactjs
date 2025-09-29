import {
  arrayUnion,
  doc,
  getDoc,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebase/firebase";
import { addToCart } from "../../redux/cartSlice";

const ViewProduct = ({ product, type = "normal" }) => {
  const { currentUser, userLoggedIn } = useSelector((store) => store.auth);
  const { cart } = useSelector((store) => store.cart);
  const alreadyInCart = cart?.products?.find((pro) => pro.id === product.id);
  const dispatch = useDispatch();
  const isUser = product?.publishedBy?.userId === currentUser?.userId;

  if (product.sold || product.deleted) {
    return;
  }

  const handleAddToCart = async () => {
    console.log("hello");
    try {
      if (!userLoggedIn) {
        toast.dismiss();
        return toast.error("Please login to add items to cart");
      }

      const cartRef = doc(db, "carts", currentUser.userId);
      const cartSanp = await getDoc(cartRef);

      if (!cartSanp.exists()) {
        await setDoc(cartRef, {
          count: 1,
          userId: currentUser?.userId,
          products: [product],
          productIds: [product.id],
        });
      } else {
        await updateDoc(cartRef, {
          count: increment(1),
          products: arrayUnion(product),
          productIds: arrayUnion(product.id),
        });
      }

      dispatch(addToCart(product));

      toast.success("Item added to cart!");
    } catch (error) {
      console.error("Error adding to cart: ", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-8 p-4 md:p-6 bg-white rounded-2xl">
      {/* Product Image */}
      <div className="w-full md:w-1/2 flex justify-center md:justify-start items-center md:items-start">
        <img
          className="h-80 w-80 md:h-96 md:w-96 object-contain rounded-xl"
          src={product.image}
          alt={product.productName}
        />
      </div>

      {/* Product Details */}
      <div className="w-full md:w-1/2 flex flex-col items-start">
        <p className="text-sm text-gray-500">
          Seller: {product.publishedBy.fullname}
        </p>
        <p className="text-sm text-gray-400 mt-1">{product.category}</p>

        <h2 className="text-3xl font-extrabold mt-4 text-left">
          {product.productName}
        </h2>
        <p className="text-3xl font-bold mt-4 text-black text-left">
          ₹{product.price}
        </p>

        <p className="text-md text-gray-700 mt-6 text-left">
          {product.description}
        </p>

        {!isUser && type !== "orders" && (
          <button
            onClick={handleAddToCart}
            disabled={alreadyInCart}
            className="bg-black text-white w-full py-3 text-xl rounded-lg mt-6 hover:bg-gray-800 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {alreadyInCart ? "Added to cart" : "Add To Cart"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ViewProduct;
