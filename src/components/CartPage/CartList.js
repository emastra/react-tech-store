import React from 'react';

import { CtxConsumer } from '../../context';

import CartItem from './CartItem';

export default function CartList() {
    return (
        <div className="container-fluid">
            {/* row */}
            <div className="row">
                <div className="col">
                    <CtxConsumer>
                        {(ctx) => {
                            const { cart, increment, decrement, removeItem } = ctx;

                            if (cart.length === 0) {
                                return (
                                    <h1 className="text-title text-center my-4">
                                        your cart is currently empty
                                    </h1>
                                );
                            }

                            return (
                                <>
                                    {cart.map((item) => (
                                        <CartItem
                                            key={item.id}
                                            cartItem={item}
                                            increment={increment}
                                            decrement={decrement}
                                            removeItem={removeItem}
                                        />
                                    ))}
                                </>
                            );
                        }}
                    </CtxConsumer>
                </div>
            </div>
        </div>
    );
}
