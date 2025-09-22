import ErrorBoundary from "./ErrorBoundary"
import Navbar from "./Navbar/Navbar"

const Home = () => {
    
    return (
        <div>
            <ErrorBoundary >
                <Navbar />
            </ErrorBoundary>
            <h2>Home</h2>
        </div>
    );
}

export default Home;
