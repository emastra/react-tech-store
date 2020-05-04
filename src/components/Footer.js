import React from 'react';

import styled from 'styled-components';
import { CtxConsumer } from '../context';

export default function Footer() {
	return (
		<CtxConsumer>
			{(ctx) => {
                const { socialIcons } = ctx;

				return (
					<FooterWrapper>
						<div className="container py-3">
							<div className="row">
								<div className="col-md-6">
									<p className="text-capitalize">
										copyright &copy; tech store {new Date().getFullYear()}. all rights reserved{' '}
									</p>
								</div>
								<div className="col-md-6 d-flex justify-content-around">
									{socialIcons.map((icon) => (
										<a href={icon.url} key={icon.id}>
											{icon.icon}
										</a>
									))}
								</div>
							</div>
						</div>
					</FooterWrapper>
				);
			}}
		</CtxConsumer>
	);
}

const FooterWrapper = styled.footer`
	background: var(--darkGrey);
    color: var(--mainWhite);
    
	.icon {
		font-size: 1.5rem;
		color: var(--mainWhite);
		transition: var(--mainTranstion);
    }
    
	.icon:hover {
		color: var(--primaryColor);
		cursor: pointer;
	}
`;
