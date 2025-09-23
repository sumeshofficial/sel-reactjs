import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/productSlice";
import { Loader } from "react-feather";

const ProductList = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((store) => store.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div className="bg-white">
      {loading ? (
        <div className="ml-auto flex items-center h-150">
          <Loader className="w-12 h-12 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Fresh recommendations
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {items.map((product) => (
              <div key={product.id} className="group relative">
                <div className="w-full h-60 overflow-hidden rounded-md">
                  <div className="w-full h-60 overflow-hidden rounded-md bg-gray-100 flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.productName}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                <div className="my-4 flex justify-between">
                  <div className="w-8/12">
                    <h3 className="font-bold text-gray-700">
                      <a href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.productName}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    ₹ {product.price}
                  </p>
                </div>

                <div className="flex justify-end">
                    <button type="button" className="bg-black p-2 text-white rounded-md"> Add To Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
