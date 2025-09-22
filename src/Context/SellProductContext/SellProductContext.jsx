import { createContext, useContext } from "react";

export const SellProductContext = createContext();

export const useSellProductContext = () => useContext(SellProductContext);