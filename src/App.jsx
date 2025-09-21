import Header from "./components/Navbar/Navbar";
import GlobalModals from "./components/Modal/GlobalModal";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <>
      <ErrorBoundary>
        <Header />
      </ErrorBoundary>
      <h2>SEL</h2>

      <ErrorBoundary>
          <GlobalModals />
      </ErrorBoundary>
    </>
  );
}

export default App;
