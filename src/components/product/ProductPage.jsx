import  { Component } from 'react'
import API from '../api/API';
import { productSchema } from '../api/Schema';
import { AppContext } from '../../context'
import Gallery from './Gallery';
import ProductDetails from './ProductDetails';

export default class ProductPage extends Component { 
    static contextType = AppContext

    state = {
        product: {},
        loading: true,
    }

    getProduct() {
        const urlParams = new URLSearchParams(window.location.search);
        let id = urlParams.get('id');

        API.fetch(productSchema(id))
        .then(res => {
            this.setState({product: res.product[0]})
            this.setState({loading: false})
        }) 
    }

    componentDidMount () {
        let {cart, setItemsCount} = this.context
        let count = 0
        cart.map(product => count += product.count )
        setItemsCount(count)
        this.getProduct()
    }

    render() {
        let {product, loading} = this.state
    
        if(loading){return <h1 className='mt-20'>Loading...</h1>}

        return ( 
            <div className='mt-20 flex'>
                <Gallery product={product}/>
                <ProductDetails product={product} />
            </div> 
        )
    }
}