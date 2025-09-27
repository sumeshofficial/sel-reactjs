import { ArrowLeft } from "react-feather";
import Address from "./Address";
import { Link } from "react-router-dom";
import ConfirmOrder from "./ConfirmOrder";

const CheckoutPage = () => {

  return (
    <div className="w-full bg-gray-200 min:h-550">
      <div className="p-5 w-full mb-5 border-b-2 border-b-gray-400 flex">
        <Link to={"/"}>
          <ArrowLeft className="w-10 h-10 p-1 text-black-600 bg-white rounded-full" />
        </Link>
      </div>
      <div className="sm:flex p-5 sm:p-15 gap-8">
        <div className="sm:w-8/12">
          <Address />
        </div>
        <div className="sm:w-4/12 mt-10 sm:mt-0">
          <ConfirmOrder />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
