import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { LazyLoadImage } from "react-lazy-load-image-component";

import Navbar from "../components/Navbar.js";

function Home() {
  const navigate = useNavigate();
  let defaultSearchValue = useParams().id;

  const [products, setProducts] = useState();

  const redirect = (link) => {
    navigate(link);
  };

  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch(
        `https://dummyjson.com/products/search?limit=100&q=${
          defaultSearchValue === undefined ? "" : defaultSearchValue
        }`
      );
      const data = await res.json();
      setProducts(data.products);
    };
    getProducts();
  }, [defaultSearchValue]);

  return (
    <div className="App">
      <Navbar
        searchText={defaultSearchValue === undefined ? "" : defaultSearchValue}
      />
      <div className="grid grid-cols-4 gap-x-12 gap-y-8 p-8 mx-20 my-14">
        {products &&
          products.map((item) => {
            return (
              <div
                className="border flex flex-col border-slate-300 rounded-md cursor-pointer"
                onClick={() => redirect(`/product/${item.id}`)}
                key={item.id}
              >
                <div>
                  <LazyLoadImage
                    className="aspect-video rounded-t-md w-full"
                    alt={item.title}
                    src={item.thumbnail}
                  />
                </div>
                <div className="flex-1 flex flex-col justify-evenly">
                  <div className="text-lg text-center text-slate-800 tracking-wider font-semibold px-2 pt-2 capitalize">
                    {item.title}
                  </div>
                  <div className="flex flex-row w-full justify-between px-4 pb-2">
                    <div className=" text-slate-400">
                      {Math.round(item.rating * 10) / 10}
                    </div>
                    <div className="text-lg font-bold text-slate-600">
                      ${item.price}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div
        className="text-white flex flex-row px-32 py-4"
        style={{ background: "#1c1d1f" }}
      >
        <div className="opacity-40 flex-1">© All rights reserved</div>
        <div className="opacity-70 font-medium flex flex-row space-x-8 mr-4">
          <div>About Us</div>
          <div>Contact Us</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
