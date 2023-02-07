import { useState } from "react";

function useLocalStorage() {
  const [items, setItems] = useState(
    localStorage.getItem("items") === null
      ? {}
      : JSON.parse(localStorage.getItem("items"))
  );
  console.log(localStorage.getItem("items"));

  function updateItems(item) {
    localStorage.setItem("items", JSON.stringify(item));
    setItems(item);
  }

  return [items, updateItems];
}

export default useLocalStorage;
