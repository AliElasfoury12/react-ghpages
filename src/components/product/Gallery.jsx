import  { Component } from 'react'
import cartRight from '../../assets/CaretRight.png'
import cartLeft from '../../assets/CaretLeft.png'
import PropTypes from 'prop-types'

export default class Gallery extends Component { 

    static propTypes = {
        product: PropTypes.object,
    }
    
    state = {
        image: 0,
    }

    render() {
        let {product} = this.props
        let {image} = this.state
        let gallery = product.gallery
                
        return ( 
            <div className='mt-20 flex'>
                <div 
                    data-testid='product-gallery' >
                   {gallery.map((img, index) => {
                        return <img 
                            onClick={() => this.setState({image: index})}
                            key={index} 
                            className='w-20 h-20 mt-5' 
                            src={img.img} alt="" />
                   })}
                </div> 

                <div id='displayedImg' className='relative ml-10 mr-20'>
                    <img 
                        onClick={() => image < gallery.length -1 && this.setState({image: image+1 })}
                        className='absolute bg-black right-0 top-48' src={cartRight} alt="" />
                    <img className='w-96 h-96 mx-7' src={product.gallery[image].img} alt=""/>
                    <img
                        onClick={() => image > 0 && this.setState({image: image-1 })}
                        className='absolute bg-black left-0 top-48' src={cartLeft} alt="" />
                </div>

            </div> 
        )
    }
}
