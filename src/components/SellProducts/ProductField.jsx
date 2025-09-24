import { useSellProductContext } from "../../Context/SellProductContext/SellProductContext";

const ProductField = () => {
  const { register, errors } = useSellProductContext();

  return (
    <div className="mb-5">
      <div className="flex flex-col ">
        <label htmlFor="">Product Name</label>
        <input
          {...register("productName", {
            required: "Product name is required",
            pattern: { value: /\S/, message: "Product name cannot be empty" },
            minLength: { value: 3, message: "At least 3 characters" },
          })}
          type="text"
          className="p-2 border-2 border-gray-400 rounded-md mt-2 focus:outline-none focus:ring-0"
          placeholder="Product Name"
        />
        {errors.productName && (
          <p className="text-red-500">{errors.productName.message}</p>
        )}
      </div>
      <div className="flex flex-col mt-5">
        <label htmlFor="">Category</label>
        <input
          {...register("category", {
            required: "Category is required",
            pattern: { value: /\S/, message: "Product name cannot be empty" },
          })}
          type="text"
          className="p-2 border-2 border-gray-400 rounded-md mt-2 focus:outline-none focus:ring-0"
          placeholder="Category"
        />
        {errors.category && (
          <p className="text-red-500">{errors.category.message}</p>
        )}
      </div>
      <div className="flex flex-col mt-5">
        <label htmlFor="">Price</label>
        <input
          {...register("price", {
            required: "Invalid price",
            min: 1,
            pattern: { value: /^[0-9/\S/]+$/, message: "Only numbers allowed" },
          })}
          type="number"
          className="p-2 border-2 border-gray-400 rounded-md mt-2 focus:outline-none focus:ring-0"
          placeholder="Price"
        />
        {errors.price && <p className="text-red-500">{errors.price.message}</p>}
      </div>
      <div className="flex flex-col mt-5">
        <label htmlFor="">Description</label>
        <textarea
          {...register("description", {
            required: "Add description",
            minLength: { value: 50, message: "At least 50 characters" },
            maxLength: { value: 300, message: "Maximum 300 characters" },
            pattern: { value: /\S/, message: "Product name cannot be empty" },
          })}
          className="md:h-40 h-20 resize-none p-2 border-2 border-gray-400 rounded-md mt-2 focus:outline-none focus:ring-0"
          placeholder="Description"
        />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
      </div>
    </div>
  );
};

export default ProductField;
