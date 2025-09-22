import AddImage from "./AddImage";
import ProductField from "./ProductField";
import { useSellProductContext } from "../../Context/SellProductContext/SellProductContext";

const SellProductForm = () => {

  const { reset, isSubmiting, handleSubmit } = useSellProductContext();

  const onSubmit = () => {
    reset();
  }

  return (
    <div className="w-11/12 bg-white rounded-2xl p-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h1 className="text-2xl font-bold mb-2">Add Product</h1>
          <div className="flex flex-col gap-4 md:flex-row md:justify-between">
            <div className="border-2 border-gray-300 rounded-xl p-5 w-11/12">
              <AddImage />
            </div>
            <div className="border-2 border-gray-300 rounded-xl p-5 w-11/12">
              <ProductField />
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            disabled={isSubmiting}
            className="px-3 py-2 bg-blue-600 text-white rounded-md"
          >
            Publish Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default SellProductForm;
