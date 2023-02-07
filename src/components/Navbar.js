import { useState, useContext } from "react";

import { StorageContext } from "../App";

import { useNavigate } from "react-router-dom";

import { GiShoppingCart } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";

function Navbar(props) {
  const navigate = useNavigate();

  const { items } = useContext(StorageContext);

  const [searchText, setSearchText] = useState(props.searchText);

  const handleKeyPress = (event) => {
    if (searchText === "") return;
    if (event.key === "Enter") {
      navigate(`../search/${searchText}`);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-14 px-32 flex flex-row items-center bg-gray-200">
      <div
        className="flex items-center cursor-pointer hover:opacity-30 active:opacity-60"
        onClick={() => {
          navigate(`/`);
        }}
      >
        <div>
          <GiShoppingCart size={32} />
        </div>
        <div className="px-3 font-medium text-xl uppercase tracking-widest">
          Ecommerce App
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <input
          placeholder="Search Item Here..."
          className="px-4 py-2 w-96 rounded-md"
          value={searchText}
          onChange={(event) => {
            setSearchText(event.target.value);
          }}
          onKeyDown={handleKeyPress}
          type="text"
        ></input>
        <div
          className="mx-3 opacity-40 cursor-pointer hover:opacity-60 active:opacity-100"
          onClick={() => navigate(`../search/${searchText}`)}
        >
          <AiOutlineSearch size={24} />
        </div>
      </div>
      <div
        className="opacity-60 cursor-pointer flex flex-row text-xl font-bold hover:opacity-20 active:opacity-50"
        onClick={() => navigate("/cart")}
      >
        <FaShoppingCart size={28} />
        <span className="px-2">{Object.keys(items).length}</span>
      </div>
    </div>
  );
}

export default Navbar;
