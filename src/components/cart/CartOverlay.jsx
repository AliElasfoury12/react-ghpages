import  { Component } from 'react'
import CartCard from './CartCard /CartCard'
import { AppContext } from '../../context'
import PlaceOrder from './PlaceOrder'

export default class CartOverlay extends Component {
    static contextType = AppContext

    render() {
        let {itemsCount, cart} = this.context
        let total = 0
        let symbol
        if(cart.length) {
            let currency = cart[0].prices.currency
            currency = JSON.parse(currency ) 
            symbol = currency.symbol
        }

        let showCartItems = cart.map((product, index) => {
            total += Number(product.prices.amount) * product.count
            return(<CartCard key={index} product={product}/>)
        })

        return (
            <div className='absolute bg-white p-2 w-80 right-0 z-10 overflow-y-scroll max-h-[34rem] min-h-fit'>
                {itemsCount ? 
                    <p>
                        <b>My Bag</b>, {' ' + itemsCount}
                        {itemsCount > 1 ? ' items' : ' item'}
                    </p>
                : 'Cart Is Empty'}
                <div className='mt-4'>
                    {showCartItems}
                </div>
                <div className='w-full flex justify-between my-6'>
                    <p>total</p>
                    <p data-testid='cart-total'>
                        {symbol ?? '$'} {total.toFixed(2)}
                    </p>
                </div>
                <PlaceOrder/>
            </div>                                  
        )
    }
}