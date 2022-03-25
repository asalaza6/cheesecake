import React from 'react';
import { Flex, Heading, Image, Button } from "@chakra-ui/react";
import { FaInstagram } from 'react-icons/fa';

import { Link } from 'react-router-dom';
import { Layout } from '../components';

export const LandingPage: React.FC<any> = (props: any)=>{
    
    const instagramUrl = 'https://www.instagram.com/thecheesecakeconnect/';

    const openInstagram = () => {
        window.open(instagramUrl);
    };

    return (
        <Layout>
            <Flex padding='20px' height="100vh" display = "flex" align="center" justifyContent="space-around" flexDirection="column">
                <Flex dir="center" justify="space-between"> 
                    <Heading textAlign="center">The Cheesecake Connect!</ Heading>
                </Flex>
                <Flex flex={4} direction="column" borderRadius="25px" overflow="hidden" dir="center" justify="center">
                    <Flex direction="row" width="100%">
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
                    <Button height="60px" onClick={openInstagram} variant='solid' colorScheme="pink" ><FaInstagram size="2.2em" /> </Button>
                </Flex>
            </Flex>
        </Layout>
    );
}

