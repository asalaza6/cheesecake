import React from 'react';
import { Header } from './Header';
import './styling.css';

interface ProductImage {
    url: string;
    alt: string;
    description: string;
}

interface ProductInfo {
    name: string;
    title: string;
    price: number;
    images: ProductImage[];
}

const ProductInfoList: ProductInfo[] = [
    {
        name: 'oreocheesecake',
        title: 'Oreo Cheesecake',
        price: 30,
        images: [
            {
                url: './general2.jpg',
                alt: 'oreo',
                description: 'oreo delicious'
            }
        ],
    },
]; 

export const ProductDisplay: React.FC<any> = (props: any) => {

    const {
        children
    } = props;

    const divProps = {
        className: 'ProductDisplay',
    }
    
    return (
        <div {...divProps}>
            <Header />
            {children}
        </div>
    );
}

export default ProductDisplay;