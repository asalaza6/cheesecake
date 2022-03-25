import React from 'react';
import { Flex, Heading, Image, Button } from "@chakra-ui/react";
import { FaInstagram } from 'react-icons/fa';
import { Header } from './Header';
import './styling.css';

export const Layout: React.FC<any> = (props: any) => {

    const {
        children
    } = props;

    const divProps = {
        className: 'Layout',
    }
    
    return (
        <div {...divProps}>
            <Header />
            {children}
        </div>
    );
}

export default Layout;