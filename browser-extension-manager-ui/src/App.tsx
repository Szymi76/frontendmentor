import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { ListShowedItems } from "./types";
import ListFilters from "./components/ListFilters";
import List from "./components/List";

import "./styles.scss";

const App = () => {
  const [itemsShowed, setItemsShowed] = useState<ListShowedItems>("all");

  return (
    <>
      <Navbar />
      <main className="container-md my-5 px-2 max-page-width">
        <ListFilters
          currentItemsShowed={itemsShowed}
          onChangeShowedListItems={(itemsShowed) => setItemsShowed(itemsShowed)}
        />
        <List itemsShowed={itemsShowed} />
      </main>
    </>
  );
};

export default App;
