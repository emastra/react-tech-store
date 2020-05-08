import React from 'react';

import styled from 'styled-components';

import { CtxConsumer } from '../../context';

export default function ProductFilter() {
	return (
		<CtxConsumer>
			{(ctx) => {
				const {
					filterSearchTerm,
                    filterPrice,
                    filterCompany,
                    filterShipping,
                    maxPrice,
					handleFilterChange,
					storeProducts,
                } = ctx;

                // create a unique list of campanies, including 'all' as the start value
                const companies = storeProducts.reduce((acc, curr) => {
                    const company = curr.company;

                    if (!acc.includes(company)) {
                        acc.push(company);
                    }

                    return acc;
                }, [ 'all' ]);

				return (
					<div className="row my-5">
						<div className="col-10 mx-auto">
							<FilterWrapper>
								{/* text search filter */}
								<div>
									<label htmlFor="filterSearchTerm">search products</label>
									<input
										type="text"
										name="filterSearchTerm"
										// id="filterSearchTerm"
										onChange={handleFilterChange}
										value={filterSearchTerm}
										className="filter-item"
									/>
								</div>
								{/* company filter */}
								<div>
									<label htmlFor="filterCompany">company</label>
									<select
										name="filterCompany"
										// id="filterCompany"
										onChange={handleFilterChange}
										value={filterCompany}
										className="filter-item"
									>
										{companies.map((company) => {
											return (
												<option key={company} value={company}>
													{company}
												</option>
											);
										})}
									</select>
								</div>
								{/* price range filter */}
								<div>
									<label htmlFor="filterPrice">
										<p className="mb-2">
											product price : <span>$ {filterPrice}</span>
										</p>
									</label>
									<input
										type="range"
										name="filterPrice"
										// id="filterPrice"
										min={0}
										max={maxPrice}
										className="filter-price"
										value={filterPrice}
										onChange={handleFilterChange}
									/>
								</div>
								{/* free shipping filter */}
								<div>
									<label htmlFor="filterShipping" className="mx-2">
										free shipping
									</label>
									<input
										type="checkbox"
										name="filterShipping"
                                        // id="filterShipping"
                                        value={filterShipping}
										onChange={handleFilterChange}
										checked={filterShipping}
									/>
								</div>
							</FilterWrapper>
						</div>
					</div>
				);
			}}
		</CtxConsumer>
	);
}

const FilterWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	grid-column-gap: 2rem;
	grid-row-gap: 1rem;

	label {
		font-weight: bold;
		text-transform: capitalize;
	}

	.filter-item,
	.filter-price {
		display: block;
		width: 100%;
		background: transparent;
		border-radius: 0.5rem;
		border: 2px solid var(--darkGrey);
	}
`;
