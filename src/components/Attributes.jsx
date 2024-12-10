import  { Component } from 'react'
import PropTypes from 'prop-types'
import { kebab } from './utils/kebab'

export default class Attributes extends Component { 
    static propTypes = {
        product: PropTypes.object,
        selected: PropTypes.object,
        setSelected: PropTypes.func
    }

    render() {
        let {product, selected, setSelected} = this.props
        let attributes = product.attributes

        let showAttributes = attributes.map((attribute, index) => {
            return (
                <div 
                    data-testid={`cart-item-attribute-${kebab(attribute.id)}`} 
                    key={index}>
                    <h1 className='py-2'>
                        {attribute.id + ':'}
                    </h1>
                    <div className='flex gap-2'>
                        {attribute.items.map((item, index) =>{
                            return (
                                <div 
                                    data-testid={
                                        `cart-item-attribute-${kebab(attribute.id)}-${item.id == selected[attribute.id] ? 
                                            `${kebab(item.id)}-selected` : kebab(item.id) }`
                                    }
                                    key={index}
                                    onClick={() => {
                                        setSelected(attribute.id, item.id)
                                    }} 
                                    className={
                                        attribute.type == 'text'?  
                                        `w-14 h-fit border-2 border-black text-center 
                                        ${item.id == selected[attribute.id] ? 'text-white bg-black' : '' }`
                                        : `w-5 h-5 ${item.id == selected[attribute.id] ? 'outline outline-2 p-px outline-[#5ECE7B]' : '' }` 
                                    }
                                    style={{
                                        background:attribute.type == 'text' ?
                                        '' : item.value 
                                    }}>
                                    {attribute.type == 'text' && item.value}
                                </div>
                            ) 
                        })}
                    </div>
                </div>
            )
        })
         
        return showAttributes
    }
}
