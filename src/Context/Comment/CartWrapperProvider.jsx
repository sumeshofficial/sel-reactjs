import { useState } from "react";
import { CartWrapperContext } from "./CartWrapperContext"

export const CartWrapperProvider = ({ children }) => {
  const [ commentsWrapper, setCommentsWrapper ] = useState(false);

  return (
    <CartWrapperContext.Provider value={{ commentsWrapper, setCommentsWrapper }}>
      {children}
    </CartWrapperContext.Provider>
  );
};
