import { createContext } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import useLocalStorage from "./hooks/useLocalStorage.js";

import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";

export const StorageContext = createContext();

function App() {
    const [items, setItems] = useLocalStorage();
    return (
        <Router>
            <StorageContext.Provider value={{ items, setItems }}>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/search/:id" element={<Home />}></Route>
                    <Route path="/product/:id" element={<Product />}></Route>
                    <Route path="/Cart" element={<Cart />}></Route>
                </Routes>
            </StorageContext.Provider>
        </Router>
    );
}

export default App;
