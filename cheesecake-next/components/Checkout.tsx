import React from 'react';
import { Flex, IconButton, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text } from "@chakra-ui/react";
import { LineItem, ProductTypeName, useScreenSize } from '../util';
import { AiOutlineDelete, AiOutlineSearch } from 'react-icons/ai';

interface CheckoutProps {
    checkout: LineItem[];
    setCheckout?: (items: LineItem[]) => void;
}
export const Checkout: React.FC<CheckoutProps> = (props: CheckoutProps) => {
    let {
        checkout,
        setCheckout, // readonly for now
    } = props;
    const [screenSize] = useScreenSize();
    
    const fontSize = {
        big: screenSize === "s" ? 'xl' : '2xl',
        medium: screenSize === "s" ? 'lg' : 'larger',
        small: screenSize === "s" ? 'medium' : 'lg',
    }

    const total = checkout.reduce((reducer, reducerItem) => {
        reducer += reducerItem.priceAmount * reducerItem.quantity;
        return reducer;
    }, 0);

    const onQtyChange = (quantity: number, idx: number) => {
        checkout[idx].quantity = quantity;
        setCheckout([...checkout]);
    }

    const deleteItem = (idx: number) => {
        checkout[idx].quantity = 0;
        setCheckout([...checkout]);
    }

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
                <Flex dir='column' flex={2} justify='center'>
                    <Text fontSize={fontSize['small']} fontWeight='bold'>
                        Price
                    </Text>
                </Flex>
                <Flex dir='column' flex={3} justify='center'>
                    <Text fontSize={fontSize['small']} fontWeight='bold'>
                        Qty
                    </Text>
                </Flex>
                <Flex dir='column' flex={2} justify='center'>
                    <Text fontSize={fontSize['small']} fontWeight='bold'>
                        Total
                    </Text>
                </Flex>
                <Flex flex={1} minW='50px' />
            </Flex>
            {checkout.map((item, idx) => {
                if (!item.quantity) return null;
                return (
                    <Flex key={`${item.name}${item.metadata?.flavors}`} dir='row' paddingBottom='10px' borderBottom='1px black solid'>
                        <Flex dir='column' flex={4} justify='center' align='center'>
                            <Text fontSize={fontSize['small']} fontWeight='bold' align='center'>
                                {`${item.name} - ${item.metadata?.flavors || ProductTypeName[item.metadata?.type]}`}
                            </Text>
                        </Flex>
                        <Flex dir='column' flex={2} justify='center' align='center'>
                            <Text fontSize={fontSize['small']} fontWeight='bold'>
                                {`${item.priceAmount}$`}
                            </Text>
                        </Flex>
                        <Flex dir='column' flex={3} justify='center' align='center'>
                            <NumberInput
                                    onChange={(valueAsString: string, valueAsNumber: number) => onQtyChange(valueAsNumber, idx)}
                                    value={item.quantity}
                                    min={0}
                                    max={99}
                                    height='100%'
                                    minWidth='75px'
                                >
                                    <NumberInputField height='100%' />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                        </Flex>
                        <Flex dir='column' flex={2} justify='center' align='center'>
                            <Flex direction='row' wrap='wrap'>
                                <Text fontSize={fontSize['small']} fontWeight='bold'>
                                    {`${item.priceAmount * item.quantity}$`}
                                </Text>
                                 </Flex>
                        </Flex>
                        <Flex dir='column' flex={1} minWidth='50px' justify='end' align='center'>
                            <IconButton aria-label='Delete' onClick={() => deleteItem(idx)} size='lg' colorScheme='red' icon={<AiOutlineDelete />} />
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
