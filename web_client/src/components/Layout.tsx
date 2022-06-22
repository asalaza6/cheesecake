import { motion } from 'framer-motion';
import React from 'react';
import { Header } from './Header';
import './styling.css';
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

    const pathname = window.location.pathname;

    const divProps = {
        className: 'Layout',
        initial: 'initial',
        animate: 'in',
        exit: 'out',
        variants: pageVariants,
        key: pathname,
    };
    
    return (
        <motion.div {...divProps}>
            <Header />
            {children}
        </motion.div>
    );
}

export default Layout;