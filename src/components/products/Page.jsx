import  { Component } from 'react'
import API from '../api/API';
import ProductCard from './ProductCard';
import { productsSchema } from '../api/Schema';
import { AppContext } from '../../context';

export default class Page extends Component {
    static contextType = AppContext

    state = {
        products: [],
        loading: true
    }

    setProducts = (value) => {
        this.setState(prev => prev.products = value)
    }

    getProducts () {
        let exixts = localStorage.getItem('products')
        if(exixts) {
            this.setProducts(JSON.parse(exixts))
            this.setState({loading: false})
        }else{
            API.fetch(productsSchema)
            .then(res => {
                this.setProducts(res.products)
                localStorage.setItem('products', JSON.stringify(res.products)) 
                this.setState({loading: false})
            }); 
        }
    }

    componentDidMount () {
       this.getProducts()
    }
    
    render() { 
        let {products, loading} = this.state
        let {category} = this.context

        if(loading){return <h1 className='mt-20'>Loading...</h1>}

        let showProducts = products.map((product, index) => {            
            if(product.category == category || category == 'all') {
                return (
                    <ProductCard key={index} product={product}/>
                )
            }
        })

        return (
            <div>
                  <h1 
                    className='absolute top-20 left-32 mb-5 font-bold text-xl'>
                    {category.toUpperCase()}
                </h1>
                <div className='grid grid-cols-3 gap-x-24 justify-items-center gap-y-10 mt-32'>
                   {showProducts}
                </div>
            </div>
        )
    }
}
