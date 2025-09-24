import { useModal } from "../../Context/Modal/ModalContext";
import SignIn from "../Auth/SignUp/SignIn";
import ConfirmModal from "../ProductListing/ConfirmModal";
import Modal from "./Modal";

const GlobalModals = () => {
  const { modal } = useModal();

  if (!modal) return null;

  switch (modal.type) {
    case "login":
      return (
        <Modal>
          <SignIn />
        </Modal>
      );
    case "confirm":
      return (
        <Modal>
          <ConfirmModal {...modal.props} />
        </Modal>
      );
    default:
      return null;
  }
};

export default GlobalModals;
