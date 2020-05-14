import React from 'react';

import Product from '../Product';
import Title from '../Title';

import { CtxConsumer } from '../../context';
import { Link } from 'react-router-dom';

export default function Featured() {
    return (
        <section className="py-5">
            <div className="container">
                <Title title="featured products" center="true" />

                {/* products */}
                <div className="row my-5">
                    <CtxConsumer>
                        {(ctx) => {
                            const { featuredProducts } = ctx;

                            return featuredProducts.map((product) => (
                                <Product key={product.id} product={product} />
                            ));
                        }}
                    </CtxConsumer>
                </div>

                <div className="row mt-5">
                    <div className="col text-center">
                        <Link to="/products" className="main-link">
                            our products
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
