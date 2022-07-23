import { motion } from 'framer-motion';
import React from 'react';
import { useScreenSize } from '../util';
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
    const [size] = useScreenSize();
    const footerClass = size === 's' ? 'FooterSmall' : size === 'm' ? 'FooterMedium' : 'FooterLarge';
    
    return (
        <div className='Layout'>
            <Header />
            <div className='Children'>
                {children}
            </div>
            <div className={footerClass}>
            {`Copyright © ${2022} TheCheeseCakeConnect.com All Rights Reserved`}
            </div>
        </div>
    );
}

export default Layout;