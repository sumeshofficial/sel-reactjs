import { X } from "react-feather";
import { useCartWrapper } from "../../Context/Comment/CartWrapperContext";
import CartContainer from "./CartContainer";

const CartSideBar = () => {
  const { commentsWrapper, setCommentsWrapper } = useCartWrapper();

  return (
    <div
      className={
        "max-sm:w-full fixed " +
        (commentsWrapper
          ? "top-0 sm:right-[0]"
          : "top-[100%] sm:right-[-100%]") +
        " duration-700 max-sm:right-0 sm:top-0 w-[30%] min-w-[350px] h-full z-50 bg-white shadow-2xl p-8 px-8 overflow-y-auto overflow-x-hidden"
      }
    >
      <div className="relative ">
        <h1 className="text-2xl font-extrabold ">Cart</h1>

        <button
          onClick={() => setCommentsWrapper((prev) => !prev)}
          className="absolute top-0 right-0 flex justify-center items-center w-12 h-12 rounded-full bg-gray-200"
        >
          <X className="w-8 h-8" />
        </button>

        <hr className="border-gray-300 my-8 " />
        {/* <p className="text-gray-500 ">Cart is empty.</p> */}

        <CartContainer />
      </div>
    </div>
  );
};

export default CartSideBar;
