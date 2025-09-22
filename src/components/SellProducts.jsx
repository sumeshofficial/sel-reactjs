import { ArrowLeft } from "react-feather";
import { Link } from "react-router-dom";

const SellProducts = () => {
    
    return (
        <div>
            <div className="p-5 bg-gray-200 mb-5">
                <Link to={"/"}>
                    <ArrowLeft />
                </Link>
            </div>
            <h2>Sell Products</h2>
        </div>
    );
}

export default SellProducts;
