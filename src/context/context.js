import React, { Component } from 'react';

import { linkData } from './linkData';
import { socialData } from './socialData';
import { items } from './productData';

const Context = React.createContext();

class CtxProvider extends Component {
    state = {
        storeProducts: [],
        filteredProducts: [],
        featuredProducts: [],
        singleProduct: {},

        cart: [],
        cartItems: 0,
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0,

        sidebarOpen: false,
        cartOpen: false,

        links: linkData,
        socialIcons: socialData,

        loading: true,

        filterSearchTerm: "",
        filterPrice: 0,
        filterCompany: "all",
        filterShipping: false,
        maxPrice: 0,
    };

    componentDidMount() {
        // might take data from server
        this.setProducts(items);
    }

    // set products
    setProducts = (products) => {
        // store products
        let storeProducts = products.map((item) => {
            const { id } = item.sys;
            const image = item.fields.image.fields.file.url;

            const product = { id, ...item.fields, image };

            return product;
        });

        //  featured products
        let featuredProducts = storeProducts.filter((item) => item.featured === true);

        // calculate max price
        let maxPrice = Math.max(...storeProducts.map(item => item.price));

        // set state
        this.setState({
            storeProducts,
            filteredProducts: storeProducts,
            featuredProducts,
            cart: this.getStorageCart(),
            singleProduct: this.getStorageProduct(),
            loading: false,
            filterPrice: maxPrice,
            maxPrice: maxPrice
        }, () => {
            this.setTotals();
        });
    };

    // get cart from local storage
    getStorageCart = () => {
        let cart;

        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        } else {
            cart = [];
        }

