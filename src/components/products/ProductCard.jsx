import  { Component } from 'react'
import PropTypes from 'prop-types'
import cartIcon from '../../assets/greenCart.png'
import {Link} from 'react-router-dom'
import { AppContext } from '../../context'
import { addToCart } from '../addToCart'
import { kebab } from '../utils/kebab'

export default class ProductCard extends Component {
    static contextType = AppContext
    static propTypes = {
        product: PropTypes.object,
    }
    
    render() {
        let {product} = this.props
        let currency = product.prices.currency
        currency = JSON.parse(currency) 

        return (
            <div
                data-testid={`product-${kebab(product.name)}`}
                className='w-fit group p-4 hover:shadow-xl' >
                <div className='relative'>

                    <Link  to={`/product?id=${product.id}`}>
                        <img className='w-72 h-72' src={product.gallery} alt="" />
                    </Link>

                    {product.inStock == 1 &&
                        <button onClick={
                            () => addToCart(product, this.context)
                        }>
                            <img 
                            className='w-8 h-8 absolute -bottom-4 right-4 z-20 hidden group-hover:block' 
                            src={cartIcon} alt="" />
                        </button>
                    }

                    {product.inStock == 0 &&
                        <div 
                            className='bg-gray-500 w-full h-72 top-0 opacity-45 absolute flex items-center justify-center'>
                            <p className='text-black '> 
                                OUT OF THE STOCK
                            </p>
                        </div>
                    }
                </div>

                <p className='my-2'>
                    {product.name}
                </p>
                <p className={product.inStock ? '' : 'text-gray-500'}>
                    {currency.symbol} {product.prices.amount} 
                </p>
            </div>
        )
    }
}
