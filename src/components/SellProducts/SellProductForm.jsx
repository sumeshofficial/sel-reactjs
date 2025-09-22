import React from "react";
import AddImage from "./AddImage";
import ProductDetails from "./ProductDetails";

const SellProductForm = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Add Product</h1>
      <div className="flex flex-col gap-4 md:flex-row md:justify-between">
        <div className="border-2 border-gray-300 rounded-xl p-5 w-11/12">
            <AddImage />
        </div>
        <div className="border-2 border-gray-300 rounded-xl p-5 w-11/12">
          <ProductDetails />
        </div>
      </div>
    </div>
  );
};

export default SellProductForm;
