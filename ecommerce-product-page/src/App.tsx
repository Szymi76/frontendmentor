import items from "./products";
import Product from "./components/Product";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Product item={items[0]} />
    </>
  );
};

export default App;
