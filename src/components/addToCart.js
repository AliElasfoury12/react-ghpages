export let  addToCart = (product, context, selected = '') => {
    let {cart, setCart, setItemsCount, itemsCount} = context

    if(selected) {        
        product.selected = selected
    }else{
        selected = {}

        product.attributes.map((attribute) => {
            selected[attribute.id] = attribute.items[0].id
        })

        product.selected = selected
        console.log(product);
    }

    if(cart) {
        let exsists = cart.find(elemnt => elemnt.id == product.id) ?? ''
        
        if(exsists && JSON.stringify(exsists.selected)!= JSON.stringify(product.selected)){
            product.count = 1
            cart.push(product)
        }else if(exsists) {
            exsists.count +=1
        }else {
            product.count = 1
            cart.push(product)
        }
    }else {
        cart = []
        product.count = 1
        cart.push(product)
    }

    setCart(cart)
    setItemsCount(itemsCount + 1)
}