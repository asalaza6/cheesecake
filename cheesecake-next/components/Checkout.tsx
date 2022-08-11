import React from 'react';
import { Flex } from "@chakra-ui/react";
import { LineItem } from '../util';

interface CheckoutProps {
    checkout: LineItem[];
    setCheckout?: (items: LineItem[]) => void;
}
export const Checkout: React.FC<CheckoutProps> = (props: CheckoutProps) => {
    let {
        checkout,
        // setCheckout, // readonly for now
    } = props;
    
    checkout = checkout.filter((item) => item.quantity);

    const total = checkout.reduce((reducer, reducerItem) => {
        reducer += reducerItem.priceAmount * reducerItem.quantity;
        return reducer;
    }, 0);

    return (
        <Flex direction="column" width='100%' borderBottom='black'>
            Summary
            <Flex dir='row'>
                <Flex dir='column' flex={4}>
                    Name
                </Flex>
                <Flex dir='column' flex={2}>
                    Price
                </Flex>
                <Flex dir='column' flex={2}>
                    Quantity
                </Flex>
                <Flex dir='column' flex={2}>
                    Total
                </Flex>
            </Flex>
            <br/>
            {checkout.map((item) => {
                return (
                    <Flex key={item.name} dir='row' borderBottom='black'>
                        <Flex dir='column' flex={4}>
                            {item.name}
                        </Flex>
                        <Flex dir='column' flex={2}>
                            {item.priceAmount}
                        </Flex>
                        <Flex dir='column' flex={2}>
                            {item.quantity}
                        </Flex>
                        <Flex dir='column' flex={2}>
                            {item.priceAmount * item.quantity}
                        </Flex>
                    </Flex>
                );
            })}
            <Flex dir='row'>{`Total: ${total}`}</Flex>
        </Flex>
    );
}

export default Checkout;
