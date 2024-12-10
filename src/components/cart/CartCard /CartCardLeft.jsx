import { Component } from 'react'
import PropTypes from 'prop-types'
import Attributes from '../../Attributes'

export default class CartCardLeft extends Component {

    static propTypes = {
        product: PropTypes.object
    }

    render() {
        let {product} = this.props
        let currency = product.prices.currency
        currency = JSON.parse(currency) 
      
        return (
            <div 
                className='flex flex-col justify-between gap-1 px-1 w-36'>
                <p>{product.name}</p>
                <p>{currency.symbol}  {product.prices.amount}</p>
                <Attributes product={product} selected={product.selected} />
            </div>
        )
    }
}
