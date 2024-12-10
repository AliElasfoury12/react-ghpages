import  { Component } from 'react'
import parse from 'html-react-parser'
import Attributes from '../Attributes';
import AddToCart from './AddToCart';
import PropTypes from 'prop-types'

export default class ProductDetails extends Component { 
    static propTypes = {
        product: PropTypes.object,
    }

    state = {
        selected: {}
    }

    setSelected = (attributeId, itemId) => {
        this.setState(prev => prev.selected[attributeId] = itemId)                
    }

    render() {
        let {product} = this.props
        let {selected} = this.state

        let currency = product.prices.currency
        currency = JSON.parse(currency) 
                
        return ( 
            <div className='w-96'>
                <h1 className='font-bold'>
                    {product.name}
                </h1>
                <Attributes product={product} selected={selected} setSelected={this.setSelected}/>
                <div className='mt-4'>
                    <p>PRICE:</p>
                    <p className='font-bold'>
                        {currency.symbol}{product.prices.amount} 
                    </p>
                </div>
                <AddToCart product={product} selected={selected}/>
                <div data-testid='product-description'>
                    {parse(product.description)}
                </div>
            </div>
        )
    }
}