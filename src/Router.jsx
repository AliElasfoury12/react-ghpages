import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Page from "./components/products/Page";
import ProductPage from "./components/product/ProductPage";

export let Router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children : [
            {
                path: ':path',
                element: <Page/>,
            },
            {
                path: 'product',
                element: <ProductPage/>,
            },
     
        ]
    }
])
