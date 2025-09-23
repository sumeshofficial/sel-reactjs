import ErrorBoundary from "./ErrorBoundary"
import Navbar from "./Navbar/Navbar"
import ProductList from "./productListing/ProductList";

const Home = () => {
    
    return (
        <div>
            <ErrorBoundary >
                <Navbar />
            </ErrorBoundary>
            
            <div className="w-full flex justify-center">
                <ProductList />
            </div>
        </div>
    );
}

export default Home;
