import { Component } from 'react'
import PropTypes from 'prop-types'
import CartCardLeft from './CartCardLeft'
import { AppContext } from '../../../context'

export default class CartCard extends Component {
    static contextType = AppContext

    static propTypes = {
       product: PropTypes.object,
    }

    state = {
        itemCount: this.props.product.count
    }

    setCount = (x, product) => {
        this.setState(prev => prev.itemCount = prev.itemCount + x )
        let {cart, setCart, updateCartCount} = this.context
        let productIndex = cart.indexOf(product)
        
        let selectedProduct = cart.find((p, index) => index == productIndex)        
        selectedProduct.count = this.state.itemCount + x
        updateCartCount()
        
        if(product.count == 0){
           cart = cart.filter((p, index) => index != productIndex)
        }
        setCart(cart)
    }

    render() {
        let {itemCount} = this.state
        let {product} = this.props        
   
        return (
            <div 
                className='flex justify-between mb-10'>
                    
                <CartCardLeft product={product}/>

                <div className='flex flex-col justify-between'>
                    <button 
                        data-testid='cart-item-amount-increase'
                        onClick={() => this.setCount(1, product)}
                        className='border-2 px-2 border-black'>
                        +
                    </button>
                    <p >{itemCount}</p>
                    <button
                        data-testid='cart-item-amount-decrease'
                        onClick={() => this.setCount(-1, product)} 
                        className='border-2 border-black'>
                        - 
                    </button>
                </div>

                <img 
                    className='w-32 h-32' 
                    src={product.gallery[0].img ? product.gallery[0].img : product.gallery} alt="" 
                />
            </div>
        )
    }
}