        return cart;
    };

    // get single product from local storage
    getStorageProduct = () => {
        return localStorage.getItem('singleProduct')
            ? JSON.parse(localStorage.getItem('singleProduct'))
            : {};
    };

    // get totals from cart data in state
    getTotals = () => {
        let cartItems = 0;
        let subTotal = 0;
        let total;
        let tax;

        this.state.cart.forEach((item) => {
            cartItems += item.count;
            subTotal += item.total;
        });

        subTotal = parseFloat(subTotal.toFixed(2));

        tax = subTotal * 0.22;
        tax = parseFloat(tax.toFixed(2));

        total = subTotal + tax;
        total = parseFloat(total.toFixed(2));

        return {
            cartItems,
            subTotal,
            tax,
            total,
        };
    };

    // get and set totals into state
    setTotals = () => {
        const totals = this.getTotals();

        this.setState({
            cartItems: totals.cartItems,
            cartSubTotal: totals.subTotal,
            cartTax: totals.tax,
            cartTotal: totals.total,
        });
    };

    // sync cart in state with cart in storage
    syncStorage = () => {
        localStorage.setItem('cart', JSON.stringify(this.state.cart));
    };

    // add item to cart
    addToCart = (id) => {
        let tempCart = [...this.state.cart];
        let tempProducts = [...this.state.storeProducts];
        let tempItem = tempCart.find((item) => item.id === id);

        if (!tempItem) {
            tempItem = tempProducts.find((item) => item.id === id);
            let total = tempItem.price;
            let cartItem = { ...tempItem, count: 1, total };
            tempCart = [...tempCart, cartItem];
        } else {
            tempItem.count++;
            tempItem.total = tempItem.price * tempItem.count;
            tempItem.total = parseFloat(tempItem.total.toFixed(2));
        }

        this.setState({
            cart: tempCart
        }, () => {
            this.setTotals();
            this.syncStorage();
            this.openCart();
        });
    };

    // set single product
    setSingleProduct = (id) => {
        let product = this.state.storeProducts.find((item) => item.id === id);
        localStorage.setItem('singleProduct', JSON.stringify(product));

        this.setState({
            singleProduct: { ...product },
            loading: false,
        });
    };

    // toggle sidebar
    toggleSidebar = () => {
        this.setState((state) => {
            return {
                sidebarOpen: !state.sidebarOpen
            };
        });
    };

    // toggle side cart
    toggleSideCart = () => {
        this.setState((state) => {
            return {
                cartOpen: !state.cartOpen
            };
        });
    };

    // close side cart
    closeCart = () => {
        this.setState({ cartOpen: false });
    };

    // open side cart
    openCart = () => {
        this.setState({ cartOpen: true });
    };

    // increment count of specific cart item
    increment = (id) => {
        let tempCart = [...this.state.cart]; // Shallow-cloning (excluding prototype) or merging of objects is now possible using a shorter syntax than Object.assign()
        const cartItem = tempCart.find((item) => item.id === id);

        cartItem.count++;
        cartItem.total = cartItem.count * cartItem.price;
        cartItem.total = parseFloat(cartItem.total.toFixed(2));

        this.setState({
            cart: [...tempCart]
        }, () => {
            this.setTotals();
            this.syncStorage();
        });
    };

    // decrement count of specific cart item
    decrement = (id) => {
        let tempCart = [...this.state.cart];
        const cartItem = tempCart.find((item) => item.id === id);

        cartItem.count = cartItem.count - 1;

        if (cartItem.count === 0) {
            this.removeItem(id);
        } else {
            cartItem.total = cartItem.count * cartItem.price;
            cartItem.total = parseFloat(cartItem.total.toFixed(2));

            this.setState({
                cart: [...tempCart]
            }, () => {
                this.setTotals();
                this.syncStorage();
            });
        }
    };

    // remove item from cart
    removeItem = (id) => {
        let tempCart = [...this.state.cart];

        tempCart = tempCart.filter((item) => item.id !== id);

        this.setState({
            cart: [...tempCart]
        }, () => {
            this.setTotals();
            this.syncStorage();
        });
    };

    // clear cart
    clearCart = () => {
        this.setState({
            cart: []
        }, () => {
            this.setTotals();
            this.syncStorage();
        });
    };

    handleFilterChange = (event) => {
        const name = event.target.name;
        const value = event.target.type !== 'checkbox' ? event.target.value : event.target.checked;

        this.setState({
            [name]: value,
        },
            this.filterData
        );
    }

    filterData = () => {
        const {
            filterSearchTerm,
            filterPrice,
            filterCompany,
            filterShipping,
            storeProducts
        } = this.state;

        let tempPrice = parseInt(filterPrice);
        let tempProducts = [...storeProducts];

        // filtering based on price
        tempProducts = tempProducts.filter((item) => item.price <= tempPrice);

        // filtering based on company
        if (filterCompany !== 'all') {
            tempProducts = tempProducts.filter((item) => item.company === filterCompany);
        }

        // filtering based on freeShipping
        if (filterShipping) {
            tempProducts = tempProducts.filter((item) => item.freeShipping === true);
        }

        // filtering based on search text
        if (filterSearchTerm.length > 0) {
            tempProducts = tempProducts.filter((item) => {
                let tempSearch = filterSearchTerm.toLowerCase();
                let tempTitle = item.title.toLowerCase();
                let tempDesc = item.description.toLowerCase();

                return tempTitle.includes(tempSearch) || tempDesc.includes(tempSearch);
            });
        }

        this.setState({
            filteredProducts: tempProducts,
        });
    }

    render() {
        return (
            <Context.Provider
                value={{
                    ...this.state,

                    addToCart: this.addToCart,
                    setSingleProduct: this.setSingleProduct,

                    toggleSidebar: this.toggleSidebar,
                    toggleSideCart: this.toggleSideCart,
                    closeCart: this.closeCart,
                    openCart: this.openCart,

                    increment: this.increment,
                    decrement: this.decrement,
                    removeItem: this.removeItem,
                    clearCart: this.clearCart,

                    handleFilterChange: this.handleFilterChange
                }}
            >
                {this.props.children}
            </Context.Provider>
        );
    }
}

const CtxConsumer = Context.Consumer;

export { CtxProvider, CtxConsumer };
