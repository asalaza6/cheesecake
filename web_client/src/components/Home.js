import React from 'react';
import { Flex, Heading, Image, Button } from "@chakra-ui/react";
import { FaInstagram } from 'react-icons/fa';

const Home = (props)=>{
    
    const instagramUrl = 'https://www.instagram.com/thecheesecakeconnect/';

    const openInstagram = () => {
        window.open(instagramUrl);
    };

    return(
        <Flex width = "100vw" height="100vh" display = "flex" align="center" justifyContent="space-around" flexDirection="column">
            <Flex width="100%" dir="center" justify="center"> 
                <Heading textAlign="center">The Cheesecake Connect!</ Heading>
            </Flex>
            <Flex  width="80vw" direction="column" borderRadius="25px" overflow="hidden" dir="center" justify="center">
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
                <Button height="60px" onClick={openInstagram} borderRadius="0" variant='solid' colorScheme="pink" ><FaInstagram size="2.2em" /> </Button>
            </Flex>
            <Flex width="100%" dir="center" justify="center">
                <Heading textAlign="center">Website Coming Soon!</ Heading>
            </Flex>
        </Flex>
    )
}
export default Home;

