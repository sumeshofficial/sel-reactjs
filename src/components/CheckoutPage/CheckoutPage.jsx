import { ArrowLeft } from "react-feather";
import Address from "./Address";
import { Link, useNavigate } from "react-router-dom";
import ConfirmOrder from "./ConfirmOrder";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { checkoutProduct, fetchCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import { addOrder } from "../../redux/ordersSlice";
import { useEffect } from "react";

const CheckoutPage = () => {
  const { cart } = useSelector((store) => store.cart);
  const { register, handleSubmit, reset, setValue, watch, formState } =
    useForm();
  const { errors, isSubmitting } = formState;

  const dispatch = useDispatch();

  const { currentUser } = useSelector((store) => store.auth);

  const userId = currentUser.userId;

  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      dispatch(fetchCart(userId));
    }
  }, [userId]);

  const cartItems = cart
    ? cart?.products.filter((product) => !product.sold && !product.deleted)
    : [];

  const shippingCost = watch("shippingMethod");

  const totalSubPrice = cart
    ? cartItems.reduce((acc, curr) => (acc += curr.price), 0)
    : 0;
  const totalTax = cart ? 5 * cartItems.length : 0;
  const totalPrice = totalSubPrice + totalTax + Number(shippingCost);

  const onSubmit = async (data) => {
    try {
      await dispatch(addOrder({ cartItems, address: data, totalPrice, userId })).unwrap();
      await dispatch(checkoutProduct(userId)).unwrap();
      toast.dismiss();
      toast.success("Ordered successfully");
      reset();
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.dismiss();
      toast.error(err);
    }
  };

  return (
    <div className="w-full bg-gray-200 min:h-550">
      <div className="p-5 w-full mb-5 border-b-2 border-b-gray-400 flex">
        <Link to={"/"}>
          <ArrowLeft className="w-10 h-10 p-1 text-black-600 bg-white rounded-full" />
        </Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="sm:flex p-5 sm:p-15 gap-8">
          <div className="sm:w-8/12">
            <Address register={register} errors={errors} setValue={setValue} />
          </div>
          <div className="sm:w-4/12 mt-10 sm:mt-0">
            <ConfirmOrder isSubmitting={isSubmitting} watch={watch} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
