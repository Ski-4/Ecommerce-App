import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import { StorageContext } from "../App";

import { FaShoppingCart } from "react-icons/fa";

import { LazyLoadImage } from "react-lazy-load-image-component";
import Navbar from "../components/Navbar";

function Product() {
    const { items, setItems } = useContext(StorageContext);

    console.log(items);

    const [product, setProduct] = useState({});
    const [imageIndex, setImageIndex] = useState(0);

    var temp1 =
        "mb-1 p-1 border border-slate-600 opacity-50 rounded-md cursor-pointer hover:opacity-80";
    var temp2 = "mb-1 p-1 border border-slate-600 rounded-md cursor-pointer";
    const { id } = useParams();

    const addItem = () => {
        if (items[product.id] === undefined) {
            return setItems({
                ...items,
                [id]: {
                    title: product.title,
                    img: product.thumbnail,
                    quantity: 1,
                    price: product.price,
                },
            });
        }
        setItems({
            ...items,
            [id]: {
                ...items[id],
                quantity: items[id].quantity + 1,
            },
        });
    };

    const removeItem = () => {
        if (items[product.id] === undefined) return;

        if (items[product.id].quantity === 1) {
            const temp = { ...items };
            delete temp[product.id];
            return setItems(temp);
        }

        setItems({
            ...items,
            [id]: {
                ...items[id],
                quantity: items[id].quantity - 1,
            },
        });
    };

    useEffect(() => {
        const getProduct = async () => {
            const res = await fetch(`https://dummyjson.com/products/${id}`);
            const data = await res.json();
            setProduct(data);
        };
        getProduct();
    }, [id]);
    return (
        <>
            <Navbar searchText={""} />
            {product.title && (
                <div
                    id="product-container"
                    className="flex justify-around px-32"
                >
                    <div
                        id="product-showcase-container"
                        className="flex flex-col justify-center h-screen"
                    >
                        <div
                            id="product-title"
                            className="text-5xl tracking-wider text-center text-slate-800 uppercase font-bold mb-12"
                        >
                            {product.title}
                        </div>
                        <div
                            id="product-image-container"
                            className="flex flex-row items-center gap-2"
                        >
                            <div id="image-catalog" className="">
                                {product.images &&
                                    product.images.map((image, index) => {
                                        return (
                                            <div
                                                key={index}
                                                id="catalog-image"
                                                // className="mb-1 p-1 border border-slate-600 opacity-50 rounded-md cursor-pointer hover:opacity-80"
                                                className={
                                                    imageIndex !== index
                                                        ? temp1
                                                        : temp2
                                                }
                                                // style={{
                                                //   opacity: `${imageIndex === index ? "1" : "0.3"}`,
                                                // }}
                                                onClick={() =>
                                                    setImageIndex(index)
                                                }
                                            >
                                                <LazyLoadImage
                                                    src={image}
                                                    style={{
                                                        aspectRatio: 16 / 11,
                                                        width: 80,
                                                    }}
                                                    className="rounded-md"
                                                />
                                            </div>
                                        );
                                    })}
                            </div>
                            <div id="main-product-image">
                                <LazyLoadImage
                                    src={product.images[imageIndex]}
                                    style={{ aspectRatio: 16 / 10, width: 500 }}
                                />
                            </div>
                        </div>
                        <div
                            id="product-description"
                            className="text-lg max-w-xl mt-12"
                        >
                            {product.description}
                        </div>
                    </div>
                    <div
                        id="product-info-container"
                        className="flex flex-col items-start justify-center"
                    >
                        <div
                            id="product-cost-container"
                            className="text-5xl flex flex-row"
                        >
                            <div
                                id="actual-cost"
                                className="text-slate-600 font-bold"
                            >
                                $
                                {Math.ceil(
                                    product.price -
                                        product.price *
                                            (product.discountPercentage / 100)
                                )}
                            </div>
                            <div
                                id="cost"
                                className="line-through ml-4 text-slate-400 font-bold"
                            >
                                ${product.price}
                            </div>
                            <div
                                id="cost"
                                className="text-base text-slate-400 font-bold"
                            >
                                Original Price
                            </div>
                        </div>
                        {product.discountPercentage > 0 && (
                            <div
                                id="discount-container"
                                className="py-4 text-slate-500 text-lg"
                            >
                                {product.discountPercentage}% Discount Available
                                with limited time offer.
                            </div>
                        )}
                        <div
                            id="product-buy"
                            onClick={addItem}
                            className="cursor-pointer px-16 py-3 text-slate-800 font-bold bg-slate-200 rounded-md my-8"
                        >
                            ADD TO CART
                        </div>
                        <div
                            id="product-cart-container"
                            className="flex items-center gap-4"
                        >
                            <div className="opacity-70">
                                <FaShoppingCart
                                    size={32}
                                    color="rgb(30, 41, 59)"
                                />
                            </div>
                            <div>-</div>
                            <div
                                id="product-cart-controller"
                                className="flex text-2xl font-medium text-slate-800 bg-slate-200 my-2"
                            >
                                <div
                                    id="product-subtract"
                                    onClick={removeItem}
                                    className="px-3 py-1 cursor-pointer"
                                >
                                    &#8722;
                                </div>
                                <div
                                    id="product-count"
                                    className="bg-white border-b border-b-slate-200 border-t px-4 py-1"
                                >
                                    {items[product.id] !== undefined
                                        ? items[product.id].quantity
                                        : 0}
                                </div>
                                <div
                                    id="product-add"
                                    onClick={addItem}
                                    className="px-3 py-1 cursor-pointer"
                                >
                                    &#43;
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Product;
