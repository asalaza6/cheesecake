import React from 'react';
import { Flex, Image, Button } from "@chakra-ui/react";
import { FaInstagram } from 'react-icons/fa';

export const LandingButton: React.FC<any> = (props: any) => {
    
    
    const instagramUrl = 'https://www.instagram.com/thecheesecakeconnect/';

    const openInstagram = () => {
        window.open(instagramUrl);
    };
    
    return (
        <Flex direction="column" maxWidth='80%' borderRadius="25px" overflow="hidden" dir="center" justify="center">
            <Flex direction="row">
                <Flex flex={1}>
                    <Image src='/static/general1.jpg' alt='Cheesecake Connect Instagram' />
                </Flex>
                <Flex flex={1}>
                    <Image src='/static/general2.jpg' alt='Cheesecake Connect Instagram' />
                </Flex>
                <Flex flex={1}>
                    <Image src='/static/general3.jpg' alt='Cheesecake Connect Instagram' />
                </Flex>
                <Flex flex={1}>
                    <Image src='/static/general4.jpg' alt='Cheesecake Connect Instagram' />
                </Flex>
            </Flex>
            <Button height="60px" onClick={openInstagram} variant='solid' colorScheme='pink' ><FaInstagram size="2.2em" /> </Button>
        </Flex>
    );
}

export default LandingButton;