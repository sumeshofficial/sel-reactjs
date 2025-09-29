import { useDispatch, useSelector } from "react-redux";
import ErrorBoundary from "./ErrorBoundary";
import Navbar from "./Navbar/Navbar";
import { useEffect } from "react";
import { fetchProducts } from "../redux/productSlice";
import ProductCard from "./productListing/ProductCard";
import { Loader } from "react-feather";
import CartSideBar from "./Cart/CartSideBar";

const MyProducts = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((store) => store.products);
  const { currentUser } = useSelector((store) => store.auth);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const products = items.filter(
    (product) =>
      product.publishedBy.userId === currentUser.userId && !product.deleted
  );

  return (
    <div>
      <ErrorBoundary>
        <Navbar />
      </ErrorBoundary>

      <div className="w-full flex justify-center">
        <ErrorBoundary>
          <div className="bg-white">
            {loading ? (
              <div className="ml-auto flex items-center h-150">
                <Loader className="w-12 h-12 rounded-full animate-spin" />
              </div>
            ) : products.length ? (
              <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-8">
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      type={"myProducts"}
                      product={product}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-20 flex items-center">
                <p className="text-2xl font-bold">No Products</p>
              </div>
            )}
          </div>
          <CartSideBar />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default MyProducts;
