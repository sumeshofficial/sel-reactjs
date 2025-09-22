"use client";

import { useState } from "react";
import { Bars3Icon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import MobileMenu from "./MobileMenu";
import logo from "../../assets/sel-logo.png";
import AuthIcon from "./AuthIcon";
import { Link, useLocation } from "react-router-dom";
import { Home, Loader, ShoppingBag, Tag } from "react-feather";
import { useModal } from "../../Context/Modal/ModalContext";
import { useSelector } from "react-redux";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { openModal } = useModal();
  const { userLoggedIn, loading } = useSelector((store) => store.auth);
  const location = useLocation();
  const menu = [
    { name: "Home", icon: Home, href: "/" },
    { name: "My Products", icon: ShoppingBag, href: "/my-products" },
  ];

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <MobileMenu open={open} setOpen={setOpen} />

      <header className="relative bg-white">
        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to={"/"}>
                  <img alt="" src={logo} className="h-8 w-auto" />
                </Link>
              </div>

              {/* menus */}
              {menu.map((item, i) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;
                return (
                  <div key={i} className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      <Link
                        to={item.href}
                        aria-current="page"
                        className={
                          isActive
                            ? "text-black bg-gray-200 rounded-md px-3 py-2 text-sm font-medium flex items-center gap-1"
                            : "text-gray-700 hover:bg-gray-300/50 hover:text-gray-700 rounded-md px-3 py-2 text-sm font-medium flex items-center gap-1"
                        }
                      >
                        <Icon />
                        {item.name}
                      </Link>
                    </div>
                  </div>
                );
              })}

              {loading ? (
                <div className="ml-auto flex items-center">
                  <Loader className="hidden md:block md:w-8 md:h-8 md:rounded-full md:animate-spin" />
                </div>
              ) : (
                <div className="ml-auto flex items-center">
                  {/* Sell */}

                  <div className="hidden md:block ml-4 lg:ml-6 lg:border-2 md:border-gray-400 lg:p-2 lg:rounded-full md:hover:border-gray-400">
                    <Link
                      to={userLoggedIn ? "/sell-product" : "#"}
                      onClick={(e) => {
                        if (!userLoggedIn) {
                          e.preventDefault();
                          openModal("login");
                        }
                      }}
                      className="group -m-2 flex items-center p-2 text-gray-800 hover:text-gray-500 font-extrabold"
                    >
                      <Tag aria-hidden="true" className="size-6 shrink-0 " />
                      SELL
                    </Link>
                  </div>

                  {/* Cart */}
                  <div className="me-4 flow-root lg:ml-6">
                    <a href="#" className="group -m-2 flex items-center p-2">
                      <ShoppingBagIcon
                        aria-hidden="true"
                        className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                        0
                      </span>
                      <span className="sr-only">items in cart, view bag</span>
                    </a>
                  </div>

                  {/* Auth */}

                  <AuthIcon />
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
