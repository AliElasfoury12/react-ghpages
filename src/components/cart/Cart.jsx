import  { Component } from 'react'
import CartIcon from '../../assets/cart.svg'
import { AppContext } from '../../context'
import CartOverlay from './CartOverlay'

export default class Cart extends Component {
    static contextType = AppContext

    state = {
        showCart: false,
    }

    componentDidMount () {
        this.context.updateCartCount()
    }

    render() {
        let {showCart} = this.state
        let {itemsCount} = this.context
    
        return (
            <div className='relative  '>
                  <button 
                    data-testid='cart-btn'
                    onClick={() => this.setState({showCart: !showCart})}
                    className='relative'>
                    {itemsCount && !showCart ? 
                        <small
                            data-testid='cart-item-amount' 
                            className='bg-black text-white text-center rounded-full absolute w-5 h-5 -right-4'>
                            {itemsCount}
                        </small> 
                    : ''}
                    <img src={CartIcon} alt="" />
               </button>

                {showCart && 
                   <div >
                       <CartOverlay/>

                        {/*Shadow over div*/}
                        <div className='bg-[#39374838] w-screen h-screen fixed top-12 left-0'></div>
                   </div>
                }
            </div>
        )
    }
}