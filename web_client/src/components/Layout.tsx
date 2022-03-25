import React from 'react';
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