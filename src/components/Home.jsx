import CartSideBar from "./Cart/CartSideBar";
import ErrorBoundary from "./ErrorBoundary";
import Navbar from "./Navbar/Navbar";
import ProductList from "./productListing/ProductList";

const Home = () => {
  return (
    <div>
      <ErrorBoundary>
        <Navbar />
      </ErrorBoundary>

      <div className="w-full flex justify-center">
        <ErrorBoundary>
          <ProductList />
          <CartSideBar />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Home;
