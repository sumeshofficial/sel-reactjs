import GlobalModals from "./components/Modal/GlobalModal";
import ErrorBoundary from "./components/ErrorBoundary";
import useAuthListener from "./components/Auth/useAuthListener";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./components/Home";
import MyProducts from "./components/MyProducts";
import SellProduct from "./components/SellProducts/SellProduct";
import ProtectedRoute from "./components/ProtectedRoute";
import { SellProductContext } from "./Context/SellProductContext/SellProductContext";
import { SellProductProvider } from "./Context/SellProductContext/SellProductProvider";

function App() {
  useAuthListener();

  return (
    <>
      <Router>
        <ErrorBoundary>
          <GlobalModals />
        </ErrorBoundary>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route
            path={"/my-products"}
            element={
              <ProtectedRoute>
                <MyProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path={"/sell-product"}
            element={
              <ProtectedRoute>
                <SellProductProvider>
                  <SellProduct />
                </SellProductProvider>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
