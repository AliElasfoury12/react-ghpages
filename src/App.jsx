import React from "react";
import Nav from "./components/Nav";
import {Outlet } from "react-router-dom";
import { AppContext } from "./context";

export default class App extends React.Component {
    state ={
        cart: JSON.parse(localStorage.getItem('cart')) ?? [],
        itemsCount: 0,
        category: ''
    }

    setCart = (value) => {
        this.setState(prev => prev.cart = value)
        localStorage.setItem('cart', JSON.stringify(value))
    }

    updateCartCount = () => {
        let count = 0
        this.state.cart.map((product) => count += product.count)
        this.setItemsCount(count)
    }

    setItemsCount = (value) => {
        this.setState(prev => prev.itemsCount = value)
    }

    setCategory = (value) => {
        this.setState(prev => prev.category = value)
    }

    render() {
        let {cart, itemsCount,  category} = this.state;
        let {setCart, setItemsCount, updateCartCount, setCategory} = this
        return (
            <div className="flex justify-center">
                <AppContext.Provider value={{
                    cart,
                    setCart,
                    itemsCount,
                    setItemsCount,
                    updateCartCount,
                    category,
                    setCategory
                }}>
                    <Nav/>
                    <Outlet/>
                </AppContext.Provider>
            </div>
        )
    }
}