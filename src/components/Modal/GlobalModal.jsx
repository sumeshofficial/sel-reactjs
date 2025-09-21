import { useModal } from "../../Context/Modal/ModalContext";
import SignUp from "../Auth/SignUp/SignIn";

const GlobalModals = () => {
  const { modal } = useModal();

  if (!modal) return null;

  switch (modal) {
    case "login":
      return <SignUp />;
    default:
      return null;
  }
};

export default GlobalModals;
