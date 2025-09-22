import ErrorBoundary from "./ErrorBoundary"
import Navbar from "./Navbar/Navbar"

const MyProducts = () => {
    
    return (
        <div>
            <ErrorBoundary >
                <Navbar />
            </ErrorBoundary>
            <h2>My Products</h2>
        </div>
    );
}

export default MyProducts;
