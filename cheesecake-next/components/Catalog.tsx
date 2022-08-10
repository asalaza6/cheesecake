import React, { useEffect, useMemo, useState } from 'react';
import { Flex, Select, Image, NumberInput, NumberInputField, NumberInputStepper, NumberDecrementStepper, NumberIncrementStepper } from "@chakra-ui/react";
import { isArray, LineItem } from '../util';

interface CatalogProps {
    checkout: LineItem[];
    setCheckout: (items: LineItem[]) => void;
}

interface ProductInfo {
    id: string;
    attributes: any[];
    default_price: string;
    description: string;
    images: string[];
    metadata: any;
    name: string,
    // package_dimensions: null,
    // shippable: null,
    // statement_descriptor: null,
    // tax_code: null,
    // url: null
    unit_label: string,
    price: number,
}

export const Catalog: React.FC<CatalogProps> = (props: CatalogProps) => {
    const {
        checkout,
        setCheckout,
    } = props;

    const [products, setProducts] = useState<ProductInfo[]>([]);
    const [currentProduct, setCurrentProduct] = useState<ProductInfo & { qty: number }>();
    const [checkoutIndex, setCheckoutIndex] = useState(-1);

    const loadProductList = async () => {
        const response = await fetch(`/api/products`,{
            method: "GET",
        });
        const { productList } = await response.json();
        if (isArray(productList)) {
            setProducts(productList);
        }
    }

    useEffect(() => {
        if (!isArray(products)) {
            loadProductList();
        }
    }, [products]);

    const onProductSelect = (evt) => {
        const productID = evt.target.value;
        const prod = products.find((item) => item.id === productID);
        if (prod) {
            let idx = checkout.findIndex((item) => item.price === prod.default_price);
            if (idx === -1) {
                const length = checkout.push({
                    price: prod.default_price,
                    name: prod.name,
                    quantity: 0,
                    priceAmount: prod.price,
                });
                setCheckout([...checkout]);
                idx = length - 1;
            }
            setCheckoutIndex(idx);
            const qty = checkout[idx].quantity;
            setCurrentProduct({
                ...prod,
                qty,
            })
        }
    }

    const onQtyChange = (valueAsString: string, valueAsNumber: number) => {
        checkout[checkoutIndex].quantity = valueAsNumber;
        setCheckout([...checkout]);
    }
    return (
        <Flex maxWidth='100%' direction="column" dir="center" justify="center">
            <Select 
                placeholder='Select a Product'
                onChange={onProductSelect}
            >
                {products.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
            </Select>
            {currentProduct && 
            <Flex direction='column'>
                <Flex dir='row'>{currentProduct.name}</Flex>
                <Image 
                    alt={currentProduct.description} 
                    src={currentProduct.images.length ? currentProduct.images[0] : null} 
                    fontSize={undefined} 
                    lineHeight={undefined} 
                    letterSpacing={undefined} 
                    wordBreak={'normal'} 
                    as={undefined} />
                <Flex dir='row'>{currentProduct.description}</Flex>
                <Flex dir='row'>
                    <Flex direction='column' flex={8}>
                        <Flex dir='row'>{"Price: "}</Flex>
                        <Flex dir='row'>{`${currentProduct.price}$`}</Flex>
                    </Flex>
                    <Flex direction='column' flex={8}>
                        <Flex dir='row'>{"QTY: "}</Flex>
                        <Flex dir='row'>
                            <NumberInput
                                onChange={onQtyChange}
                                value={checkout[checkoutIndex].quantity}
                                min={0}
                            >
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </Flex>
                    </Flex>
                    <Flex direction='column' flex={8}>
                        <Flex dir='row'>{"Total: "}</Flex>
                        <Flex dir='row'>{`${currentProduct.price * checkout[checkoutIndex].quantity}$`}</Flex>
                    </Flex>
                </Flex>
            </Flex>
            }
        </Flex>
    );
}

export default Catalog;
