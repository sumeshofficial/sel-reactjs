import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/productSlice";
import { Loader } from "react-feather";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((store) => store.products);
  const { currentUser } = useSelector((store) => store.auth);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const products = items.filter(
    (product) => product.publishedBy.userId !== currentUser?.userId
  );

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
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
