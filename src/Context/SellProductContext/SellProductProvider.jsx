import { SellProductContext } from "./SellProductContext"
import { useForm } from "react-hook-form";

export const SellProductProvider = ({ children }) => {
  const { register, handleSubmit, reset, setValue, getValues, formState } =
    useForm();
  const { errors, isSubmitting } = formState;

  return (
    <SellProductContext.Provider value={{ register, handleSubmit, reset, setValue, getValues, errors, isSubmitting }}>
      {children}
    </SellProductContext.Provider>
  );
};