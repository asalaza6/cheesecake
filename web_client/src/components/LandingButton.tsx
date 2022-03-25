import React from 'react';
import { Flex, Heading, Image, Button } from "@chakra-ui/react";
import { FaInstagram } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';

export const LandingButton: React.FC<any> = (props: any) => {
    
    
    const instagramUrl = 'https://www.instagram.com/thecheesecakeconnect/';

    const openInstagram = () => {
        window.open(instagramUrl);
    };
    
    return (
        <Flex direction="column" maxWidth='400px' borderRadius="25px" overflow="hidden" dir="center" justify="center">
            <Flex direction="row">
                <Flex flex={1}>
                    <Image src='images/general1.jpg' alt='Cheesecake Connect Instagram' />
                </Flex>
                <Flex flex={1}>
                    <Image src='images/general2.jpg' alt='Cheesecake Connect Instagram' />
                </Flex>
                <Flex flex={1}>
                    <Image src='images/general3.jpg' alt='Cheesecake Connect Instagram' />
                </Flex>
                <Flex flex={1}>
                    <Image src='images/general4.jpg' alt='Cheesecake Connect Instagram' />
                </Flex>
            </Flex>
            <Button height="60px" onClick={openInstagram} variant='solid' colorScheme='blackAlpha' ><FaInstagram size="2.2em" /> </Button>
        </Flex>
    );
}

export default LandingButton;