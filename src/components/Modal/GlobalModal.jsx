import { useModal } from "../../Context/Modal/ModalContext";
import SignIn from "../Auth/SignUp/SignIn";
import Modal from "./Modal";

const GlobalModals = () => {
  const { modal } = useModal();

  if (!modal) return null;

  switch (modal) {
    case "login":
      return (
        <Modal>
          <SignIn />
        </Modal>
      );
    default:
      return null;
  }
};

export default GlobalModals;
