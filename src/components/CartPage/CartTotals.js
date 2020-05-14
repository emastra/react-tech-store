import React from 'react';

import { CtxConsumer } from '../../context';

export default function CartTotals() {
    return (
        <div className="container">
            <div className="row">
                <CtxConsumer>
                    {(ctx) => {
                        const { clearCart, cartSubTotal, cartTax, cartTotal } = ctx;

                        return (
                            <div className="col text-title text-center my-4">
                                <button
                                    className="btn btn-outline-danger text-capitalize mb-4"
                                    onClick={clearCart}
                                >
                                    clear cart
                                </button>
                                <h3>subtotal : ${cartSubTotal}</h3>
                                <h3>tax : ${cartTax}</h3>
                                <h3>total : ${cartTotal}</h3>
                            </div>
                        );
                    }}
                </CtxConsumer>
            </div>
        </div>
    );
}
