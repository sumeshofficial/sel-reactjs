import { SellProductContext } from "./SellProductContext"
import { useForm } from "react-hook-form";

export const SellProductProvider = ({ children }) => {
  const { register, handleSubmit, reset, setValue, getValues, formState } =
    useForm();
  const { errors, isSubmiting } = formState;

  return (
    <SellProductContext.Provider value={{ register, handleSubmit, reset, setValue, getValues, errors, isSubmiting }}>
      {children}
    </SellProductContext.Provider>
  );
};