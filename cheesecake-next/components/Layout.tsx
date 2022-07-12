import { motion } from 'framer-motion';
import React from 'react';
import { Header } from './Header';
const pageVariants = {
    initial: {
        opacity: 0,
        x: 300,
    },
    in: {
        opacity: 1,
        x: 0,
    },
    out: {
        opacity: 0,
        x: -300,
    },
}

export const Layout: React.FC<any> = (props: any) => {

    const {
        children
    } = props;

    // const pathname = window.location.pathname;

    const divProps = {
        className: 'Layout',
        initial: 'initial',
        animate: 'in',
        exit: 'out',
        variants: pageVariants,
        // key: pathname,
    };
    
    return (
        <div className='Layout'>
            <Header />
            <div className='Children'>
                {children}
            </div>
            <div className='Footer'>
            {`Copyright © ${2022} TheCheeseCakeConnect.com All Rights Reserved`}
            </div>
        </div>
    );
}

export default Layout;