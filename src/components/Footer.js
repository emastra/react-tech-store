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
                                <div className="col-md-12 d-flex justify-content-around">
                                    <p className="text-capitalize" style={{ "font-color": "#5fb7ea", "margin": "1rem" }}>
                                        Prodly developed by <a href="https://github.com/emastra">Emiliano Mastragostino</a>
                                    </p>
                                </div>
                                <div className="col-md-12 d-flex justify-content-center" >
                                    {socialIcons.map((icon) => (
                                        <a href={icon.url} key={icon.id} style={{ margin: "1rem" }}>
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
