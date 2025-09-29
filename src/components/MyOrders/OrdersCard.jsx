import { MapPin } from "react-feather";
import ProductsCard from "./ProductsCard";

const OrdersCard = ({ order }) => {
  return (
    <div>
      <div className="border-x-2 border-t-2 rounded-t-2xl h-80 sm:h-80 border-gray-200 overflow-hidden">
        <div className="p-3">
          <p className="text-sm text-gray-400 font-medium">Order ID</p>
          <div className="flex justify-between">
            <h2 className="text-xl font-bold">{order.orderId}</h2>
            <div className="bg-green-100 py-1 px-4 rounded-full">
              <span className="text-sm text-green-500">{order.status}</span>
            </div>
          </div>
          <div className="flex w-full justify-end mt-3">
            <div className="rounded-full flex items-center gap-2 border-2 py-2 px-3 border-gray-200">
              <MapPin className="w-5 h-5" />
              <span className="text-sm">{`${order.shippinpAddress.city}, ${order.shippinpAddress.state}`}</span>
            </div>
          </div>
          <div className="w-full">
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 border-2 border-gray-200 rounded-2xl min-h-34 max-h-44 overflow-y-scroll p-5">
              {order.items.map((product) => (
                <ProductsCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 h-20 flex items-center border-x-2 border-b-2 border-gray-200 rounded-b-2xl">
        <div className="w-full p-5">
          <span className="text-base font-bold me-2">
            Rs: ₹{order.totalPrice}
          </span>
          <span className="text-gray-400">({order.items.length} item)</span>
        </div>
      </div>
    </div>
  );
};

export default OrdersCard;
