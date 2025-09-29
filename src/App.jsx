import GlobalModals from "./components/Modal/GlobalModal";
import ErrorBoundary from "./components/ErrorBoundary";
import useAuthListener from "./components/Auth/useAuthListener";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./components/Home";
import MyProducts from "./components/MyProducts";
import SellProduct from "./components/SellProducts/SellProduct";
import ProtectedRoute from "./components/ProtectedRoute";
import { SellProductProvider } from "./Context/SellProductContext/SellProductProvider";
import { Toaster } from "react-hot-toast";
import NotFound from "./components/NotFound";
import CheckoutGuard from "./components/CheckoutPage/CheckoutGuard";
import MyOrders from "./components/MyOrders/MyOrders";

function App() {
  useAuthListener();

  return (
    <>
      <Router>
        <ErrorBoundary>
          <GlobalModals />
        </ErrorBoundary>
        <Toaster />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route
            path={"/my-products"}
            element={
              <ProtectedRoute>
                <ErrorBoundary>
                  <MyProducts />
                </ErrorBoundary>
              </ProtectedRoute>
            }
          />
          <Route
            path={"/my-orders"}
            element={
              <ProtectedRoute>
                <ErrorBoundary>
                  <MyOrders />
                </ErrorBoundary>
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
          <Route
            path={"/edit-product/:id"}
            element={
              <ProtectedRoute>
                <SellProductProvider>
                  <SellProduct />
                </SellProductProvider>
              </ProtectedRoute>
            }
          />
          <Route
            path={"/checkout/:id"}
            element={
              <ProtectedRoute>
                <CheckoutGuard />
              </ProtectedRoute>
            }
          />
          <Route path={"*"} element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
