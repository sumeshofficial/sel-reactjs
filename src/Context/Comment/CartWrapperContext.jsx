import { createContext, useContext } from "react";

export const CartWrapperContext = createContext();

export const useCartWrapper = () => useContext(CartWrapperContext);