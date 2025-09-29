import { useModal } from "../../Context/Modal/ModalContext";

const ProductsCard = ({ product }) => {
  const { openModal } = useModal();

  return (
    <div
      onClick={() => openModal("productView", { product, type: "orders" })}
      className="text-center flex gap-3 items-center"
    >
      <div className="w-24 h-24 bg-gray-100 flex-shrink-0 rounded-md overflow-hidden">
        <img
          className="w-full h-full object-contain"
          src={product.image}
          alt="product img"
        />
      </div>
      <div className="flex flex-col items-start">
        <div className="text-start">
          <span className="text-sm font-medium line-clamp-1">
            {product.productName}
          </span>
        </div>
        <div className="flex gap-1">
          <span className="text-sm font-medium">Rs:</span>
          <span className="text-sm font-medium line-clamp-1">
            ₹{product.price}
          </span>
        </div>
        <div className="flex gap-1">
          <span className="text-sm text-gray-400">Category:</span>
          <span className="text-sm line-clamp-1">{product.category}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductsCard;
