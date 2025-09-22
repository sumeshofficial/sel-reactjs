import { ArrowLeftCircle } from "react-feather";
import { Link } from "react-router-dom";
import SellProductForm from "./SellProductForm";

const SellProduct = () => {
  return (
    <div className="bg-gray-300">
      <div className="p-5 w-full mb-5">
        <Link to={"/"} >
          <ArrowLeftCircle className="w-8 h-8"/>
        </Link>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-11/12 bg-white rounded-2xl p-10">
          <SellProductForm />
        </div>
      </div>
    </div>
  );
};

export default SellProduct;
