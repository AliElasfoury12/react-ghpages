import  { Component } from 'react'
import { Link } from "react-router-dom";
import logo from '../assets/logo.svg'
import Cart from './cart/Cart';
import API from './api/API';
import { categoriesSchema } from './api/Schema';
import { AppContext } from '../context';
import { Router } from '../Router';

export default class Nav extends Component {
    static contextType = AppContext

    state = {
        categories: [],
        loading: true
    }

    getCategories () {
        let {setCategory} = this.context
        API.fetch(categoriesSchema)
        .then(res => {
            this.setState({categories: res.getCategories.categories})
            setCategory(res.getCategories.min)
            localStorage.setItem('categories', JSON.stringify(res.getCategories))
            if(Router.state.location.pathname == '/'){
                Router.navigate(`/${res.getCategories.min}`)
            }
            this.setState({loading: false})
        })    
        
    }

    componentDidMount() {
        this.getCategories()
    }

    render() {
        let { categories, loading } = this.state
        let {setCategory} = this.context

        if(loading){return ''}

        let showCategories = categories.map((category, index) => {
            return (
                <Link 
                    data-testid={category.name == this.context.categorie ? 'active-category-link' : 'category-link'}
                    key={index}
                    className={category.name == this.context.category && 'border-b-2 border-black'}
                    onClick={() => setCategory(category.name)} 
                    to={`/${category.name}`} >
                    {category.name}
                </Link>
            )
        })

        return (
            <nav 
                className="flex fixed top-0 w-screen z-10 justify-between px-10 items-center bg-white">

                <div 
                    className="flex gap-4 h-14 items-center" >
                    {showCategories}
                </div>

                <img src={logo} alt="" />

                <Cart/>
            </nav>
        )
    }
}
