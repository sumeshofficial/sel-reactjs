import { useModal } from "../../Context/Modal/ModalContext";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { doSignOut } from "../../firebase/auth";
import { Home, ShoppingBag, LogOut, LogIn, Tag, Package } from "react-feather";

const MobileMenu = ({ open, setOpen }) => {
  const { openModal, closeModal } = useModal();
  const location = useLocation();
  const { currentUser, userLoggedIn } = useSelector((store) => store.auth);
  const menu = [
    { name: "Home", icon: Home, href: "/" },
    { name: "My Products", icon: ShoppingBag, href: "/my-products" },
    { name: "My Orders", icon: Package, href: "/my-orders" },
  ];

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
      />
      <div className="fixed inset-0 z-40 flex">
        <DialogPanel
          transition
          className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full"
        >
          <div className="flex px-4 pt-5 pb-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>

          {userLoggedIn && (
            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <div className="flex items-center gap-2">
                <img
                  className="w-8 h-8 rounded-full"
                  src={currentUser?.userImg}
                />
                <p>{currentUser?.fullname}</p>
              </div>
            </div>
          )}

          <div className="space-y-6 border-t border-gray-200 px-4 py-6">
            {menu.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <div key={item.name} className="">
                  <Link
                    to={item.href}
                    onClick={() => setOpen(false)}
                    className={
                      isActive
                        ? "-m-2 text-black bg-gray-200 rounded-md px-3 py-2 text-sm font-medium flex gap-2 items-center"
                        : "-m-2 text-gray-700 hover:bg-gray-300/50 hover:text-gray-700 rounded-md px-3 py-2 text-sm font-medium flex gap-2 items-center"
                    }
                  >
                    <Icon />
                    {item.name}
                  </Link>
                </div>
              );
            })}
            <Link
              to={"/sell-product"}
              onClick={() => setOpen(false)}
              className="-m-2 font-extrabold text-gray-700 hover:bg-gray-300/50 hover:text-gray-700 rounded-md px-3 py-2 flex gap-2 items-center"
            >
              <Tag />
              Sell
            </Link>
          </div>

          <div className="space-y-6 border-t border-gray-200 px-4 py-6">
            {userLoggedIn ? (
              <div className="flex">
                <LogOut />
                <button
                  onClick={() => {
                    doSignOut();
                    setOpen(false);
                    closeModal();
                  }}
                  className="-m-2 ms-1 block p-2 font-medium text-gray-900"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="flex">
                <LogIn />
                <button
                  onClick={() => {
                    setOpen(false);
                    openModal("login");
                  }}
                  className="-m-2 ms-1 block p-2 font-medium text-gray-900"
                >
                  Sign in
                </button>
              </div>
            )}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default MobileMenu;
