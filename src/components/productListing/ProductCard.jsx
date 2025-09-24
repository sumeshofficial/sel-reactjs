import {
  arrayUnion,
  doc,
  getDoc,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart } from "../../redux/cartSlice";
import { Edit, Trash } from "react-feather";
import { Link } from "react-router-dom";
import { useModal } from "../../Context/Modal/ModalContext";

const ProductCard = ({ product }) => {
  const { currentUser, userLoggedIn } = useSelector((store) => store.auth);
  const { cart } = useSelector((store) => store.cart);
  const alreadyInCart = cart?.products?.find((pro) => pro.id === product.id);
  const dispatch = useDispatch();
  const { openModal } = useModal();
  const isUser = product.publishedBy.userId === currentUser?.userId;

  if (product.sold || product.deleted) {
    return;
  }

  const handleAddToCart = async () => {
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

  const handleDeleteProduct = () => {
    const productId = product.id;
    openModal("confirm", { productId });
  };

  return (
    <div className="group relative" >
      <div className="w-full h-60 overflow-hidden rounded-md" onClick={() => openModal("productView", { product })}>
        <div className="w-full h-60 overflow-hidden rounded-md bg-gray-100 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.productName}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      <div className="my-4 flex justify-between" onClick={() => openModal("productView", { product })}>
        <div className="w-8/12" >
          <h3 className="font-bold text-gray-700 line-clamp-1">
            <p>{product.productName}</p>
          </h3>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
            {product.description}
          </p>
        </div>
        <p className="text-sm font-medium text-gray-900">₹{product.price}</p>
      </div>

      {isUser ? (
        <div className="flex gap-2 ">
          <Link to={`/edit-product/${product.id}`}>
            <Edit />
          </Link>
          <button type="button" onClick={handleDeleteProduct}>
            <Trash />
          </button>
        </div>
      ) : (
        <div className="flex justify-end">
          <button
            onClick={handleAddToCart}
            disabled={alreadyInCart}
            className="bg-black p-2 text-white rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {alreadyInCart ? "Added to cart" : "Add To Cart"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
