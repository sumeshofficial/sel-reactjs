import { AlertCircle } from "react-feather";
import { useModal } from "../../Context/Modal/ModalContext";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../redux/productSlice";
import { unAvailable } from "../../redux/cartSlice";

const ConfirmModal = ({ productId }) => {

  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteProduct(productId));
    dispatch(unAvailable(productId));
  }

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center text-center">
        <AlertCircle className="text-red-500 w-16 h-16" />
        <h2 className="text-2xl mt-5">Are you sure?</h2>
        <p className="mt-5 text-gray-400 text-sm">
          Do you really want to delete this product? This process cannot be
          undone.
        </p>
        <div className="mt-10 flex gap-5">
          <button onClick={() => closeModal()} type="button" className="bg-gray-500 text-white px-5 py-2 text-xl rounded-md">
            Cancel
          </button>
          <button type="button" onClick={handleDelete} className="bg-red-500 text-white px-5 py-2 text-xl rounded-md">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
