import { doSignOut } from "../../firebase/auth";
import { useModal } from "../../Context/Modal/ModalContext";
import { useSelector } from "react-redux";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Loader, LogIn, LogOut } from "react-feather";
import { useEffect } from "react";

const AuthIcon = () => {
  const { openModal, closeModal } = useModal();
  const { currentUser, userLoggedIn, loading } = useSelector(
    (store) => store.auth
  );

  useEffect(() => {
    if (userLoggedIn) {
      closeModal();
    }
  }, [userLoggedIn]);

  return (
    <>
      {loading ? (
        <Loader className="hidden  md:block md:w-8 md:h-8 md:rounded-full md:animate-spin" />
      ) : !userLoggedIn ? (
        <div className="hidden lg:flex lg:items-center lg:justify-end md:gap-2">
          <LogIn />
          <button
            onClick={() => openModal("login")}
            className="text-sm font-bold text-gray-700 hover:text-gray-800"
          >
            Sign in
          </button>
        </div>
      ) : (
        <Menu
          as="div"
          className="hidden md:relative md:inline-block data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
        >
          <MenuButton className="inline-flex w-full justify-center gap-x-1.5 bg-white py-2 text-sm font-semibold text-gray-900 ">
            <img className="w-8 h-8 rounded-full" src={currentUser?.userImg} />
          </MenuButton>

          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-30 origin-top-right rounded-md bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
          >
            <div className="py-1">
              <MenuItem>
                <div className="flex items-center gap-1 p-2">
                  <LogOut />
                  <button
                    onClick={() => doSignOut()}
                    className="block font-bold py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    Sign out
                  </button>
                </div>
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>
      )}
    </>
  );
};

export default AuthIcon;
