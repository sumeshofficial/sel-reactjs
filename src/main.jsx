import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ModalProvider } from "./Context/Modal/ModalProvider.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { CartWrapperProvider } from "./Context/Comment/CartWrapperProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ModalProvider>
      <CartWrapperProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </CartWrapperProvider>
    </ModalProvider>
  </StrictMode>
);
