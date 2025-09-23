import { ArrowLeft, ArrowLeftCircle } from "react-feather";
import { Link } from "react-router-dom";
import SellProductForm from "./SellProductForm";

const SellProduct = () => {
  
  return (
    <div className="bg-gray-300">
      <div className="p-5 w-full mb-5 border-b-2 border-b-gray-400">
        <Link to={"/"}>
          <ArrowLeft className="w-10 h-10 p-1 text-blue-600 bg-white rounded-full" />
        </Link>
      </div>
      <div className="w-full flex justify-center pb-20">
        <SellProductForm />
      </div>
    </div>
  );
};

export default SellProduct;
