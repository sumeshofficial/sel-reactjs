import Header from "./components/Navbar/Navbar";
import GlobalModals from "./components/Modal/GlobalModal";
import Modal from "./components/Modal/Modal";

function App() {
  return (
    <>
      <Header />
      <h2>SEL</h2>
      <Modal>
        <GlobalModals />
      </Modal>
    </>
  );
}

export default App;
