import { createContext, useEffect, useState } from "react";
import "../styles/styles.scss";

import { getItem } from "utils/local";
export const CartContext = createContext();
const MyApp = ({ Component, pageProps }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const data = JSON.parse(getItem("CART"));
        setCart(data);
    }, []);
    return (
        <CartContext.Provider value={{ cart, setCart }}>
            <Component {...pageProps} />
        </CartContext.Provider>
    );
};

export default MyApp;
