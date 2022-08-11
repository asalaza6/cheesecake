import React from 'react';
import { Flex, Text } from "@chakra-ui/react";
import { LineItem, useScreenSize } from '../util';

interface CheckoutProps {
    checkout: LineItem[];
    setCheckout?: (items: LineItem[]) => void;
}
export const Checkout: React.FC<CheckoutProps> = (props: CheckoutProps) => {
    let {
        checkout,
        // setCheckout, // readonly for now
    } = props;
    const [screenSize] = useScreenSize();
    
    const fontSize = {
        big: screenSize === "s" ? 'xl' : '2xl',
        medium: screenSize === "s" ? 'lg' : 'larger',
        small: screenSize === "s" ? 'medium' : 'lg',
    }

    checkout = checkout.filter((item) => item.quantity);

    const total = checkout.reduce((reducer, reducerItem) => {
        reducer += reducerItem.priceAmount * reducerItem.quantity;
        return reducer;
    }, 0);

    return (
        <Flex direction="column" width='100%' padding='15px' borderRadius='20px'>
            
            <Text fontSize={fontSize['big']} fontWeight='bold'>
                Summary
            </Text>
            <Flex dir='row' borderBottom='1px black solid' paddingBottom='10px'>
                <Flex dir='column' flex={4}>
                    <Text fontSize={fontSize['small']} fontWeight='bold'>
                        Name
                    </Text>
                </Flex>
                <Flex dir='column' flex={2} justify='end'>
                    <Text fontSize={fontSize['small']} fontWeight='bold'>
                        Price
                    </Text>
                </Flex>
                <Flex dir='column' flex={2} justify='end'>
                    <Text fontSize={fontSize['small']} fontWeight='bold'>
                        Qty
                    </Text>
                </Flex>
                <Flex dir='column' flex={2} justify='end'>
                    <Text fontSize={fontSize['small']} fontWeight='bold'>
                        Total
                    </Text>
                </Flex>
            </Flex>
            {checkout.map((item, idx) => {
                return (
                    <Flex key={`${item.name}${item.metadata?.flavors}`} dir='row' paddingBottom='10px' borderBottom='1px black solid'>
                        <Flex dir='column' flex={4}>
                            <Text fontSize={fontSize['small']} fontWeight='bold'>
                                {`${item.name} - ${item.metadata?.flavors || item.metadata?.type}`}
                            </Text>
                        </Flex>
                        <Flex dir='column' flex={2} justify='end'>
                            <Text fontSize={fontSize['small']} fontWeight='bold'>
                                {`${item.priceAmount}$`}
                            </Text>
                        </Flex>
                        <Flex dir='column' flex={2} justify='end'>
                            <Text fontSize={fontSize['small']} fontWeight='bold'>
                                {item.quantity}
                            </Text>
                        </Flex>
                        <Flex dir='column' flex={2} justify='end'>
                            <Text fontSize={fontSize['small']} fontWeight='bold'>
                                {`${item.priceAmount * item.quantity}$`}
                            </Text>
                        </Flex>
                    </Flex>
                );
            })}
            <Flex dir='row'>
                <br></br>
            </Flex>
            <Flex dir='row' justify='end'>
                <Text fontSize={fontSize['small']} fontWeight='bold'>
                    {`Total: ${total}$`}
                </Text>
            </Flex>
        </Flex>
    );
}

export default Checkout;
