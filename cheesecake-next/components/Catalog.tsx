import React, { useEffect, useMemo, useState } from 'react';
import { Flex, Select, Image, NumberInput, NumberInputField, NumberInputStepper, NumberDecrementStepper, NumberIncrementStepper, Button, ComponentWithAs, ButtonProps } from "@chakra-ui/react";
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
    // added by BE
    qty: number,
}

const ProductType = {
    'small': 'small',
    'trio': 'small',
    'teninch': 'teninch',
    'variety': 'small',
    'teninchdouble': 'teninch',
}

type ProductTypeType = keyof typeof ProductType;

export const Catalog: React.FC<CatalogProps> = (props: CatalogProps) => {
    const {
        checkout,
        setCheckout,
    } = props;

    const [products, setProducts] = useState<ProductInfo[]>([]);
    const [currentProduct, setCurrentProduct] = useState<ProductInfo>();
    const [checkoutIndex, setCheckoutIndex] = useState(-1);
    const [productType, setProductType] = useState<ProductTypeType>();
    const [productTypeList, setProductTypeList] = useState<ProductInfo[]>([]);
    const [specialProducts, setSpecialProducts] = useState<(ProductInfo | null)[]>([]);

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

    const onProductSelectSpecial = (evt, idx: number) => {
        const productID = evt.target.value;
        const prod = products.find((item) => item.id === productID);
        if (prod) specialProducts[idx] = prod;
        const filled = specialProducts.every((item) => item);
        if (filled) {
            const flavors = specialProducts.map((item) => item.name).sort().join(' - ');
            const specialProd = products.find((item) => item.metadata?.type === productType);
            let idx = checkout.findIndex((item) => item.price === specialProd.default_price && item.metadata?.flavors === flavors);
            if (idx === -1) {
                const length = checkout.push({
                    price: specialProd.default_price,
                    name: specialProd.name,
                    quantity: 0,
                    priceAmount: specialProd.price,
                    metadata: {
                        flavors,
                    },
                });
                setCheckout([...checkout]);
                idx = length - 1;
            }
            setCheckoutIndex(idx);
            const qty = checkout[idx].quantity;
            setCurrentProduct({
                ...specialProd,
                qty,
            })
        }
    }

    const changeProductType = (type: ProductTypeType) => {
        if (type !== productType) {
            setProductType(type);
            const selectedProducts = products.filter((p: ProductInfo) => {
                return p.metadata?.type === ProductType[type];
            });
            setProductTypeList(selectedProducts);
            setSpecialProducts(type === 'trio' ? (new Array(3)).fill(null) : type === 'variety' ? (new Array(5)).fill(null) : undefined);
        }
    }

    const onQtyChange = (valueAsString: string, valueAsNumber: number) => {
        checkout[checkoutIndex].quantity = valueAsNumber;
        setCheckout([...checkout]);
    }

    const getTypeButtonProps: (type: ProductTypeType) => ButtonProps = (type: ProductTypeType) => {
        const selected = productType === type;
        const props: ButtonProps = {
            onClick: () => {
                changeProductType(type);
            },
            style: {
                border: selected ? '1px black solid' : undefined,
            },
        };
        return props;
    };
    const SelectOptions = productTypeList.map((item) => <option key={item.id} value={item.id}>{item.name}</option>);
    return (
        <Flex maxWidth='100%' direction="column" dir="center" justify="center">
            <Flex wrap='wrap'>
                <Flex dir='row'>
                    <Flex dir='column'>
                        <Button {...getTypeButtonProps('small')}>Single Small</Button>
                    </Flex>
                    <Flex dir='column'>
                        <Button {...getTypeButtonProps('teninch')}>Ten Inch</Button>
                    </Flex>
                </Flex>
                <Flex dir='row'>
                    <Flex dir='column'>
                        <Button {...getTypeButtonProps('teninchdouble')}>Ten Inch Half/Half</Button>
                    </Flex>
                    <Flex dir='column'>
                        <Button {...getTypeButtonProps('trio')}>Trio</Button>
                    </Flex>
                    <Flex dir='column'>
                        <Button {...getTypeButtonProps('variety')}>Variety</Button>
                    </Flex>
                </Flex>
            </Flex>
            {
                productType === 'trio' || productType === 'variety' ? (
                    <Flex dir='row'>
                        {(new Array(productType === 'trio' ? 3 : 5)).fill(0).map((item, idx) => {
                            return (
                                <Flex key={`trio${idx}`} dir='column' flex={1}>
                                    <Select 
                                        placeholder={`Cake ${idx + 1}`}
                                        onChange={(evt: any) => { onProductSelectSpecial(evt, idx); }}
                                    >
                                        {SelectOptions}
                                    </Select>
                                </Flex>
                            );
                        })}
                    </Flex>
                ) :
                <Select 
                    placeholder='Select a Product'
                    onChange={onProductSelect}
                >
                    {SelectOptions}
                </Select>
            }
            {currentProduct && 
            <Flex direction='column'>
                <Flex dir='row'>{currentProduct.name}</Flex>
                {
                    productType === 'trio' || productType === 'variety' ? (
                        <Flex dir='row'>
                            {specialProducts.map((item) => {
                                return (
                                    <Flex key={item.name} dir='column' flex={1}>
                                        <Image 
                                            alt={item.description} 
                                            src={item.images.length ? item.images[0] : null} 
                                        />
                                    </Flex>
                                );
                            })}
                        </Flex>
                    ) :
                    <Image 
                        alt={currentProduct.description} 
                        src={currentProduct.images.length ? currentProduct.images[0] : null} 
                    />
                }
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
