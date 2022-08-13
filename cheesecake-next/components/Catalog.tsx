import React, { useEffect, useMemo, useState } from 'react';
import { Flex, Select, Image, NumberInput, NumberInputField, NumberInputStepper, NumberDecrementStepper, NumberIncrementStepper, Button, ComponentWithAs, ButtonProps, Text } from "@chakra-ui/react";
import { isArray, LineItem, ProductType, ProductTypeType } from '../util';

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

const specialProductType: Partial<Record<ProductTypeType, number>> = {
    'trio': 3,
    'teninchdouble': 2,
    'variety': 5,
}

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

    const changeProductType = (type: ProductTypeType) => {
        if (type !== productType) {
            setProductType(type);
            const selectedProducts = products.filter((p: ProductInfo) => {
                return p.metadata?.type === ProductType[type];
            });
            setProductTypeList(selectedProducts);
            setSpecialProducts(specialProductType[type] ? (new Array(specialProductType[type])).fill(null) : undefined);
            setCurrentProduct(undefined);
        }
    }

    useEffect(() => {
        if (!isArray(products)) {
            loadProductList();
        } else if (!productType) {
            changeProductType('small');
        }
    }, [products, productType]);

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
                    metadata: prod.metadata,
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
        } else {
            setCurrentProduct(undefined);
        }
    }

    const onProductSelectSpecial = (evt, idx: number) => {
        const productID = evt.target.value;
        const prod = products.find((item) => item.id === productID);
        specialProducts[idx] = prod;
        setSpecialProducts([...specialProducts]);
        
        const filled = specialProducts.every((item) => item);
        if (filled) {
            const flavors = specialProducts.map((item) => (item.name).slice(0, 5)).sort().join('-');
            const specialProd = products.find((item) => item.metadata?.type === productType);
            let idx = checkout.findIndex((item) => item.price === specialProd.default_price && item.metadata?.flavors === flavors);
            if (idx === -1) {
                const length = checkout.push({
                    price: specialProd.default_price,
                    name: specialProd.name,
                    quantity: 0,
                    priceAmount: specialProd.price,
                    metadata: {
                        ...specialProd.metadata,
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
        } else if (currentProduct) {
            setCurrentProduct(undefined);
        }
    }

    const onQtyChange = (valueAsString: string, valueAsNumber: number) => {
        if (isNaN(valueAsNumber)) valueAsNumber = 0;
        checkout[checkoutIndex].quantity = valueAsNumber;
        setCheckout([...checkout]);
    }

    const getTypeButtonProps: (type: ProductTypeType) => ButtonProps = (type: ProductTypeType) => {
        const selected = productType === type;
        const props: ButtonProps = {
            onClick: () => {
                changeProductType(type);
            },
            colorScheme: selected ? 'pink' : undefined,
            style: {
                colorScheme: selected ? 'pink' : undefined,
                width: '100%',
            },
            variant: 'ghost',
        };
        return props;
    };
    const SelectOptions = productTypeList.map((item) => <option key={item.id} value={item.id}>{item.name}</option>);
    return (
        <Flex width='100%' direction="column" alignItems='center' dir="center" justify="center" padding='15px' borderRadius='20px'>
            
            <Flex dir='row' width='100%' wrap='wrap'>
                <Flex dir='column' flex={1}>
                    <Button {...getTypeButtonProps('small')}>Single Small</Button>
                </Flex>
                <Flex dir='column' flex={1}>
                    <Button {...getTypeButtonProps('teninch')}>Ten Inch</Button>
                </Flex>
                <Flex dir='column' flex={1}>
                    <Button {...getTypeButtonProps('teninchdouble')}>Ten Inch Half/Half</Button>
                </Flex>
                <Flex dir='column' flex={1}>
                    <Button {...getTypeButtonProps('trio')}>Trio</Button>
                </Flex>
                <Flex dir='column' flex={1}>
                    <Button {...getTypeButtonProps('variety')}>Variety</Button>
                </Flex>
            </Flex>
            {
                specialProductType[productType] ? (
                    <Flex dir='row' width='100%' justify='center' wrap='wrap'>
                        {(new Array(specialProductType[productType])).fill(0).map((item, idx) => {
                            return (
                                <Flex key={`${productType}${idx}`} dir='column' flex={1} maxWidth='500px'>
                                    <Select 
                                        width='100%'
                                        minWidth='100px'
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
                    maxWidth='500px'
                    width='100%'
                    placeholder='Select a Product'
                    onChange={onProductSelect}
                >
                    {SelectOptions}
                </Select>
            }
            <Flex direction='column' width='100%' alignItems='center'>
                {
                    specialProductType[productType] ? (
                        <Flex dir='row' width='100%' padding='10px' justify='center' wrap='wrap'>
                            {specialProducts.map((item, idx) => {
                                return (
                                    <Flex key={`item.name${idx}`} dir='column' flex={1} maxWidth='500px'>
                                        <Image 
                                            maxHeight='500px'
                                            width='100%'
                                            minWidth='100px'
                                            fallbackSrc='/static/fallback.jpeg'
                                            alt={item?.description || 'choose a cheesecake'} 
                                            src={item?.images.length ? item.images[0] : null} 
                                        />
                                    </Flex>
                                );
                            })}
                        </Flex>
                    ) :
                    <Image 
                        maxHeight='500px'
                        maxWidth='500px'
                        width='100%'
                        padding='10px'
                        fallbackSrc='/static/fallback.jpeg'
                        alt={currentProduct?.description} 
                        src={currentProduct?.images.length ? currentProduct.images[0] : null} 
                    />
                }
                {currentProduct && <>
                    <Flex dir='row'><Text fontSize='lg' fontWeight='bold'>{currentProduct.description}</Text></Flex>
                    <Flex dir='row' width='100%'>
                        <Flex direction='column' flex={8} height='100%' justify='center'>
                            <Text fontSize='lg' fontWeight='bold'>{`Price: ${currentProduct.price}$`}</Text>
                        </Flex>
                        <Flex direction='column' flex={8} height='100%' justify='center'>
                            <Flex dir='row' justify='space-evenly' wrap='wrap' align='center'>
                                <Text fontSize='lg' fontWeight='bold'>{"Qty:"}</Text>
                                <NumberInput
                                    onChange={onQtyChange}
                                    value={checkout[checkoutIndex].quantity}
                                    min={0}
                                    minWidth='100px'
                                >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </Flex>
                        </Flex>
                        <Flex direction='column' flex={8} height='100%'>
                            <Flex dir='row' justify='end' align='center' height='100%'>
                                <Text fontSize='lg' fontWeight='bold'>{`Total: ${currentProduct.price * checkout[checkoutIndex].quantity}$`}</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </>
                }
            </Flex>
        </Flex>
    );
}

export default Catalog;
