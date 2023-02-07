import Navbar from "../components/Navbar";

import { StorageContext } from "../App";

import { useContext } from "react";

import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

import { TiDelete } from "react-icons/ti";

function Cart() {
    const { items, setItems } = useContext(StorageContext);

    const deleteItemCart = (id) => {
        const temp = { ...items };
        delete temp[id];
        return setItems(temp);
    };

    const addItemCart = (id) => {
        setItems({
            ...items,
            [id]: {
                ...items[id],
                quantity: items[id].quantity + 1,
            },
        });
    };

    const removeItemCart = (id) => {
        if (items[id].quantity === 1) {
            return;
        }

        setItems({
            ...items,
            [id]: {
                ...items[id],
                quantity: items[id].quantity - 1,
            },
        });
    };
    return (
        <>
            <Navbar searchText="" />
            <div id="items-container" className="mt-14 px-32">
                <div className="text-3xl py-4 font-semibold text-slate-800">
                    ITEMS
                </div>
                <hr style={{ borderTop: "1px solid gray" }} />
                <div id="cart-products-container" className="overflow-auto">
                    {Object.keys(items).length > 0 ? (
                        Object.entries(items)
                            .reverse()
                            .map(([id, item]) => {
                                return (
                                    <div
                                        key={id}
                                        id="cart-item-container"
                                        className="flex my-4 pb-3 items-center border-dashed border-b-2 border-gray-300"
                                    >
                                        <TiDelete
                                            size={32}
                                            className="text-slate-600 mx-2 cursor-pointer"
                                            onClick={() => deleteItemCart(id)}
                                        />
                                        <LazyLoadImage
                                            src={item.img}
                                            style={{
                                                aspectRatio: 16 / 10,
                                                width: 100,
                                            }}
                                        />
                                        <div
                                            id="cart-product-title"
                                            className="flex-1 text-xl px-4"
                                        >
                                            <Link to={`/product/${id}`}>
                                                {item.title}
                                            </Link>
                                        </div>
                                        <div
                                            id="cart-price-container"
                                            className="flex flex-col items-center gap-1"
                                        >
                                            <div id="cart-product-price">
                                                Price:{" "}
                                                <span className="font-medium">
                                                    ${item.price}
                                                </span>
                                            </div>
                                            <div
                                                id="cart-product-quantity"
                                                className="flex text-xl text-slate-800 w-fit bg-slate-200 my-2"
                                            >
                                                <div
                                                    id="product-subtract"
                                                    onClick={() =>
                                                        removeItemCart(id)
                                                    }
                                                    className="px-2 cursor-pointer"
                                                >
                                                    &#8722;
                                                </div>
                                                <div
                                                    id="product-count"
                                                    className="bg-white border-b border-b-slate-200 border-t px-3"
                                                >
                                                    {item.quantity}
                                                </div>
                                                <div
                                                    id="product-add"
                                                    onClick={() =>
                                                        addItemCart(id)
                                                    }
                                                    className="px-2 cursor-pointer"
                                                >
                                                    &#43;
                                                </div>
                                            </div>
                                            <div id="cart-total-price">
                                                Total Price:{" "}
                                                <span className="font-medium">
                                                    $
                                                    {item.price * item.quantity}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                    ) : (
                        <div className="py-3 text-slate-500">
                            No Items in cart
                        </div>
                    )}
                </div>
                <div
                    id="total-price"
                    className="fixed left-1/2 -translate-x-1/2 bottom-10 text-2xl text-center bg-slate-600 text-slate-50 px-5 py-2 w-fit ml-auto mr-auto"
                >
                    Total price:{" "}
                    <span className="font-bold text-white">
                        $
                        {Object.values(items).reduce(
                            (total, item) => total + item.price * item.quantity,
                            0
                        )}
                    </span>
                </div>
            </div>
        </>
    );
}

export default Cart;
